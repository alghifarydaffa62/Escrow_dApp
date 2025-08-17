import completed from "../../assets/check.png"
import { X } from "lucide-react"

export default function EscrowCompletePop({isOpen, onClose, hash, amount, service}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`
                relative transform transition-all duration-500 
                ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                bg-[#121d32] rounded-2xl p-6 shadow-xl w-[45vw] text-center font-mono text-white`}
            >
                <h1 className="text-green-400 font-bold text-3xl">Approvement Success!</h1>
                <p className="mt-1 text-lg text-gray-400">Your approvement has been confirmed.</p>

                <img src={completed} alt="" className="mx-auto my-4"/>
                <div className="flex flex-col gap-3 p-3 border-1 border-gray-500 rounded-lg">
                    {/* <div className="flex justify-between">
                        <h1 className="text-xl font-bold">Date</h1>
                        <p className="font-semibold">{date}</p>
                    </div> */}
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Transaction Hash</h1>
                        <a 
                            href={`https://sepolia.etherscan.io/tx/${hash}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-semibold text-blue-400 underline"
                        >
                            {hash.slice(0, 20)}...
                        </a>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Send To</h1>
                        <h1 className="font-semibold">{service.slice(0, 20)}...</h1>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Escrow Amount</h1>
                        <p className="font-bold">{amount} ETH</p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-lg font-bold">Status</h1>
                        <p className="font-semibold px-5 py-1 rounded-full bg-blue-600 border-1">Completed</p>
                    </div>
                </div>
                <button onClick={onClose} className="bg-blue-700 px-4 py-2 mt-4 rounded-lg cursor-pointer font-semibold hover:bg-blue-800">Close</button>
            </div>
        </div>
    )
}