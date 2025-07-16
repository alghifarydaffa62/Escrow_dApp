export default function EscrowBoxDetail({contract, account, address, details}) {
    const handleApprove = async () => {
        try {
            const tx = await contract.approvePayment()
            await tx.wait()
        } catch(error) {
            console.error("Approval failed: ", error)
        }
    }

    return(
        <div className="bg-[#121d32] p-6 rounded-md">
            <h1 className="text-center text-2xl font-bold">Escrow Details:</h1>
            
            <div className="flex flex-col gap-4 mt-4">
                <div>
                    <h1 className="text-lg font-semibold">Address: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{address}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Escrow Deployer: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.deployer}</p>
                </div>
                
                <div>
                    <h1 className="text-lg font-semibold">Service Provider: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.services}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Arbiter Address: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.arbiter}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Balance: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.balance}</p>
                </div>

                {account === details.arbiter && details.balance !== "0.0" && (
                    <button
                        className="cursor-pointer mt-4 bg-green-600 p-2 rounded-md font-semibold"
                        onClick={handleApprove}
                    >
                        Approve Payment
                    </button>
                )}
            </div>
        </div>
    )
}