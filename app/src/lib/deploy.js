import { ethers } from "ethers";
import EscrowArtifact from "../../../artifacts/contracts/Escrow.sol/Escrow.json"

export default async function deployEscrow(arbiter, beneficiary, value, signer) {
    const factory = await ethers.ContractFactory(
        EscrowArtifact.abi,
        EscrowArtifact.bytecode,
        signer
    )

    const contract = await factory.deploy(beneficiary, arbiter, {
        value: ethers.utils.parseEther(value)
    })

    await contract.deployed();

    return contract.address;
}