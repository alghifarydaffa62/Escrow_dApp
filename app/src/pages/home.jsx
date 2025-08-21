import { useEffect, useState } from "react"
import DeployForm from "../component/DeployFrom"
import ContactList from "../component/ContractList"
import EscrowDeploymentPop from "../component/PopUp/EscrowDeploymentPop"
import { ethers } from "ethers"
import EscrowFactoryAbi from "../../../artifacts/contracts/EscrowFactory.sol/EscrowFactory.json"

const FACTORY_ADDRESS = "0x7B193304e065bFFA17Db59eb3239f56351E3b61b";

export default function Home() {
    const [escrows, setEscrows] = useState([])
    const [user, setUser] = useState(null)
    const [showDeployPop, setShowDeployPop] = useState(false)

    useEffect(() => {
        const loadEscrow = async () => {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const userAddr = signer.address
            setUser(userAddr)

            const factory = new ethers.Contract(FACTORY_ADDRESS, EscrowFactoryAbi.abi, provider)
            const escrows = await factory.getUserEscrows(userAddr)

            setEscrows(escrows)
        }

        loadEscrow()
    }, [])

    const handleNewEscrow = async ({ name, services, arbiter }) => {
        if (!window.ethereum) return

        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const factory = new ethers.Contract(FACTORY_ADDRESS, EscrowFactoryAbi.abi, signer)

            const tx = await factory.createEscrow(name, services, arbiter)
            await tx.wait()

            setShowDeployPop(true)             

            const userAddr = signer.address
            const userEscrows = await factory.getUserEscrows(userAddr)
            setEscrows(userEscrows)
        } catch (err) {
            console.error("deployment failed", err)
        }
    }

    return(
        <div>
            <div className="mt-6 mb-10">
                <h1 className="text-3xl text-white text-center font-bold font-mono">
                Escrow Decentralized Application
                </h1>
                <p className="text-center text-white text-lg font-semibold">
                Project by{" "}
                <a
                    href="https://github.com/alghifarydaffa62"
                    target="_blank"
                    className="text-blue-300"
                >
                    alghifarydaffa62
                </a>
                </p>
            </div>

            {showDeployPop && (
                <EscrowDeploymentPop
                    isOpen={showDeployPop}
                    onClose={() => setShowDeployPop(false)}
                />
            )}

            <div className="flex flex-col md:flex-row justify-center gap-4 px-4 md:px-0">
                <DeployForm onDeploy={handleNewEscrow} />
                <ContactList escrows={escrows} user={user}/>
            </div>
        </div>  
    )
}