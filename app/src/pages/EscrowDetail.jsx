import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import EscrowAbi from "../../../artifacts/contracts/Escrow.sol/Escrow.json"

export default function EscrowDetail() {
    const { address } = useParams()
    const [contract, setContract] = useState()
    const [details, setDetails] = useState({})
    const [account, setAccount] = useState("")
    const [amount, setAmount] = useState()

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
            <div className="flex justify-center mb-6">
                <a href="/" className="p-4 bg-[#1e2f4d] rounded-md text-center font-semibold">
                    Back to home
                </a>
            </div>

            <div className="flex justify-center gap-6 mb-6">
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

                <div className="bg-[#121d32] p-6 rounded-md h-fit">
                    <h1 className="text-center text-2xl font-bold">Deposit Ether</h1>
                    <p className="text-center text-red-500 text-md font-bold">Only the Deployer!</p>

                    <div className="flex flex-col gap-4 mt-6">
                        <h1 className="text-lg font-semibold">Deposit Amount:</h1>
                        <input className="w-sm bg-[#172641] p-2 rounded-md" type="text" onChange={e => setAmount(e.target.value)}/>
                        <button className="cursor-pointer text-center p-2 bg-blue-700 font-semibold rounded-md">Deposit</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}