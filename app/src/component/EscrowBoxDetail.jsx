import { useEffect, useState } from "react"
import { ethers } from "ethers"
import EscrowAbi from "../../../artifacts/contracts/Escrow.sol/Escrow.json"
import { useParams } from "react-router-dom"

export default function EscrowBoxDetail() {
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
        <div className="bg-[#121d32] p-6 rounded-md">
            <h1 className="text-center text-2xl font-bold">Escrow Details:</h1>

            <div className="flex flex-col gap-4 mt-4">
                <div>
                    <h1 className="text-lg font-semibold">Address: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{address}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Escrow Deployer: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.deployer}</p>
                </div>
                
                <div>
                    <h1 className="text-lg font-semibold">Service Provider: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.beneficiary}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Arbiter Address: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.arbiter}</p>
                </div>

                <div>
                    <h1 className="text-lg font-semibold">Balance: </h1>
                    <p className="p-3 bg-[#172641] mt-2 rounded-lg text-gray-400">{details.balance}</p>
                </div>
            </div>
        </div>
    )
}