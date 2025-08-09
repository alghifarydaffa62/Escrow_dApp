import success from "../../assets/mark.png"

export default function DepositSuccessPop({ depositAmount, isOpen, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`
                relative transform transition-all duration-500 
                ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                bg-[#121d32] rounded-lg p-6 shadow-xl w-[37vw] text-center font-mono text-white`}
            >
                <h1 className="text-green-400 font-bold text-3xl">Deposit Success!</h1>
                <p className="mt-1 text-lg text-gray-400">Your deposit has been confirmed.</p>

                <img src={success} alt="" className="mx-auto my-4"/>
                <div className="flex flex-col gap-3 p-3 border-1 border-gray-500 rounded-lg">
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Date</h1>
                        <p className="font-semibold">{new Date().toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Transaction Hash</h1>
                        <p className="font-semibold">ssggsgdsgsdgsgs</p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Status</h1>
                        <p className="font-bold px-5 py-1 rounded-full bg-[#172844] border-1">Success</p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Deposit Amount</h1>
                        <p className="font-bold">{depositAmount} ETH</p>
                    </div>
                </div>

                <button onClick={onClose} className="bg-blue-700 px-4 py-2 mt-4 rounded-lg cursor-pointer font-semibold hover:bg-blue-800">Close</button>
            </div>
        </div>
    )
}