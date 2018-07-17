"use strict"
const Storage = artifacts.require("Storage")
const StorageManager = artifacts.require("StorageManager")
const UserContract = artifacts.require("StorageAdapter") // TODO: should be any user's contract that uses StorageAdapter as a base contract
const { basename, } = require("path")

module.exports = deployer => {
	deployer.then(async () => {
		await deployer.deploy(UserContract, Storage.address, "UserContract")

		const storageManager = await StorageManager.deployed()
		await storageManager.giveAccess(UserContract.address, "UserContract") // NOTE: provides write access to a userContract into a storage
		// await storageManager.blockAccess(UserContract.address, "UserContract") // NOTE: denies write access to a userContract into a storage

		console.info("[MIGRATION] [" + parseInt(basename(__filename)) + "] UserContract: #deployed #initialized")
	})
}
