
export default function Welcome({account, details}) {
    return(
        <>
            {account === details.deployer ? (
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome <span className="text-blue-400">Deployer</span></h1>
                    {details.isCompleted ? (
                        <div className="mt-3">
                            <p className="text-xl font-semibold text-green-400">Escrow is now completed</p>
                            <p className="text-lg">Thank you Deployer and Thank you for using our service</p>
                        </div>
                    ) : (
                        <h1 className="text-lg">Please deposit SepoliaETH for the service provider</h1>
                    )}
                    
                </div>
            ) : account === details.arbiter ? (
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome <span className="text-green-400">Arbiter</span></h1>
                    {details.isCompleted ? (
                        <div className="mt-3">
                            <p className="text-xl font-semibold text-green-400">Escrow is now completed</p>
                            <p className="text-lg">Thank you arbiter and Thank you for using our service</p>
                        </div>
                    ): (
                        <p className="text-lg px-3">You will approve the transaction once ether is deposited</p>
                    )}
                    
                </div>
            ) : account === details.services ? (
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome <span className="text-cyan-400">Service Provider</span></h1>
                    {details.isCompleted ? (
                        <div className="mt-3">
                            <p className="text-xl font-semibold text-green-400">The arbiter has approved the payment</p>
                            <p className="text-lg">Check your wallet and thank you for using our service</p>
                        </div>
                    ) : (
                        <p className="text-lg">Please wait for the payment to be approved</p>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}