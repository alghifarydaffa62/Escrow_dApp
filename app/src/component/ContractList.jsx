import { Link } from "react-router-dom"

export default function ContactList({ escrows, user }) {
    return(
        <div className="text-white bg-[#121d32] p-6 font-mono rounded-md w-full md:w-[30vw]">
            <h1 className="font-semibold text-2xl mb-4">Contract Deployed</h1>
            
            <div className="h-[50vh] overflow-y-scroll flex flex-col gap-4 rounded-md">
                {escrows.length === 0 ? (
                    <p className="text-gray-400 italic">No Escrow Found</p>
                ) : (
                    escrows.map((escrow, index) => (
                        <div key={index} className="bg-[#152c47] p-4 mr-1 rounded-md">
                            <p className="text-md font-bold">{escrow.name}</p>
                            <Link 
                                to={`/escrow/${escrow.escrowAddress}`} 
                                className="text-gray-400 hover:text-blue-500 text-md"
                            >
                                {escrow.escrowAddress.slice(0, 28)}...
                            </Link>
                            <div>
                                {user == escrow.deployer ? (
                                    <p className="text-xs mt-2 px-3 py-1 bg-blue-500 w-fit font-semibold rounded-sm">Deployer</p>
                                ) : user == escrow.arbiter ? (
                                    <p className="text-xs mt-2 px-3 py-1 bg-green-800 w-fit font-semibold rounded-md">Arbiter</p>
                                ) : (
                                    <p className="text-xs mt-2 px-3 py-1 bg-cyan-700 w-fit font-semibold rounded-md">Service Provider</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}