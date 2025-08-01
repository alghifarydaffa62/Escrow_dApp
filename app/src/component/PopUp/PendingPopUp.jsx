import { Loader2 } from "lucide-react"

export default function PendingPopUp({type}) {
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="
                relative transform transition-all duration-500 translate-y-0 opacity-100' 
                bg-[#121d32] rounded-2xl p-6 shadow-xl w-[40vw] text-center font-mono text-white"
            >
                <Loader2 className="mx-auto mb-4 animate-spin text-blue-400" size={80} />
                <h1 className="text-blue-400 font-bold text-3xl">Processing {type}</h1>
                <p className="mt-2 text-xl font-bold text-gray-300">Please wait until the system's verified...</p>
            </div>
        </div>
    )
}