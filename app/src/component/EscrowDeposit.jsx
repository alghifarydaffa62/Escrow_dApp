import { useState } from "react"

export default function EscrowDeposit() {
    const [amount, setAmount] = useState()

    return(
        <div className="bg-[#121d32] p-6 rounded-md h-fit">
            <h1 className="text-center text-2xl font-bold">Deposit Ether</h1>
            <p className="text-center text-red-500 text-md font-bold">Only the Deployer!</p>

            <div className="flex flex-col gap-4 mt-6">
                <h1 className="text-lg font-semibold">Deposit Amount:</h1>
                <input className="w-sm bg-[#172641] p-2 rounded-md" type="text" onChange={e => setAmount(e.target.value)}/>
                <button className="cursor-pointer text-center p-2 bg-blue-700 font-semibold rounded-md">Deposit</button>
            </div>
            
        </div>
    )
}