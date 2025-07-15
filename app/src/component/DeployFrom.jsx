import { useState } from "react"
import { ethers } from "ethers"
import deployEscrow from "../lib/deploy"

export default function DeployForm({ onDeploy }) {
    const [arbiter, setArbiter] = useState("")
    const [beneficiary, setBeneficiary] = useState("")
    const [value, setValue] = useState("")

    const handleDeploy = async () => {
        if(!window.ethereum) return alert("Metamask or browser waller required!")

        const provider = new ethers.provider.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])

        const signer = provider.getSigner()

        const contractAddress = await deployEscrow(arbiter, beneficiary, value, signer)
        onDeploy({
            address: contractAddress,
            arbiter,
            beneficiary,
            value
        })
    }
    return(
        <div className="flex flex-col gap-4 text-white bg-[#121d32] p-6 font-mono rounded-md">
            <h1 className="text-2xl font-semibold">Deploy New Escrow</h1>

            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Arbiter Address:</label>
                <input type="text" onChange={e => setArbiter(e.target.value)} className="bg-[#192845] rounded-sm w-md h-8 p-2"/>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Beneficiary Address:</label>
                <input type="text" onChange={e => setBeneficiary(e.target.value)} className="bg-[#192845] rounded-sm w-md h-8 p-2"/>
            </div>
            
            <div className="flex flex-col gap-2"> 
                <label className="text-lg font-semibold">Transfer Amount:</label>
                <input type="text" onChange={e => setValue(e.target.value)} className="bg-[#192845] rounded-sm w-md h-8 p-2"/>
            </div>
            
            <button onClick={handleDeploy} className="cursor-pointer bg-blue-600 mt-4 p-2 rounded-md font-semibold text-lg">Deploy</button>
        </div>
    )
}