import { useState } from "react"
import { ethers } from "ethers"
import success from "../assets/mark.png"
import completed from "../assets/check.png"
import DepositSuccessPop from "./PopUp/DepositSuccessPop"
import PendingPopUp from "./PopUp/PendingPopUp"

export default function EscrowDeposit({ contract, account, details, refreshDetails }) {
    const [amount, setAmount] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccessOpen, setIsSuccessOpen] = useState(false)
    const [successData, setSuccessData] = useState(null)
    const [error, setError] = useState("")

    const validateAmount = () => {
        if (!amount) {
            setError("Amount tidak boleh kosong.")
            return false
        }
        if (isNaN(amount) || Number(amount) <= 0) {
            setError("Amount harus berupa angka lebih besar dari 0.")
            return false
        }
        setError("")
        return true
    }

    const handleDeposit = async () => {
        if (!validateAmount()) return

        try {
            setIsProcessing(true)

            const tx = await contract.deposit({
                value: ethers.parseEther(amount)
            })

            const receipt = await tx.wait()
            setIsProcessing(false)
            setAmount("")

            const txHash = receipt.hash
            setSuccessData({ hash: txHash, amount })
            setIsSuccessOpen(true)

        } catch (error) {
            console.error(error)
            setIsProcessing(false)
        }
    }

    return (
        <>
            {isProcessing && <PendingPopUp type="Deployer Deposit" />}
            {isSuccessOpen && successData && (
                <DepositSuccessPop
                    isOpen={isSuccessOpen}
                    onClose={() => {
                        setIsSuccessOpen(false)
                        refreshDetails() 
                    }}
                    hash={successData.hash}
                    depositAmount={successData.amount}
                />
            )}

            {(account === details.deployer || account === details.arbiter) && (
                <div className="bg-[#121d32] p-6 rounded-md h-fit">
                    <h1 className="text-center text-2xl font-bold">Deposit Ether</h1>

                    {details.isCompleted && (
                        <div className="flex flex-col gap-2 items-center mt-4">
                            <img src={completed} alt="" className="object-contain w-35 h-35" />
                            <p className="text-xl text-green-400 font-semibold">
                                Escrow is now completed.
                            </p>
                        </div>
                    )}

                    {details.balance === "0.0" && !details.isCompleted && account === details.deployer && (
                        <div className="flex flex-col gap-3 mt-6">
                            <h1 className="text-lg font-semibold">Deposit Amount:</h1>
                            <input
                                className={`w-full md:w-xs bg-[#172641] p-2 rounded-md border ${
                                    error ? "border-red-500" : "border-transparent"
                                }`}
                                value={amount}
                                type="text"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            {error && <span className="text-red-400 text-sm">{error}</span>}

                            <button
                                onClick={handleDeposit}
                                disabled={isProcessing}
                                className="cursor-pointer mt-3 text-center p-2 font-semibold rounded-md bg-blue-700 hover:bg-blue-800 disabled:opacity-50"
                            >
                                {isProcessing ? "Processing..." : "Deposit"}
                            </button>
                        </div>
                    )}

                    {details.balance === "0.0" && !details.isCompleted && account === details.arbiter && (
                        <p className="text-yellow-400 mt-4 font-semibold text-center">
                            Waiting for deployer to deposit ETH.
                        </p>
                    )} 

                    {details.balance !== "0.0" && !details.isCompleted  && (
                        <div className="flex flex-col items-center mt-4">
                            <img src={success} alt="" className="object-contain w-25 h-25" />
                            <p className="text-green-500 font-bold mt-4 text-xl text-center">
                                Deployer has deposited ETH.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}