const Storage = artifacts.require('Storage')
const FakeAccessManager = artifacts.require('FakeAccessManager')
const StorageManager = artifacts.require('StorageManager')

module.exports = function(deployer, network) {
	if (network === 'development' || network === 'test') {
		deployer.then(async () => {
			await deployer.deploy(FakeAccessManager)
			await deployer.deploy(Storage)
			await deployer.deploy(StorageManager)

			const storage = await Storage.deployed()
			await storage.setManager(FakeAccessManager.address)

			console.log("[MIGRATION] [solidity-storage-lib] [2.1] Test contracts: #done")
		})
	}
}
