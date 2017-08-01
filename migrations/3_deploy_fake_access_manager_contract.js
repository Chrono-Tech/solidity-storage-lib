const Storage = artifacts.require('./Storage.sol');
const FakeAccessManager = artifacts.require('./stubs/FakeAccessManager.sol');

module.exports = function(deployer, network) {
    if (network === 'development' || network === 'test') {
        deployer.deploy(FakeAccessManager)
        .then(() => Promise.all([FakeAccessManager.deployed(), Storage.deployed()]))
        .then((instances) => {
            let [fakeAccessManager, storage] = instances
            storage.setManager(fakeAccessManager.address)
        })
        .then(() => console.log("[MIGRATION] [solidity-storage-lib] [1.1] FakeAccessManager: #done"))
    }
}
