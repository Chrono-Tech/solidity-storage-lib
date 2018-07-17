"use strict"
const StorageManager = artifacts.require("StorageManager")
const { basename, } = require("path")

module.exports = deployer => {
	deployer.then(async () => {
		await deployer.deploy(StorageManager)

		console.info("[MIGRATION] [" + parseInt(basename(__filename)) + "] StorageManager: #deployed")
	})
}
