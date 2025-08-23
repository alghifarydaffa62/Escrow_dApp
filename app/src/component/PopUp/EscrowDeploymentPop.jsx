import { X } from "lucide-react";
import deploySuccess from "../../assets/rocket.png";

export default function EscrowDeploymentPop({ isOpen, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div
                className={`
                    relative transform transition-all duration-500 
                    ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
                    bg-[#121d32] rounded-2xl p-6 shadow-xl 
                    w-full max-w-md md:max-w-lg 
                    text-center font-mono text-white
                `}
            >
                <button
                    className="absolute top-4 right-5 text-gray-400 hover:text-white"
                    onClick={onClose}
                >
                    <X size={30} className="cursor-pointer" />
                </button>
                <img src={deploySuccess} alt="Success" className="mx-auto mb-4 w-20 md:w-28" />
                <h1 className="text-green-400 font-bold text-2xl md:text-3xl">Deployment Success</h1>
                <p className="mt-2 text-lg md:text-xl font-bold text-gray-300">Escrow has been deployed</p>
            </div>
        </div>
    );
}