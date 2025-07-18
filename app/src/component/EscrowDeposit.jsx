import { useState } from "react"
import { ethers } from "ethers"
import success from "../assets/mark.png"
import completed from "../assets/check.png"
import DepositSuccessPop from "./PopUp/DepositSuccessPop"

export default function EscrowDeposit({contract, account, details, onSuccess}) {
    const [amount, setAmount] = useState()
    const [showSuccessPop, setShowSuccessPop] = useState(false)

    const handleDeposit = async () => {
        try {
            if(account !== details.deployer) {
                return alert("Only deployer can deposit")
            }

            if(!amount || isNaN(amount) || Number(amount) <= 0) {
                return alert("Please enter a valid amount")
            }

            const tx = await contract.deposit({
                value: ethers.parseEther(amount)
            })

            await tx.wait()
            setShowSuccessPop(true)
            setAmount("")
            onSuccess()
        } catch(error) {
            console.error(error)
            alert("Deposit failed")
        }  
    }

    return (
        <>
            {showSuccessPop && <DepositSuccessPop onClose={() => setShowSuccessPop(false)}/>}
            {(account === details.deployer || account === details.arbiter) && (
                <div className="bg-[#121d32] p-6 rounded-md h-fit">
                    <h1 className="text-center text-2xl font-bold">Deposit Ether</h1>

                    {/* Kondisi 4: Escrow selesai */}
                    {details.isCompleted && details.balance === "0.0" && (
                        <div className="flex flex-col gap-2 items-center mt-4">
                            <img src={completed} alt="" className="object-contain w-35 h-35"/>
                            <p className="text-xl text-green-400 font-semibold">
                            Escrow is now completed.
                            </p>
                        </div>
                    )}

                    {/* Kondisi 1: Deployer deposit */}
                    {!details.isCompleted && details.balance === "0.0" && account === details.deployer && (
                        <div className="flex flex-col gap-4 mt-6">
                            <h1 className="text-lg font-semibold">Deposit Amount:</h1>
                            <input
                                className="w-sm bg-[#172641] p-2 rounded-md"
                                value={amount}
                                type="text"
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <button
                                onClick={handleDeposit}
                                className="cursor-pointer text-center p-2 font-semibold rounded-md bg-blue-700 hover:bg-blue-800"
                            >
                                Deposit
                            </button>
                        </div>
                    )}

                    {/* Kondisi 2: Arbiter menunggu deposit */}
                    {!details.isCompleted && details.balance === "0.0" && account === details.arbiter && (
                        <p className="text-yellow-400 mt-4 font-semibold text-center">
                        Waiting for deployer to deposit ETH.
                        </p>
                    )}

                    {/* Kondisi 3: ETH sudah dideposit (belum approve) */}
                    {!details.isCompleted && details.balance !== "0.0" && (
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