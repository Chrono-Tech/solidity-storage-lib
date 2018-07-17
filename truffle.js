module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 8000000,
    }
  },
  solc: {
    optimizer: {
        enabled: true,
        runs: 200,
    }
  },
};
