require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_RPC_URL =
    process.env.MAINNET_RPC_URL ||
    process.env.ALCHEMY_MAINNET_RPC_URL ||
    "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const POLYGON_MAINNET_RPC_URL =
    process.env.POLYGON_MAINNET_RPC_URL || "https://polygon-mainnet.alchemyapi.io/v2/your-api-key"
const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL || "https://eth-goerli.alchemyapi.io/v2/your-api-key"

const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000"
// optional
const MNEMONIC = process.env.MNEMONIC || "your mnemonic"

// Your API key for Etherscan, obtain one at https://etherscan.io/
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key"
const REPORT_GAS = process.env.REPORT_GAS || false

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts:
                OWNER_PRIVATE_KEY !== undefined
                    ? [
                          OWNER_PRIVATE_KEY,
                      ]
                    : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 5,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },

        mainnet: {
            url: MAINNET_RPC_URL,
            accounts:
                OWNER_PRIVATE_KEY !== undefined
                    ? [
                          OWNER_PRIVATE_KEY,
                      ]
                    : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 1,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
        polygon: {
            url: POLYGON_MAINNET_RPC_URL,
            accounts:
                OWNER_PRIVATE_KEY !== undefined
                    ? [
                          OWNER_PRIVATE_KEY,
                      ]
                    : [],
            saveDeployments: true,
            chainId: 137,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
    },
    etherscan: {
        // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
        apiKey: {
            polygon: POLYGONSCAN_API_KEY,
            goerli: ETHERSCAN_API_KEY,
        },
    },
    gasReporter: {
        enabled: REPORT_GAS,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    contractSizer: {
        runOnCompile: true,
        only: ["ChangePresident", "GovernanceToken", "GovernorContract", "TimeLock"],
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the 0th account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
                settings: {
                    optimizer: {
                      enabled: true,
                      runs: 200
                    }
                }
            },
            {
                version: "0.8.8",
                settings: {
                    optimizer: {
                      enabled: true,
                      runs: 200
                    }
                }
            },
            {
                version: "0.8.9",
                settings: {
                    optimizer: {
                      enabled: true,
                      runs: 200
                    }
                }
            }
        ],
    },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },

}
