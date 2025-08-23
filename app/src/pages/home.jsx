import { useEffect, useState } from "react"
import DeployForm from "../component/DeployFrom"
import ContactList from "../component/ContractList"
import EscrowDeploymentPop from "../component/PopUp/EscrowDeploymentPop"
import ConnectWallet from "../component/ConnectWallet"
import { ethers } from "ethers"
import EscrowFactoryAbi from "../../../artifacts/contracts/EscrowFactory.sol/EscrowFactory.json"

const FACTORY_ADDRESS = "0x7B193304e065bFFA17Db59eb3239f56351E3b61b";

export default function Home() {
    const [escrows, setEscrows] = useState([])
    const [user, setUser] = useState(null)
    const [showDeployPop, setShowDeployPop] = useState(false)
    const [provider, setProvider] = useState(null)
    const [signer, setSigner] = useState(null)

    useEffect(() => {
        const savedUser = localStorage.getItem("userWallet")
        if (savedUser) {
            handleConnect()
        }
    }, [])

    const loadEscrows = async (userAddr, providerInstance) => {
        try {
            const factory = new ethers.Contract(
                FACTORY_ADDRESS,
                EscrowFactoryAbi.abi,
                providerInstance
            )
            const userEscrows = await factory.getUserEscrows(userAddr)
            setEscrows(userEscrows)
        } catch (err) {
            console.error("Failed to load escrows:", err)
        }
    }

    const handleNewEscrow = async ({ name, services, arbiter }) => {
        if (!signer) {
            alert("Please connect your wallet first!")
            return
        }
        try {
            const factory = new ethers.Contract(
                FACTORY_ADDRESS,
                EscrowFactoryAbi.abi,
                signer
            )

            const tx = await factory.createEscrow(name, services, arbiter)
            await tx.wait()

            setShowDeployPop(true)
            await loadEscrows(user, provider)
        } catch (err) {
            console.error("Deployment failed:", err)
        }
    }

    const handleConnect = async () => {
        try {
            if (!window.ethereum) throw new Error("Metamask not installed")

            const providerInstance = new ethers.BrowserProvider(window.ethereum)
            const signerInstance = await providerInstance.getSigner()
            const userAddress = await signerInstance.getAddress()

            setProvider(providerInstance)
            setSigner(signerInstance)
            setUser(userAddress)
            localStorage.setItem("userWallet", userAddress)

            await loadEscrows(userAddress, providerInstance)
        } catch (err) {
            console.error("Wallet connection failed:", err)
        }
    }

    const handleDisconnect = () => {
        setUser(null)
        setProvider(null)
        setSigner(null)
        setEscrows([])
        localStorage.removeItem("userWallet")
    }

    return (
        <div>
            <div className="mt-6 mb-10">
                <h1 className="text-3xl text-white text-center font-bold font-mono">
                    Escrow Decentralized Application
                </h1>
            </div>

            {showDeployPop && (
                <EscrowDeploymentPop
                    isOpen={showDeployPop}
                    onClose={() => setShowDeployPop(false)}
                />
            )}

            <div className="flex justify-center mb-5">
                <ConnectWallet
                    user={user}
                    onConnect={handleConnect}
                    onDisconnect={handleDisconnect}
                />
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0 mb-10">
                <DeployForm onDeploy={handleNewEscrow} user={user}/>
                <ContactList escrows={escrows} user={user} />
            </div>
        </div>
    )
}