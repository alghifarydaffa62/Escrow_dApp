import { useState } from "react"
import EscrowCompletePop from "./PopUp/EscrowCompletePop"
import PendingPopUp from "./PopUp/PendingPopUp"

export default function EscrowBoxDetail({ contract, account, address, details, refreshDetails }) {
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCompleteOpen, setIsCompleteOpen] = useState(false)
    const [completeData, setCompleteData] = useState(null)

    const handleApprove = async () => {
        try {
            const tx = await contract.approvePayment()
            setIsProcessing(true)

            const receipt = await tx.wait()
            setIsProcessing(false)

            const txHash = receipt.hash
            // const block = await contract.provider.getBlock(receipt.blockNumber)
            // const date = new Date(block.timestamp * 1000).toLocaleString()

            setCompleteData({ hash: txHash })
            setIsCompleteOpen(true)

        } catch (error) {
            console.error("Approval failed: ", error)
            alert("Approval failed")
        }
    }

    const isAuthorized = (
        account === details.deployer ||
        account === details.services ||
        account === details.arbiter
    )

    if (!isAuthorized) {
        return (
            <div className="bg-[#121d32] p-6 rounded-md text-center text-red-400">
                <h1 className="text-2xl font-semibold">Access Denied</h1>
                <p className="text-xl">You are not authorized to view this escrow.</p>
            </div>
        )
    }

    return (
        <>
            {isProcessing && <PendingPopUp type="Escrow Approvement" />}

            {isCompleteOpen && completeData && (
                <EscrowCompletePop
                    isOpen={isCompleteOpen}
                    onClose={() => {
                        setIsCompleteOpen(false)
                        refreshDetails()
                    }}
                    hash={completeData.hash}
                    // date={completeData.date}
                    service={details.services}
                    amount={details.balance}
                />
            )}

            <div className="bg-[#121d32] p-6 rounded-md">
                <h1 className="text-center text-2xl font-bold">Escrow Details:</h1>
                <h1
                    className={`text-lg font-bold mt-2 ${details.isCompleted ? "text-green-400" : "text-yellow-500"}`}
                >
                    Escrow status: {details.isCompleted ? "Completed" : "Not Completed"}
                </h1>

                <div className="flex flex-col gap-4 mt-2">
                    <DetailRow label="Address" value={address} />
                    <DetailRow label="Escrow Deployer" value={details.deployer} />
                    <DetailRow label="Service Provider" value={details.services} />
                    <DetailRow label="Arbiter Address" value={details.arbiter} />
                    <DetailRow label="Balance" value={details.balance} />
                    {!details.isCompleted && account === details.arbiter && details.balance != 0.0 && (
                        <button
                            className="cursor-pointer mt-4 bg-green-600 p-2 rounded-md font-semibold"
                            onClick={handleApprove}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "Processing..." : "Approve Payment"}
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

function DetailRow({ label, value }) {
    return (
        <div>
            <h1 className="text-lg font-semibold">{label}: </h1>
            <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400 break-all">
                {value}
            </p>
        </div>
    )
}
