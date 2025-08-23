import { useState } from "react";
import metamask from "../assets/MetaMask.svg"

export default function ConnectWallet({ user, onConnect, onDisconnect }) {
  const [error, setError] = useState("")

  const handleConnectClick = async () => {
    if (!window.ethereum) {
      setError("❌ MetaMask not detected. Please install it first.")
      return
    }
    try {
      await onConnect()
      setError("")
    } catch (err) {
      setError("Failed to connect wallet.")
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      {user ? (
        <>
          <h1 className="text-blue-200 font-mono px-6 py-2 bg-[#1a385a] rounded-md">
            Connected: {user.slice(0, 10)}...{user.slice(-10)}
          </h1>
          <button
            onClick={onDisconnect}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Disconnect Wallet
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleConnectClick}
            className="flex gap-4 items-center bg-amber-600 px-5 py-2 rounded-md cursor-pointer"
          >
            <img src={metamask} alt="" className="w-8 h-8" />
            <h1 className="text-white font-semibold">Connect MetaMask</h1>
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  )
}