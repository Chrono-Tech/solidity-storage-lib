"use strict"
const Storage = artifacts.require('Storage')
const StorageManager = artifacts.require("StorageManager")
const { basename, } = require("path")

module.exports = deployer => {
	deployer.then(async () => {
		const storage = await Storage.deployed()
		await storage.setManager(StorageManager.address)

		// const storageManager = await StorageManager.deployed()
		// const eventsHistory = storageManager // EventsHistory or MultiEventsHistory. See solidity-eventshistory-lib
		// await storageManager.setupEventsHistory(eventsHistory.address)

		// NOTE: authorize or reject storageManager in events history

		console.info("[MIGRATION] [" + parseInt(basename(__filename)) + "] StorageManager: #initialized")
	})
}
