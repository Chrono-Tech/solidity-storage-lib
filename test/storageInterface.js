"use strict"

const FakeAccessManager = artifacts.require('FakeAccessManager')
const Storage = artifacts.require('Storage')
const StorageTester = artifacts.require('StorageTester')

const Asserts = require('./helpers/asserts')
const Reverter = require('./helpers/reverter')


contract('StorageInterface', accounts => {
	const reverter = new Reverter(web3)

	const asserts = Asserts(assert)
	let storage
	let storageManager
	let storageTester


	before('setup', async () => {
		const crate = "test"

		storage = await Storage.deployed()
		storageManager = await FakeAccessManager.deployed()
		storageTester = await StorageTester.new(storage.address, crate)
		console.log(`#### ${JSON.stringify(web3.eth.getBlock("latest"), null, 4)}`)

		await storageManager.updateAllowed(storageTester.address, crate, true)
		await storageTester.reinitPlain()
		// await storageTester.reinitMapping()
		await storageTester.reinitMappingComplex()
		await storageTester.reinitCollections()

		await reverter.snapshot()
	})

	afterEach('revert', reverter.revert)

	context("plain values", () => {

		it('should store uint8 values', () => {
			const value = web3.toBigNumber("0xff")
			return storageTester.setUInt8(value)
				.then(() => storageTester.getUInt8())
				.then(asserts.equal(value))
		})

		it('should store uint values', () => {
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			return storageTester.setUInt(value)
				.then(() => storageTester.getUInt())
				.then(asserts.equal(value))
		})

		it('should store address values', () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			return storageTester.setAddress(value)
				.then(() => storageTester.getAddress())
				.then(asserts.equal(value))
		})

		it('should store bool values', () => {
			const value = true
			return storageTester.setBool(value)
				.then(() => storageTester.getBool())
				.then(asserts.equal(value))
		})

		it('should store int values', () => {
			const value = web3.toBigNumber(2).pow(255).sub(1).mul(-1)
			return storageTester.setInt(value)
				.then(() => storageTester.getInt())
				.then(asserts.equal(value))
		})

		it('should store bytes32 values', () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageTester.setBytes32(value)
				.then(() => storageTester.getBytes32())
				.then(asserts.equal(value))
		})
	})

	context("mappings", () => {

		it('should store bytes32 => bytes32 mapping values', () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageTester.setMapping(key, value)
				.then(() => storageTester.getMapping(key))
				.then(asserts.equal(value))
		})

		it('should store address => uint mapping values', () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			return storageTester.setAddressUIntMapping(key, value)
				.then(() => storageTester.getAddressUIntMapping(key))
				.then(asserts.equal(value))
		})

		it('should store uint => address mapping values', () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			return storageTester.setUIntAddressMapping(key, value)
				.then(() => storageTester.getUIntAddressMapping(key))
				.then(asserts.equal(value))
		})

		it('should store uint => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')
			await storageTester.setUIntUIntMapping(key, value)
			asserts.equal(value)(await storageTester.getUIntUIntMapping(key))
		})

		it('should store uint => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = true
			await storageTester.setUIntBoolMapping(key, value)
			asserts.equal(value)(await storageTester.getUIntBoolMapping(key))
		})

		it('should store uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setUIntBytes32Mapping(key, value)
			asserts.equal(value)(await storageTester.getUIntBytes32Mapping(key))
		})

		it('should store uint => uint8 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xff')
			await storageTester.setUIntEnumMapping(key, value)
			asserts.equal(value)(await storageTester.getUIntEnumMapping(key))
		})

		it('should store address => bool mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageTester.setAddressBoolMapping(key, value)
			asserts.equal(value)(await storageTester.getAddressBoolMapping(key))
		})

		it('should store address => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setAddressBytes32Mapping(key, value)
			asserts.equal(value)(await storageTester.getAddressBytes32Mapping(key))
		})

		it('should store address => address mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffff00'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageTester.setAddressAddressMapping(key, value)
			asserts.equal(value)(await storageTester.getAddressAddressMapping(key))
		})

		it('should store bytes32 => uint mapping values', async () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setBytes32UIntMapping(key, value)
			asserts.equal(value)(await storageTester.getBytes32UIntMapping(key))
		})

		it('should store bytes32 => address mapping values', async () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageTester.setBytes32AddressMapping(key, value)
			asserts.equal(value)(await storageTester.getBytes32AddressMapping(key))
		})

		it('should store address => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffff00'
			const key1 = '0xffffffffffffffffffffffffffffffffffffff00'
			const value = web3.toBigNumber('0xff')
			await storageTester.setAddressAddressUInt8Mapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressAddressUInt8Mapping(key, key1))
		})

		it('should store address => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setAddressAddressUIntMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressAddressUIntMapping(key, key1))
		})

		it('should store address => uint => uint mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setAddressUIntUIntMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressUIntUIntMapping(key, key1))
		})

		it('should store address => uint => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUInt8Mapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressUIntUInt8Mapping(key, key1))
		})

		it('should store address => bytes32 => bytes32 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setAddressBytes32Bytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressBytes32Bytes32Mapping(key, key1))
		})

		it('should store address => bytes4 => bool mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x12345678'
			const value = true
			await storageTester.setAddressBytes4BoolMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressBytes4BoolMapping(key, key1))
		})

		it('should store address => bytes4 => bytes32 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x12345678'
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setAddressBytes4Bytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageTester.getAddressBytes4Bytes32Mapping(key, key1))
		})

		it('should store uint => address => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setUIntAddressUIntMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntAddressUIntMapping(key, key1))
		})

		it('should store uint => address => address mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageTester.setUIntAddressAddressMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntAddressAddressMapping(key, key1))
		})

		it('should store uint => address => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageTester.setUIntAddressBoolMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntAddressBoolMapping(key, key1))
		})

		it('should store uint => uint => address mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageTester.setUIntUIntAddressMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntUIntAddressMapping(key, key1))
		})

		it('should store uint => uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setUIntUIntBytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntUIntBytes32Mapping(key, key1))
		})

		it('should store uint => uint => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setUIntUIntUIntMapping(key, key1, value)
			asserts.equal(value)(await storageTester.getUIntUIntUIntMapping(key, key1))
		})

		it('should store address => uint => uint => uint mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageTester.setAddressUIntUIntUIntMapping(key, key1, key2, value)
			asserts.equal(value)(await storageTester.getAddressUIntUIntUIntMapping(key, key1, key2))
		})

		it('should store address => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntStructAddressUInt8Mapping(key, key1, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageTester.getAddressUIntStructAddressUInt8Mapping(key, key1)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUIntStructAddressUInt8Mapping(key, key1, key2, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageTester.getAddressUIntUIntStructAddressUInt8Mapping(key, key1, key2)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => uint => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageTester.getAddressUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => uint => uint => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key4 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, key4, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageTester.getAddressUIntUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, key4)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntAddressUInt8Mapping(key, key1, key2, value)
			asserts.equal(value)(await storageTester.getAddressUIntAddressUInt8Mapping(key, key1, key2))
		})

		it('should store address => uint => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUIntAddressUInt8Mapping(key, key1, key2, key3, value)
			asserts.equal(value)(await storageTester.getAddressUIntUIntAddressUInt8Mapping(key, key1, key2, key3))
		})

		it('should store address => uint => uint => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key4 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageTester.setAddressUIntUIntUIntAddressUInt8Mapping(key, key1, key2, key3, key4, value)
			asserts.equal(value)(await storageTester.getAddressUIntUIntUIntAddressUInt8Mapping(key, key1, key2, key3, key4))
		})

		it('should store uint => address => address => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const key2 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageTester.setUIntAddressAddressBoolMapping(key, key1, key2, value)
			asserts.equal(value)(await storageTester.getUIntAddressAddressBoolMapping(key, key1, key2))
		})

		it('should store uint => uint => uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageTester.setUIntUIntUIntBytes32Mapping(key, key1, key2, value)
			asserts.equal(value)(await storageTester.getUIntUIntUIntBytes32Mapping(key, key1, key2))
		})
	})

	context("collections", () => {

		it('should store bytes32 set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addSet(value)
			assert.isTrue(await storageTester.includesSet(value))
			assert.isFalse(await storageTester.includesSet(value2))
			assert.equal((await storageTester.countSet()).toNumber(), 1)
			{
				const collection = await storageTester.getSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addSet(value2)
			assert.isTrue(await storageTester.includesSet(value))
			assert.isTrue(await storageTester.includesSet(value2))
			assert.equal((await storageTester.countSet()).toNumber(), 2)
			{
				const collection = await storageTester.getSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal((await storageTester.indexOfSet(value2)).toNumber(), 2)
			await storageTester.removeSet(value)
			assert.isFalse(await storageTester.includesSet(value))
			assert.isTrue(await storageTester.includesSet(value2))
			assert.equal((await storageTester.countSet()).toNumber(), 1)
			{
				const collection = await storageTester.getSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageTester.indexOfSet(value2)).toNumber(), 1)
			await storageTester.removeSet(value2)
			assert.isFalse(await storageTester.includesSet(value))
			assert.isFalse(await storageTester.includesSet(value2))
			assert.equal((await storageTester.countSet()).toNumber(), 0)
			{
				const collection = await storageTester.getSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store counter set values', async () => {
			const value = web3.toBigNumber("1")
			const value2 = web3.toBigNumber("2")

			await storageTester.addCounterSet()
			assert.isTrue(await storageTester.includesCounterSet(value))
			assert.isFalse(await storageTester.includesCounterSet(value2))
			assert.equal((await storageTester.countCounterSet()).toNumber(), 1)
			{
				const collection = await storageTester.getCounterSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageTester.addCounterSet()
			assert.isTrue(await storageTester.includesCounterSet(value))
			assert.isTrue(await storageTester.includesCounterSet(value2))
			assert.equal((await storageTester.countCounterSet()).toNumber(), 2)
			{
				const collection = await storageTester.getCounterSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			assert.equal((await storageTester.indexOfCounterSet(value2)).toNumber(), 2)
			await storageTester.removeCounterSet(value)
			assert.isFalse(await storageTester.includesCounterSet(value))
			assert.isTrue(await storageTester.includesCounterSet(value2))
			assert.equal((await storageTester.countCounterSet()).toNumber(), 1)
			{
				const collection = await storageTester.getCounterSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			assert.equal((await storageTester.indexOfCounterSet(value2)).toNumber(), 1)
			await storageTester.removeCounterSet(value2)
			assert.isFalse(await storageTester.includesCounterSet(value))
			assert.isFalse(await storageTester.includesCounterSet(value2))
			assert.equal((await storageTester.countCounterSet()).toNumber(), 0)
			{
				const collection = await storageTester.getCounterSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store addresses set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addAddressesSet(value)
			assert.isTrue(await storageTester.includesAddressesSet(value))
			assert.isFalse(await storageTester.includesAddressesSet(value2))
			assert.equal((await storageTester.countAddressesSet()).toNumber(), 1)
			{
				const collection = await storageTester.getAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addAddressesSet(value2)
			assert.isTrue(await storageTester.includesAddressesSet(value))
			assert.isTrue(await storageTester.includesAddressesSet(value2))
			assert.equal((await storageTester.countAddressesSet()).toNumber(), 2)
			{
				const collection = await storageTester.getAddressesSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal((await storageTester.indexOfAddressesSet(value2)).toNumber(), 2)
			await storageTester.removeAddressesSet(value)
			assert.isFalse(await storageTester.includesAddressesSet(value))
			assert.isTrue(await storageTester.includesAddressesSet(value2))
			assert.equal((await storageTester.countAddressesSet()).toNumber(), 1)
			{
				const collection = await storageTester.getAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageTester.indexOfAddressesSet(value2)).toNumber(), 1)
			await storageTester.removeAddressesSet(value2)
			assert.isFalse(await storageTester.includesAddressesSet(value))
			assert.isFalse(await storageTester.includesAddressesSet(value2))
			assert.equal((await storageTester.countAddressesSet()).toNumber(), 0)
			{
				const collection = await storageTester.getAddressesSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered bytes32 set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addOrderedSet(value)
			assert.isTrue(await storageTester.includesOrderedSet(value))
			assert.isFalse(await storageTester.includesOrderedSet(value2))
			assert.equal((await storageTester.countOrderedSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addOrderedSet(value2)
			assert.isTrue(await storageTester.includesOrderedSet(value))
			assert.isTrue(await storageTester.includesOrderedSet(value2))
			assert.equal((await storageTester.countOrderedSet()).toNumber(), 2)
			{
				const collection = await storageTester.getOrderedSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}
			{
				const collection = await storageTester.getOrderedSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value2)
				assert.equal(collection[1], 0)
			}

			await storageTester.removeOrderedSet(value)
			assert.isFalse(await storageTester.includesOrderedSet(value))
			assert.isTrue(await storageTester.includesOrderedSet(value2))
			assert.equal((await storageTester.countOrderedSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageTester.removeOrderedSet(value2)
			assert.isFalse(await storageTester.includesOrderedSet(value))
			assert.isFalse(await storageTester.includesOrderedSet(value2))
			assert.equal((await storageTester.countOrderedSet()).toNumber(), 0)
			{
				const collection = await storageTester.getOrderedSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered uint set values', async () => {
			const value = web3.toBigNumber("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
			const value2 = web3.toBigNumber("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00")

			await storageTester.addOrderedUIntSet(value)
			assert.isTrue(await storageTester.includesOrderedUIntSet(value))
			assert.isFalse(await storageTester.includesOrderedUIntSet(value2))
			assert.equal((await storageTester.countOrderedUIntSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedUIntSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageTester.addOrderedUIntSet(value2)
			assert.isTrue(await storageTester.includesOrderedUIntSet(value))
			assert.isTrue(await storageTester.includesOrderedUIntSet(value2))
			assert.equal((await storageTester.countOrderedUIntSet()).toNumber(), 2)
			{
				const collection = await storageTester.getOrderedUIntSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}
			{
				const collection = await storageTester.getOrderedUIntSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value2.toString(16))
				assert.equal(collection[1], 0)
			}

			await storageTester.removeOrderedUIntSet(value)
			assert.isFalse(await storageTester.includesOrderedUIntSet(value))
			assert.isTrue(await storageTester.includesOrderedUIntSet(value2))
			assert.equal((await storageTester.countOrderedUIntSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedUIntSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			await storageTester.removeOrderedUIntSet(value2)
			assert.isFalse(await storageTester.includesOrderedUIntSet(value))
			assert.isFalse(await storageTester.includesOrderedUIntSet(value2))
			assert.equal((await storageTester.countOrderedUIntSet()).toNumber(), 0)
			{
				const collection = await storageTester.getOrderedUIntSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered addresses set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addOrderedAddressesSet(value)
			assert.isTrue(await storageTester.includesOrderedAddressesSet(value))
			assert.isFalse(await storageTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageTester.countOrderedAddressesSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addOrderedAddressesSet(value2)
			assert.isTrue(await storageTester.includesOrderedAddressesSet(value))
			assert.isTrue(await storageTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageTester.countOrderedAddressesSet()).toNumber(), 2)
			{
				const collection = await storageTester.getOrderedAddressesSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}
			{
				const collection = await storageTester.getOrderedAddressesSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value2)
				assert.equal(collection[1], 0)
			}

			await storageTester.removeOrderedAddressesSet(value)
			assert.isFalse(await storageTester.includesOrderedAddressesSet(value))
			assert.isTrue(await storageTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageTester.countOrderedAddressesSet()).toNumber(), 1)
			{
				const collection = await storageTester.getOrderedAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageTester.removeOrderedAddressesSet(value2)
			assert.isFalse(await storageTester.includesOrderedAddressesSet(value))
			assert.isFalse(await storageTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageTester.countOrderedAddressesSet()).toNumber(), 0)
			{
				const collection = await storageTester.getOrderedAddressesSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store bytes32 set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addBytes32SetMapping(key1, value)
			assert.isTrue(await storageTester.includesBytes32SetMapping(key1, value))
			assert.isFalse(await storageTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32SetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addBytes32SetMapping(key1, value2)
			assert.isTrue(await storageTester.includesBytes32SetMapping(key1, value))
			assert.isTrue(await storageTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32SetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal((await storageTester.indexOfBytes32SetMapping(key1, value2)).toNumber(), 2)
			await storageTester.removeBytes32SetMapping(key1, value)
			assert.isFalse(await storageTester.includesBytes32SetMapping(key1, value))
			assert.isTrue(await storageTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32SetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageTester.indexOfBytes32SetMapping(key1, value2)).toNumber(), 1)
			await storageTester.removeBytes32SetMapping(key1, value2)
			assert.isFalse(await storageTester.includesBytes32SetMapping(key1, value))
			assert.isFalse(await storageTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32SetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store addresses set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addAddressesSetMapping(key1, value)
			assert.isTrue(await storageTester.includesAddressesSetMapping(key1, value))
			assert.isFalse(await storageTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressesSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addAddressesSetMapping(key1, value2)
			assert.isTrue(await storageTester.includesAddressesSetMapping(key1, value))
			assert.isTrue(await storageTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressesSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal((await storageTester.indexOfAddressesSetMapping(key1, value2)).toNumber(), 2)
			await storageTester.removeAddressesSetMapping(key1, value)
			assert.isFalse(await storageTester.includesAddressesSetMapping(key1, value))
			assert.isTrue(await storageTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressesSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageTester.indexOfAddressesSetMapping(key1, value2)).toNumber(), 1)
			await storageTester.removeAddressesSetMapping(key1, value2)
			assert.isFalse(await storageTester.includesAddressesSetMapping(key1, value))
			assert.isFalse(await storageTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressesSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store uint set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')

			await storageTester.addUIntSetMapping(key1, value)
			assert.isTrue(await storageTester.includesUIntSetMapping(key1, value))
			assert.isFalse(await storageTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageTester.addUIntSetMapping(key1, value2)
			assert.isTrue(await storageTester.includesUIntSetMapping(key1, value))
			assert.isTrue(await storageTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			assert.equal((await storageTester.indexOfUIntSetMapping(key1, value2)).toNumber(), 2)
			await storageTester.removeUIntSetMapping(key1, value)
			assert.isFalse(await storageTester.includesUIntSetMapping(key1, value))
			assert.isTrue(await storageTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			assert.equal((await storageTester.indexOfUIntSetMapping(key1, value2)).toNumber(), 1)
			await storageTester.removeUIntSetMapping(key1, value2)
			assert.isFalse(await storageTester.includesUIntSetMapping(key1, value))
			assert.isFalse(await storageTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store bytes32 ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addBytes32OrderedSetMapping(key1, value)
			assert.isTrue(await storageTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32OrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addBytes32OrderedSetMapping(key1, value2)
			assert.isTrue(await storageTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32OrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			await storageTester.removeBytes32OrderedSetMapping(key1, value)
			assert.isFalse(await storageTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32OrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageTester.removeBytes32OrderedSetMapping(key1, value2)
			assert.isFalse(await storageTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countBytes32OrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store address ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageTester.addAddressOrderedSetMapping(key1, value)
			assert.isTrue(await storageTester.includesAddressOrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageTester.addAddressOrderedSetMapping(key1, value2)
			assert.isTrue(await storageTester.includesAddressOrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressOrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			await storageTester.removeAddressOrderedSetMapping(key1, value)
			assert.isFalse(await storageTester.includesAddressOrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageTester.removeAddressOrderedSetMapping(key1, value2)
			assert.isFalse(await storageTester.includesAddressOrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countAddressOrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store uint ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')

			await storageTester.addUIntOrderedSetMapping(key1, value)
			assert.isTrue(await storageTester.includesUIntOrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageTester.addUIntOrderedSetMapping(key1, value2)
			assert.isTrue(await storageTester.includesUIntOrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntOrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			await storageTester.removeUIntOrderedSetMapping(key1, value)
			assert.isFalse(await storageTester.includesUIntOrderedSetMapping(key1, value))
			assert.isTrue(await storageTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			await storageTester.removeUIntOrderedSetMapping(key1, value2)
			assert.isFalse(await storageTester.includesUIntOrderedSetMapping(key1, value))
			assert.isFalse(await storageTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageTester.countUIntOrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

	})

	it('should not allow repeated variables initialization', async () => {
		await asserts.throws(storageTester.reinitPlain())
		// await asserts.throws(storageTester.reinitMapping())
		await asserts.throws(storageTester.reinitMappingComplex())
		await asserts.throws(storageTester.reinitCollections())
	})
})
