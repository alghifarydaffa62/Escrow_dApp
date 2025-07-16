import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import EscrowAbi from "../../../artifacts/contracts/Escrow.sol/Escrow.json"
import EscrowBoxDetail from "../component/EscrowBoxDetail"
import EscrowDeposit from "../component/EscrowDeposit"
import BackButton from "../component/backbutton"

export default function EscrowDetail() {
    const { address } = useParams()
    const [contract, setContract] = useState()
    const [details, setDetails] = useState({})
    const [account, setAccount] = useState("")

    useEffect(() => {
        const init = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const escrow = new ethers.Contract(address, EscrowAbi.abi, signer)
            setContract(escrow)

            const [deployer, arbiter, services, bal] = await Promise.all([
                escrow.deployer(),
                escrow.arbiter(),
                escrow.services(),
                escrow.balance()
            ])

            const balance = ethers.formatEther(bal)
            const userAddress = await signer.getAddress()

            setAccount(userAddress)
            setDetails({deployer, arbiter, beneficiary: services, balance})
        }
        init()
    }, [address])

    return(
        <div className="text-white">
            <h1 className="text-center text-3xl font-semibold my-6">Escrow <span className="text-blue-300">{address}</span></h1>
            <BackButton/>

            <div className="flex justify-center gap-6 mb-6">
                <EscrowBoxDetail contract={contract} account={account} address={address} details={details}/>
                <EscrowDeposit contract={contract} account={account} details={details}/>
            </div>
        </div>
    )
}