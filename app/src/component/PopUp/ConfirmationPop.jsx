
export default function ConfirmationPop({type}) {
    return(
        <div className="fixed inset-0 bg-opacity-150 flex justify-center items-center z-50">
            <div className="relative bg-[#121d32] rounded-2xl p-6 shadow-xl w-[400px] text-center font-mono text-white">
                <h1 className="text-2xl font-bold">Confirmation</h1>
                <h1 className="text-xl">You want to {type}</h1>
                <div className="flex gap-3 justify-center">
                    <button className="p-2 bg-red-600 rounded-lg cursor-pointer">Cancel</button>
                    <button className="p-2 bg-blue-600 rounded-lg cursor-pointer">Confirm</button>
                </div>
            </div>
        </div>
    )
}