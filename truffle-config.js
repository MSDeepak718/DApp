require("dotenv").config();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777",
      gas: 6000000,
      gasPrice: 20000000000,
    },
    advanced: {
      host: "127.0.0.1",
      port: 8545, 
      network_id: 5777,
      gas: 6000000,
      gasPrice: 20000000000,
      websocket: true,
    },
  },

  mocha: {
    timeout: 100000,
  },

  compilers: {
    solc: {
      version: "0.8.21",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: "istanbul",
      },
    },
  },

  db: {
    enabled: false,
  },
};
