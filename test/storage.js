const Storage = artifacts.require('Storage')
const FakeAccessManager = artifacts.require('FakeAccessManager')

function bytes32(stringOrNumber) {
	var zeros = '000000000000000000000000000000000000000000000000000000000000000'
	if (typeof stringOrNumber === "string") {
		return (web3.toHex(stringOrNumber) + zeros).substr(0, 66)
	}
	var hexNumber = stringOrNumber.toString(16)
	return '0x' + (zeros + hexNumber).substring(hexNumber.length - 1)
}

contract("Storage", function(accounts) {
	const owner = accounts[0]
	const nonowner = accounts[1]
	const allowedCrate = "crate1"
	const nonallowedCrate = "crate2"

	let storage
	let accessManager

	before("setup", function(done) {
		Storage.deployed()
			.then(instance => storage = instance)
			.then(() => FakeAccessManager.deployed())
			.then(instance => accessManager = instance)
			.then(() => {
				return accessManager.updateAllowed(owner, allowedCrate, true)
			})
			.then(() => done())
			.catch(e => done(e))
	})

	context("manager", function() {
		it("should have a manager set up", function() {
			return storage.manager().then(r => {
				assert.equal(r, accessManager.address)
			})
		})

		it("should not allow to re-set manager by non-owner", function() {
			return storage.setManager.call(accessManager.address, { from: nonowner, }).then(r => {
				return storage.setManager(accessManager.address, { from: nonowner, }).then(() => {
					assert.isNotOk(r)
				})
			})
		})
	})

	context("read/write data", function() {
		const valueUInt = 5
		const key = "key1"

		context("UINT", function() {
			it("should be able to write and then read the same value", function() {
				return storage.setUInt(allowedCrate, key, valueUInt).then(() => {
					return storage.getUInt.call(allowedCrate, key).then(r => {
						assert.equal(r, valueUInt)
					})
				})
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setUInt(nonallowedCrate, key, valueUInt).then(assert.fail).catch(() => {})
			})
		})

		context("UINT8", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setUInt8(allowedCrate, key, valueUInt)
				assert.isTrue((await storage.getUInt8.call(allowedCrate, key)).eq(valueUInt))
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setUInt8(nonallowedCrate, key, valueUInt).then(assert.fail).catch(() => {})
			})
		})

		const valueAddress = "0xffeeddccbbaa0000000000000000000000000000"

		context("ADDRESS", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setAddress(allowedCrate, key, valueAddress)
				assert.equal(await storage.getAddress.call(allowedCrate, key), valueAddress)
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setAddress(nonallowedCrate, key, valueAddress).then(assert.fail).catch(() => {})
			})
		})

		const valueBool = true

		context("BOOL", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setBool(allowedCrate, key, valueBool)
				assert.equal(await storage.getBool.call(allowedCrate, key), valueBool)
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setBool(nonallowedCrate, key, valueBool).then(assert.fail).catch(() => {})
			})
		})

		context("INT", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setInt(allowedCrate, key, valueUInt)
				assert.isTrue((await storage.getInt.call(allowedCrate, key)).eq(valueUInt))
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setInt(nonallowedCrate, key, valueUInt).then(assert.fail).catch(() => {})
			})
		})

		const valueBytes32 = bytes32("value of bytes32")

		context("BYTES32", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setBytes32(allowedCrate, key, valueBytes32)
				assert.equal(await storage.getBytes32.call(allowedCrate, key), valueBytes32)
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setBytes32(nonallowedCrate, key, valueBytes32).then(assert.fail).catch(() => {})
			})
		})

		context("ADDRESS_UINT8", async () => {
			it("should be able to write and then read the same value", async () => {
				await storage.setAddressUInt8(allowedCrate, key, valueAddress, valueUInt)
				const r = await storage.getAddressUInt8.call(allowedCrate, key)

				assert.equal(r.length, 2)
				assert.equal(r[0], valueAddress)
				assert.equal(r[1], valueUInt)
			})

			it("should not allow writing to non-allowed crate", function() {
				return storage.setAddressUInt8(nonallowedCrate, key, valueAddress, valueUInt).then(assert.fail).catch(() => {})
			})
		})
	})
})
