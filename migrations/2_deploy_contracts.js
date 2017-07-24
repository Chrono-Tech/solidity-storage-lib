const Storage = artifacts.require('./Storage.sol');
const StorageInterface = artifacts.require('./StorageInterface.sol');

module.exports = function(deployer, network) {
    deployer.deploy(Storage)
      .then(() => deployer.deploy(StorageInterface))
      .then(() => console.log("[MIGRATION] [solidity-storage-lib] [1] Storage Contracts: #done"))
}
