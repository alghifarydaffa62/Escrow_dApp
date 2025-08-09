import { useEffect, useState } from "react"
import DeployForm from "../component/DeployFrom"
import ContactList from "../component/ContractList"
import DepositSuccessPop from "../component/PopUp/DepositSuccessPop"

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
            <div className="mt-6 mb-10">
                <h1 className='text-3xl text-white text-center font-bold font-mono'>Escrow Decentralized Application</h1>
                <p className="text-center text-white text-lg font-semibold">Project by <a href="https://github.com/alghifarydaffa62" target="_blank" className="text-blue-300">alghifarydaffa62</a></p>
            </div>
            
            <div className="flex justify-center gap-4">
                <DeployForm onDeploy={handleNewEscrow}/>
                <ContactList escrows={escrows}/>
            </div>
        </div>  
    )
}