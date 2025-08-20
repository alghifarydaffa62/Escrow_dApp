import success from "../../assets/mark.png"

export default function DepositSuccessPop({ isOpen, onClose, hash, depositAmount }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div
                className={`
                    relative transform transition-all duration-500 
                    ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
                    bg-[#121d32] rounded-lg p-6 shadow-xl 
                    w-full max-w-md md:max-w-2xl 
                    text-center font-mono text-white
                `}
            >
                <h1 className="text-green-400 font-bold text-2xl md:text-3xl">Deposit Success!</h1>
                <p className="mt-1 text-base md:text-lg text-gray-400">Your deposit has been confirmed.</p>

                <img src={success} alt="Success" className="mx-auto my-4 w-28 md:w-30" />

                <div className="flex flex-col gap-3 p-3 border border-gray-500 rounded-lg text-left">
                    <div className="flex justify-between gap-4">
                        <h1 className="text-sm md:text-lg font-bold">Transaction Hash</h1>
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${hash}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-semibold text-blue-400 underline truncate max-w-[60%] text-right"
                        >
                          {hash.slice(0, 30)}...
                        </a>
                    </div>
                    <div className="flex justify-between gap-4">
                        <h1 className="text-base md:text-lg font-semibold">Deposit Amount</h1>
                        <p className="font-bold">{depositAmount} ETH</p>
                    </div>
                    <div className="flex justify-between gap-4">
                        <h1 className="text-base md:text-lg font-semibold">Status</h1>
                        <p className="font-bold px-4 py-1 rounded-full bg-[#172844]">Success</p>
                    </div>
                </div>

                <button 
                    onClick={onClose} 
                    className="bg-blue-700 px-4 py-2 mt-4 rounded-lg cursor-pointer font-semibold hover:bg-blue-800 w-full md:w-auto"
                >
                    Close
                </button>
            </div>
        </div>
    )
}