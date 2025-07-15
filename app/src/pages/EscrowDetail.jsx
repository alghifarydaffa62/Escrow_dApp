import { useParams } from "react-router-dom"

export default function EscrowDetail() {
    const { address } = useParams()

    return(
        <div className="text-white">
            <h1 className="text-center text-3xl font-semibold my-6">Escrow <span className="text-blue-300">{address}</span></h1>
        </div>
    )
}