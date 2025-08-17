import { useState } from "react"
import deployEscrow from "../lib/deploy"
import EscrowDeploymentPop from "./PopUp/EscrowDeploymentPop"
import PendingPopUp from "./PopUp/PendingPopUp"

export default function DeployForm({ onDeploy }) {
    const [arbiter, setArbiter] = useState("")
    const [services, setServices] = useState("")
    const [errors, setErrors] = useState({})
    const [showDeployPop, setShowDeployPop] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)
    const [deployedEscrow, setDeployedEscrow] = useState()
    const [deployer, setDeployer] = useState("")

    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/

    const validateForm = (deployerAddr) => {
        let newErrors = {}

        if (!arbiter) {
            newErrors.arbiter = "Arbiter address tidak boleh kosong."
        } else if (!ethAddressRegex.test(arbiter)) {
            newErrors.arbiter = "Arbiter address tidak valid (harus 0x + 40 hex)."
        }

        if (!services) {
            newErrors.services = "Service Provider address tidak boleh kosong."
        } else if (!ethAddressRegex.test(services)) {
            newErrors.services = "Service Provider address tidak valid (harus 0x + 40 hex)."
        }

        if (arbiter && services && arbiter.toLowerCase() === services.toLowerCase()) {
            newErrors.services = "Arbiter dan Service Provider tidak boleh sama."
        }

        if (deployerAddr) {
            if (arbiter && deployerAddr.toLowerCase() === arbiter.toLowerCase()) {
                newErrors.arbiter = "Deployer tidak boleh sama dengan Arbiter."
            }
            if (services && deployerAddr.toLowerCase() === services.toLowerCase()) {
                newErrors.services = "Deployer tidak boleh sama dengan Service Provider."
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleDeploy = async () => {

        if (!window.ethereum) {
            alert("MetaMask tidak ditemukan! Silakan install MetaMask dulu.")
            return
        }

        try {

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
            const deployerAddr = accounts[0]
            setDeployer(deployerAddr)

            if (!deployerAddr) {
                alert("Wallet tidak terhubung ke MetaMask.")
                return
            }

            if (!validateForm(deployerAddr)) return

            setIsProcessing(true)

            const contract = await deployEscrow(arbiter, services)

            const escrow = {
                address: await contract.getAddress(),
                arbiter,
                services,
                deployer: deployerAddr,
                contract
            }

            onDeploy(escrow)
            setDeployedEscrow(escrow)

            setIsProcessing(false)
            setShowDeployPop(true)
            setArbiter("")
            setServices("")
        } catch (error) {
            console.error("Deployment error: ", error)
            setIsProcessing(false)
        }
    }

    return (
        <>  
            {isProcessing && <PendingPopUp type="Escrow Deployment"/>}
            {showDeployPop && (
                <EscrowDeploymentPop
                    isOpen={showDeployPop}
                    onClose={() => setShowDeployPop(false)}
                    address={deployedEscrow.address}
                />
            )}
            <div className="flex flex-col gap-4 text-white bg-[#121d32] p-6 font-mono rounded-md h-fit">
                <h1 className="text-2xl font-semibold">Deploy New Escrow</h1>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Arbiter Address:</label>
                    <input
                        type="text"
                        value={arbiter}
                        onChange={e => setArbiter(e.target.value)}
                        className={`bg-[#192845] rounded-sm w-md h-8 p-2 border ${errors.arbiter ? "border-red-500" : "border-transparent"}`}
                    />
                    {errors.arbiter && <span className="text-red-400 text-sm">{errors.arbiter}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Service Provider Address:</label>
                    <input
                        type="text"
                        value={services}
                        onChange={e => setServices(e.target.value)}
                        className={`bg-[#192845] rounded-sm w-md h-8 p-2 border ${errors.services ? "border-red-500" : "border-transparent"}`}
                    />
                    {errors.services && <span className="text-red-400 text-sm">{errors.services}</span>}
                </div>
                
                <button
                    onClick={handleDeploy}
                    disabled={isProcessing}
                    className="cursor-pointer bg-blue-600 mt-4 p-2 rounded-md font-semibold text-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {isProcessing ? "Processing..." : "Deploy"}
                </button>
            </div>
        </>
    )
}