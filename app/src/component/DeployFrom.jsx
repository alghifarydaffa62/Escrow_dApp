import { useState } from "react"
import deployEscrow from "../lib/deploy"
import EscrowDeploymentPop from "./PopUp/EscrowDeploymentPop"

export default function DeployForm({ onDeploy }) {
    const [arbiter, setArbiter] = useState("")
    const [services, setServices] = useState("")
    const [showDeployPop, setShowDeployPop] = useState(false)

    const handleDeploy = async () => {
        try {
            const contract = await deployEscrow(arbiter, services)

            const escrow = {
                address: await contract.getAddress(),
                arbiter,
                services,
                contract
            }

            onDeploy(escrow)
            setShowDeployPop(true)
            setArbiter("")
            setServices("")

        } catch(error) {
            console.error("Deployment error: ", error)
        }
    }

    return(
        <>
            {showDeployPop && <EscrowDeploymentPop onClose={() => setShowDeployPop(false)}/>}
            <div className="flex flex-col gap-4 text-white bg-[#121d32] p-6 font-mono rounded-md h-[330px]">
                <h1 className="text-2xl font-semibold">Deploy New Escrow</h1>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Arbiter Address:</label>
                    <input type="text" value={arbiter} onChange={e => setArbiter(e.target.value)} className="bg-[#192845] rounded-sm w-md h-8 p-2"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Service Provider Address:</label>
                    <input type="text" value={services} onChange={e => setServices(e.target.value)} className="bg-[#192845] rounded-sm w-md h-8 p-2"/>
                </div>
                
                <button onClick={handleDeploy} className="cursor-pointer bg-blue-600 mt-4 p-2 rounded-md font-semibold text-lg">Deploy</button>
            </div>
        </>
        
    )
}