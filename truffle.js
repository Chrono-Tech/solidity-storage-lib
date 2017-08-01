module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    test: {
      network_id: 424242,
      host: 'localhost',
      port: 8545,
      gas: 4700000
    }
  }
};
