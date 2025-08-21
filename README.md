# Escrow DApp

A decentralized Escrow application built with **Solidity** smart contracts and a **React.js** frontend.  
This project demonstrates how funds can be securely held in an escrow contract until approved by a designated arbiter.

---

## ✨ Features
- **Deploy Escrow Contracts**: Users can create new escrow contracts through the UI.
- **Track Escrow Contracts**: Deployed contracts are displayed in a contract list with their addresses.
- **Arbiter Approval System**: The arbiter has the authority to release funds to the beneficiary.
- **Wallet Integration Payment (Metamask)**: This dApp allows users to make payments through MetaMask..

---

## 🔑 Smart Contracts
- **Escrow.sol**
  - Holds ETH deposited during contract deployment.
  - Requires arbiter approval before releasing funds to the beneficiary.
  - Prevents unauthorized withdrawals.

- **EscrowFactory.sol**
  - Responsible for deploying new escrow contracts.
  - Stores a list of all deployed escrows.
  - Provides helper functions for retrieving deployed contracts.

---

## 🛠 Tech Stack
- **Frontend**: React.js + Vite, Tailwind CSS
- **Blockchain & Contracts**: Solidity, Hardhat, Ethers.js
- **Wallet Integration**: MetaMask
- **Deployment**: Vercel (for frontend), Hardhat local network or testnets (Sepolia)

---

## 🔄 Usage Flow
1. **Connect Wallet**  
   - User connects MetaMask to the DApp.

2. **Deploy Escrow Contract**  
   - Enter the arbiter and beneficiary addresses.    
   - Deploy contract via the UI.

3. **Track Contracts**  
   - Newly deployed escrow contract address appears in the contract list.  
   - Each contract card shows details (arbiter, beneficiary, value).

4. **Approve Transaction**  
   - Arbiter can approve the contract directly from the UI.  
   - Upon approval, funds are released to the beneficiary.

---

## 🚀 Deployment
This dApp is already deployed on Vercel: 

---