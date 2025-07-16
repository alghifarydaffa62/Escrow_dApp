import { useState } from "react"
import { ethers } from "ethers"

export default function EscrowDeposit({contract, account, details}) {
    const [amount, setAmount] = useState()

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
            alert("Deposit Success")
        } catch(error) {
            console.error(error)
            alert("Deposit failed")
        }  
    }

    return (
        <>
            {(account === details.deployer || account === details.arbiter) && (
                <div className="bg-[#121d32] p-6 rounded-md h-fit">
                    <h1 className="text-center text-2xl font-bold">Deposit Ether</h1>

                    {details.balance === "0.0" ? (
                        account === details.deployer ? (
                            <div className="flex flex-col gap-4 mt-6">
                                <h1 className="text-lg font-semibold">Deposit Amount:</h1>
                                <input
                                    className="w-sm bg-[#172641] p-2 rounded-md"
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
                        ) : (
                            <p className="text-yellow-400 mt-4 font-semibold text-center">
                            Waiting for deployer to deposit ETH.
                            </p>
                        )
                        ) : (
                        <p className="text-blue-500 font-bold mt-4 text-lg text-center">
                            Deployer has deposited ETH.
                        </p>
                    )}
                </div>
            )}
        </>
    )

}