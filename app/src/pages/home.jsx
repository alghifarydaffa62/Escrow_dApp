import { useEffect, useState } from "react"
import DeployForm from "../component/DeployFrom"
import ContactList from "../component/ContractList"

export default function Home() {
    const [escrows, setEscrows] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('escrows')
        if(saved) {
            setEscrows(JSON.parse(saved))
        }
    }, [])

    const handleNewEscrow = (escrow) => {
        const updated = [escrow, ...escrows]
        setEscrows(updated)
        localStorage.setItem('escrows', JSON.stringify(updated))
    }

    return(
        <div>
            <h1 className='text-3xl mt-6 mb-10 text-white text-center font-bold font-mono'>Escrow Decentralized Application</h1>
            <div className="flex justify-center gap-4">
                <DeployForm onDeploy={handleNewEscrow}/>
                <ContactList escrows={escrows}/>
            </div>
        </div>
    )
}