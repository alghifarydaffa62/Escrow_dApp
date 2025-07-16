import { useParams } from "react-router-dom"
import EscrowBoxDetail from "../component/EscrowBoxDetail"
import EscrowDeposit from "../component/EscrowDeposit"
import BackButton from "../component/backbutton"

export default function EscrowDetail() {
    const { address } = useParams()

    return(
        <div className="text-white">
            <h1 className="text-center text-3xl font-semibold my-6">Escrow <span className="text-blue-300">{address}</span></h1>
            <BackButton/>

            <div className="flex justify-center gap-6 mb-6">
                <EscrowBoxDetail/>
                <EscrowDeposit/>
            </div>
        </div>
    )
}