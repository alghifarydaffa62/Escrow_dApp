import success from "../../assets/mark.png"
import { X } from "lucide-react"

export default function DepositSuccessPop({ isOpen, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className={`
                relative transform transition-all duration-500 
                ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}
                bg-[#121d32] rounded-2xl p-6 shadow-xl w-[400px] text-center font-mono text-white`}
            >
                <button
                    className="absolute top-3 right-5 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    <X size={30} className="cursor-pointer"/>
                </button>
                <img src={success} alt="Success" className="mx-auto mb-4" />
                <h1 className="text-green-400 font-bold text-2xl">Deposit Success</h1>
                <p className="mt-2 text-xl font-bold text-gray-300">Your deposit has been confirmed.</p>
            </div>
        </div>
    )
}