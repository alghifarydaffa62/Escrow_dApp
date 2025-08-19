import { Link } from "react-router-dom"

export default function ContactList({ escrows }) {
    return(
        <div className="text-white bg-[#121d32] p-6 font-mono rounded-md w-full md:w-[30vw]">
            <h1 className="font-semibold text-2xl mb-4">Contract Deployed</h1>
            
            <div className="h-[280px] overflow-y-scroll flex flex-col gap-4 rounded-md">
                {escrows.length === 0 ? (
                    <p className="text-gray-400 italic">No Escrow Found</p>
                ) : (
                    escrows.map((escrow, index) => (
                        <div key={index} className="bg-[#152c47] p-4 mr-1 rounded-md">
                            <p className="text-md font-bold">Escrow Address:</p>
                            <Link 
                                to={`/escrow/${escrow}`} 
                                className="text-gray-400 hover:text-blue-500"
                            >
                                {escrow.slice(0, 28)}...
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}