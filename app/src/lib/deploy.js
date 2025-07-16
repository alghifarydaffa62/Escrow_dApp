import { BrowserProvider, ContractFactory } from "ethers";
import Escrow from "../../../artifacts/contracts/Escrow.sol/Escrow.json"

export default async function deployEscrow(arbiter, services) {
    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    const factory = new ContractFactory(
        Escrow.abi,
        Escrow.bytecode,
        signer
    )

    const contract = await factory.deploy(services, arbiter)

    await contract.waitForDeployment();

    return contract;
}