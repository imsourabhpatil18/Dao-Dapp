require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "-WVyL2liaxEKMfFnUy0WTdmWYpfPKHCu";
const SEPOLIA_PRIVATE_KEY =
  "b9d9221b388aa929da06b6063e4fd7b59e293656cad06702f40493f16d1637ef";

module.exports = {
  solidity: "0.8.19",

  paths: {
    sources: "./client/Contracts",
  },

  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/-WVyL2liaxEKMfFnUy0WTdmWYpfPKHCu",
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
