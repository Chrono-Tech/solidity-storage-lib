"use strict"
const Storage = artifacts.require('Storage')
const { basename, } = require("path")

module.exports = deployer => {
	deployer.then(async () => {
		await deployer.deploy(Storage)

		console.info("[MIGRATION] [" + parseInt(basename(__filename)) + "] Storage: #deployed")
	})
}