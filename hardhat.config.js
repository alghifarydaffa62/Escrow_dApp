require("dotenv").config()
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.VITE_RPC_URL,
      accounts: [process.env.VITE_PRIVATE_KEY]
    }
  }
};
