import success from "../../assets/mark.png"
import { X } from "lucide-react"

export default function DepositSuccessPop({ onClose }) {
    return (
        <div className="fixed inset-0 bg-[#101724] bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-[#121d32] rounded-2xl p-6 shadow-xl w-[400px] text-center font-mono text-white">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    <X size={20} className="cursor-pointer"/>
                </button>
                <img src={success} alt="Success" className="mx-auto mb-4" />
                <h1 className="text-green-400 font-bold text-2xl">Deposit Success</h1>
                <p className="mt-2 text-xl font-bold text-gray-300">Your deposit has been confirmed.</p>
            </div>
        </div>
    )
}