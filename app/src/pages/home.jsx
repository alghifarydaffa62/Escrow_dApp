import DeployForm from "../component/DeployFrom"
import ContactList from "../component/ContractList"

export default function Home() {
    return(
        <div>
            <h1 className='text-3xl mt-6 mb-10 text-white text-center font-bold font-mono'>Escrow Decentralized Application</h1>
            <div className="flex justify-evenly">
                <DeployForm/>
                <ContactList/>
            </div>
        </div>
    )
}