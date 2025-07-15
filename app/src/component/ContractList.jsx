import { Link } from "react-router-dom"

export default function ContactList({ escrows }) {
    return(
        <div className="text-white bg-[#121d32] p-6 font-mono rounded-md">
            <h1 className="font-semibold text-2xl mb-4">Contract Deployed</h1>

            <div className="flex flex-col gap-4 rounded-md">
                {escrows.map((escrow, index) => (
                    <div key={index} className="bg-[#152c47] p-4 rounded-md">
                        <p className="text-md font-bold">Escrow Address:</p>
                        <Link to={`/escrow/${escrow.address}`} className="text-gray-400 hover:text-blue-500">{escrow.address}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}