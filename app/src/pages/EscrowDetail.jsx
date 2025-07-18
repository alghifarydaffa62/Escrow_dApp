import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import EscrowAbi from "../../../artifacts/contracts/Escrow.sol/Escrow.json"
import EscrowBoxDetail from "../component/EscrowBoxDetail"
import EscrowDeposit from "../component/EscrowDeposit"
import BackButton from "../component/backbutton"
import Welcome from "../component/Welcome"
import DepositSuccessPop from "../component/PopUp/DepositSuccessPop"

export default function EscrowDetail() {
    const { address } = useParams()
    const [contract, setContract] = useState()
    const [details, setDetails] = useState({})
    const [account, setAccount] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const escrow = new ethers.Contract(address, EscrowAbi.abi, signer)
            setContract(escrow)

            const [deployer, arbiter, services, bal, isCompleted] = await Promise.all([
                escrow.deployer(),
                escrow.arbiter(),
                escrow.services(),
                escrow.balance(),
                escrow.isCompleted()
            ])

            const balance = ethers.formatEther(bal)
            const userAddress = await signer.getAddress()

            setAccount(userAddress)
            setDetails({deployer, arbiter, services, balance, isCompleted})
            setLoading(false)
        }
        init()
    }, [address])

    if(loading) {
        return(
            <div className="text-white flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                <span className="ml-4 font-semibold text-xl">Loading escrow data...</span>
            </div>
        )   
    } 

    return(
        <div className="text-white font-mono">
            <h1 className="text-center text-3xl font-semibold my-6">Escrow <span className="text-blue-300">{address}</span></h1>
            <BackButton/>
            <Welcome account={account} details={details}/>

            <div className="flex justify-center gap-6 mb-6">
                <EscrowBoxDetail contract={contract} account={account} address={address} details={details}/>
                <EscrowDeposit contract={contract} account={account} details={details}/>
            </div>
        </div>
    )
}