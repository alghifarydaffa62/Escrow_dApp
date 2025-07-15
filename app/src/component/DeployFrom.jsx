
export default function DeployForm() {
    return(
        <div className="flex flex-col gap-4 text-white bg-[#121d32] p-6 font-mono rounded-md">
            <h1 className="text-2xl font-semibold">Deploy New Contract</h1>

            <div className="flex flex-col gap-2">
                <label className="text-lg font-semibold">Arbiter Address:</label>
                <input type="text" className="bg-[#192845] rounded-sm w-md h-8"/>
            </div>
            <div className="flex flex-col gap-2">
                <label>Beneficiary Address:</label>
                <input type="text" className="bg-[#192845] rounded-sm w-md h-8"/>
            </div>
            <div className="flex flex-col gap-2"> 
                <label>Transfer Amount:</label>
                <input type="text" className="bg-[#192845] rounded-sm w-md h-8"/>
            </div>
            
            <button className="cursor-pointer bg-blue-600 mt-4 p-2 rounded-md">Deploy</button>
        </div>
    )
}