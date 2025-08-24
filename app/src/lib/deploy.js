import { BrowserProvider, ContractFactory } from "ethers";
import EscrowFactoryAbi from "../lib/EscrowFactoryAbi.json"
import { ethers } from "ethers";

const FACTORY_ADDRESS = "0x678EC708303543BE5B91e4fB89Ed323327ff3A7c";

export default async function deployEscrow(arbiter, services) {
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        EscrowFactoryAbi.abi,
        signer
    )

    const tx = await factory.createEscrow(services, arbiter)
    const receipt = await tx.wait()

    const event = receipt.logs
        .map(log => {
            try {
                return factory.interface.parseLog(log)
            } catch {
                return null
            }
        })
        .filter(e => e && e.name === "EscrowCreated")[0]

    if(!event) throw new Error("EscrowCreated not found");

    const escrowAddress = event.args.escrowAddress
    return escrowAddress
}