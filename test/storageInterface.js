"use strict"

const FakeAccessManager = artifacts.require('FakeAccessManager')
const Storage = artifacts.require('Storage')
const StoragePlainTester = artifacts.require('StoragePlainTester')
const StorageMappingTester = artifacts.require('StorageMappingTester')
const StorageCollectionsTester = artifacts.require('StorageCollectionsTester')

const Asserts = require('./helpers/asserts')
const Reverter = require('./helpers/reverter')


contract('StorageInterface', accounts => {
	const reverter = new Reverter(web3)

	const asserts = Asserts(assert)
	let storage
	let storageManager
	let storagePlainTester
	let storageMappingTester
	let storageCollectionsTester

	const zero = {
		bytes32: "0x0000000000000000000000000000000000000000000000000000000000000000",
		address: "0x0000000000000000000000000000000000000000",
	}


	before('setup', async () => {
		storage = await Storage.deployed()
		storageManager = await FakeAccessManager.deployed()

		await reverter.snapshot()
	})

	context("plain values", () => {

		before(async () => {
			const crate = "_testPlain"
			storagePlainTester = await StoragePlainTester.new(storage.address, crate)
			await storagePlainTester.reinitPlain()
			await storageManager.updateAllowed(storagePlainTester.address, crate, true)
			await reverter.snapshot()
		})

		afterEach('revert', reverter.revert)

		it('should store uint8 values', () => {
			const value = web3.toBigNumber("0xff")
			return storagePlainTester.setUInt8(value)
				.then(() => storagePlainTester.getUInt8())
				.then(asserts.equal(value))
		})

		it('should store uint8 values with key', () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber("0xff")
			return storagePlainTester.setUInt8WithKey(key, value)
				.then(() => storagePlainTester.getUInt8WithKey(key))
				.then(asserts.equal(value))
		})

		it('should store uint values', () => {
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			return storagePlainTester.setUInt(value)
				.then(() => storagePlainTester.getUInt())
				.then(asserts.equal(value))
		})

		it('should store address values', () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			return storagePlainTester.setAddress(value)
				.then(() => storagePlainTester.getAddress())
				.then(asserts.equal(value))
		})

		it('should store address values with key', () => {
			const key = "0xeee"
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			return storagePlainTester.setAddressWithKey(key, value)
				.then(() => storagePlainTester.getAddressWithKey(key))
				.then(asserts.equal(value))
		})

		it('should store bool values', () => {
			const value = true
			return storagePlainTester.setBool(value)
				.then(() => storagePlainTester.getBool())
				.then(asserts.equal(value))
		})

		it('should store int values', () => {
			const value = web3.toBigNumber(2).pow(255).sub(1).mul(-1)
			return storagePlainTester.setInt(value)
				.then(() => storagePlainTester.getInt())
				.then(asserts.equal(value))
		})

		it('should store int values with key', () => {
			const key = "0xeee"
			const value = web3.toBigNumber(2).pow(255).sub(1).mul(-1)
			return storagePlainTester.setIntWithKey(key, value)
				.then(() => storagePlainTester.getIntWithKey(key))
				.then(asserts.equal(value))
		})

		it('should store bytes32 values', () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storagePlainTester.setBytes32(value)
				.then(() => storagePlainTester.getBytes32())
				.then(asserts.equal(value))
		})

		it('should not allow repeated variables initialization', async () => {
			await asserts.throws(storagePlainTester.reinitPlain())
		})
	})

	context("mappings", () => {

		before(async () => {
			const crate = "_testMappings"
			storageMappingTester = await StorageMappingTester.new(storage.address, crate)
			await storageMappingTester.reinitMapping()
			await storageMappingTester.reinitMappingComplex()
			await storageManager.updateAllowed(storageMappingTester.address, crate, true)
			await reverter.snapshot()
		})

		it('should store direct bytes32 => bytes32 mapping values', () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageMappingTester.setMapping(key, value)
				.then(() => storageMappingTester.getMapping(key))
				.then(asserts.equal(value))
		})

		it('should store direct uint => uint mapping values', () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000')
			return storageMappingTester.setMappingWithUIntKey(key, value)
				.then(() => storageMappingTester.getMappingWithUIntKey(key))
				.then(asserts.equal(value))
		})

		it('should store address => uint mapping values', () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			return storageMappingTester.setAddressUIntMapping(key, value)
				.then(() => storageMappingTester.getAddressUIntMapping(key))
				.then(asserts.equal(value))
		})

		it('should store uint => address mapping values', () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			return storageMappingTester.setUIntAddressMapping(key, value)
				.then(() => storageMappingTester.getUIntAddressMapping(key))
				.then(asserts.equal(value))
		})

		it('should store uint => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')
			await storageMappingTester.setUIntUIntMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getUIntUIntMapping(key))
		})

		it('should store uint => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = true
			await storageMappingTester.setUIntBoolMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getUIntBoolMapping(key))
		})

		it('should store uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setUIntBytes32Mapping(key, value)
			asserts.equal(value)(await storageMappingTester.getUIntBytes32Mapping(key))
		})

		it('should store uint => uint8 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setUIntEnumMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getUIntEnumMapping(key))
		})

		it('should store address => bool mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageMappingTester.setAddressBoolMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getAddressBoolMapping(key))
		})

		it('should store address => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setAddressBytes32Mapping(key, value)
			asserts.equal(value)(await storageMappingTester.getAddressBytes32Mapping(key))
		})

		it('should store address => address mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffff00'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageMappingTester.setAddressAddressMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getAddressAddressMapping(key))
		})

		it('should store bytes32 => uint mapping values', async () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setBytes32UIntMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getBytes32UIntMapping(key))
		})

		it('should store bytes32 => address mapping values', async () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageMappingTester.setBytes32AddressMapping(key, value)
			asserts.equal(value)(await storageMappingTester.getBytes32AddressMapping(key))
		})

		it('should store bytes32 => bytes32 mapping values', async () => {
			const key = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setBytes32Bytes32Mapping(key, value)
			asserts.equal(value)(await storageMappingTester.getBytes32Bytes32Mapping(key))
		})

		it('should store address => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffff00'
			const key1 = '0xffffffffffffffffffffffffffffffffffffff00'
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressAddressUInt8Mapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressAddressUInt8Mapping(key, key1))
		})

		it('should store address => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setAddressAddressUIntMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressAddressUIntMapping(key, key1))
		})

		it('should store address => uint => uint mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setAddressUIntUIntMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntUIntMapping(key, key1))
		})

		it('should store address => uint => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntUInt8Mapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntUInt8Mapping(key, key1))
		})

		it('should store address => bytes32 => bytes32 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setAddressBytes32Bytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressBytes32Bytes32Mapping(key, key1))
		})

		it('should store address => bytes4 => bool mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x12345678'
			const value = true
			await storageMappingTester.setAddressBytes4BoolMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressBytes4BoolMapping(key, key1))
		})

		it('should store address => bytes4 => bytes32 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = '0x12345678'
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setAddressBytes4Bytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getAddressBytes4Bytes32Mapping(key, key1))
		})

		it('should store uint => address => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setUIntAddressUIntMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntAddressUIntMapping(key, key1))
		})

		it('should store uint => address => address mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageMappingTester.setUIntAddressAddressMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntAddressAddressMapping(key, key1))
		})

		it('should store uint => address => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageMappingTester.setUIntAddressBoolMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntAddressBoolMapping(key, key1))
		})

		it('should store uint => uint => address mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			await storageMappingTester.setUIntUIntAddressMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntUIntAddressMapping(key, key1))
		})

		it('should store uint => uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setUIntUIntBytes32Mapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntUIntBytes32Mapping(key, key1))
		})

		it('should store uint => uint => uint mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setUIntUIntUIntMapping(key, key1, value)
			asserts.equal(value)(await storageMappingTester.getUIntUIntUIntMapping(key, key1))
		})

		it('should store address => uint => uint => uint mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			await storageMappingTester.setAddressUIntUIntUIntMapping(key, key1, key2, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntUIntUIntMapping(key, key1, key2))
		})

		it('should store address => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntStructAddressUInt8Mapping(key, key1, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageMappingTester.getAddressUIntStructAddressUInt8Mapping(key, key1)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => uint => struct(address, uint8) mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value1 = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntUIntStructAddressUInt8Mapping(key, key1, key2, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageMappingTester.getAddressUIntUIntStructAddressUInt8Mapping(key, key1, key2)
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
			await storageMappingTester.setAddressUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageMappingTester.getAddressUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3)
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
			await storageMappingTester.setAddressUIntUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, key4, value, value1)
			const [ expectedValue, expectedValue1, ] = await storageMappingTester.getAddressUIntUIntUIntUIntStructAddressUInt8Mapping(key, key1, key2, key3, key4)
			asserts.equal(value)(expectedValue)
			asserts.equal(value1)(expectedValue1)
		})

		it('should store address => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntAddressUInt8Mapping(key, key1, key2, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntAddressUInt8Mapping(key, key1, key2))
		})

		it('should store address => uint => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntUIntAddressUInt8Mapping(key, key1, key2, key3, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntUIntAddressUInt8Mapping(key, key1, key2, key3))
		})

		it('should store address => uint => uint => uint => address => uint8 mapping values', async () => {
			const key = '0xffffffffffffffffffffffffffffffffffffffff'
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key3 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key4 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = web3.toBigNumber('0xff')
			await storageMappingTester.setAddressUIntUIntUIntAddressUInt8Mapping(key, key1, key2, key3, key4, value)
			asserts.equal(value)(await storageMappingTester.getAddressUIntUIntUIntAddressUInt8Mapping(key, key1, key2, key3, key4))
		})

		it('should store uint => address => address => bool mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const key2 = '0xffffffffffffffffffffffffffffffffffffffff'
			const value = true
			await storageMappingTester.setUIntAddressAddressBoolMapping(key, key1, key2, value)
			asserts.equal(value)(await storageMappingTester.getUIntAddressAddressBoolMapping(key, key1, key2))
		})

		it('should store uint => uint => uint => bytes32 mapping values', async () => {
			const key = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key1 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const key2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
			await storageMappingTester.setUIntUIntUIntBytes32Mapping(key, key1, key2, value)
			asserts.equal(value)(await storageMappingTester.getUIntUIntUIntBytes32Mapping(key, key1, key2))
		})

		it('should not allow repeated variables initialization', async () => {
			await asserts.throws(storageMappingTester.reinitMapping())
			await asserts.throws(storageMappingTester.reinitMappingComplex())
		})
	})

	context("collections", () => {

		before(async () => {
			const crate = "_testCollections"
			storageCollectionsTester = await StorageCollectionsTester.new(storage.address, crate)
			await storageCollectionsTester.reinitCollections()
			await storageManager.updateAllowed(storageCollectionsTester.address, crate, true)
			await reverter.snapshot()
		})

		it('should store bytes32 set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'
			const value3 = '0xaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaa'
			const value4 = '0xbbffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbb'

			await storageCollectionsTester.addSet(value)
			assert.isTrue(await storageCollectionsTester.includesSet(value))
			assert.isFalse(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addSet(value2)
			assert.isTrue(await storageCollectionsTester.includesSet(value))
			assert.isTrue(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			{
				// await storageCollectionsTester.addSet("0x0").then(assert.fail, () => true)
				const count = await storageCollectionsTester.countSet()
				assert.isTrue(await storageCollectionsTester.includesSet(value))
				await storageCollectionsTester.addSet(value)
				assert.equal(
					(await storageCollectionsTester.countSet()).toNumber(),
					count.toNumber()
				)
			}

			assert.equal(await storageCollectionsTester.getFromSetAtIndex(0), value)
			assert.equal(await storageCollectionsTester.getFromSetAtIndex(1), value2)

			await storageCollectionsTester.replaceSetWithValue(value2, value3)
			assert.isTrue(await storageCollectionsTester.includesSet(value))
			assert.isTrue(await storageCollectionsTester.includesSet(value3))
			assert.isFalse(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value3)
			}

			assert.isFalse(await storageCollectionsTester.includesSet(value4))
			await storageCollectionsTester.replaceSetWithValue(value4, value2)
			assert.isTrue(await storageCollectionsTester.includesSet(value))
			assert.isTrue(await storageCollectionsTester.includesSet(value3))
			assert.isFalse(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value3)
			}

			await storageCollectionsTester.replaceSetWithValue(value3, value2)
			assert.equal((await storageCollectionsTester.indexOfSet(value2)).toNumber(), 2)
			await storageCollectionsTester.removeSet(value)
			assert.isFalse(await storageCollectionsTester.includesSet(value))
			assert.isTrue(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.isFalse(await storageCollectionsTester.includesSet(value4))
			await storageCollectionsTester.removeSet(value4).then(() => true, assert.fail)
			assert.isFalse(await storageCollectionsTester.includesSet(value4))

			assert.equal((await storageCollectionsTester.indexOfSet(value2)).toNumber(), 1)
			await storageCollectionsTester.removeSet(value2)
			assert.isFalse(await storageCollectionsTester.includesSet(value))
			assert.isFalse(await storageCollectionsTester.includesSet(value2))
			assert.equal((await storageCollectionsTester.countSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store counter set values', async () => {
			const value = web3.toBigNumber("1")
			const value2 = web3.toBigNumber("2")

			await storageCollectionsTester.addCounterSet()
			assert.isTrue(await storageCollectionsTester.includesCounterSet(value))
			assert.isFalse(await storageCollectionsTester.includesCounterSet(value2))
			assert.equal((await storageCollectionsTester.countCounterSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getCounterSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageCollectionsTester.addCounterSet()
			assert.isTrue(await storageCollectionsTester.includesCounterSet(value))
			assert.isTrue(await storageCollectionsTester.includesCounterSet(value2))
			assert.equal((await storageCollectionsTester.countCounterSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getCounterSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			assert.equal((await storageCollectionsTester.getFromCounterSetAtIndex(0)).toString(16), value.toString(16))
			assert.equal((await storageCollectionsTester.getFromCounterSetAtIndex(1)).toString(16), value2.toString(16))

			assert.equal((await storageCollectionsTester.indexOfCounterSet(value2)).toNumber(), 2)
			await storageCollectionsTester.removeCounterSet(value)
			assert.isFalse(await storageCollectionsTester.includesCounterSet(value))
			assert.isTrue(await storageCollectionsTester.includesCounterSet(value2))
			assert.equal((await storageCollectionsTester.countCounterSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getCounterSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			assert.equal((await storageCollectionsTester.indexOfCounterSet(value2)).toNumber(), 1)
			await storageCollectionsTester.removeCounterSet(value2)
			assert.isFalse(await storageCollectionsTester.includesCounterSet(value))
			assert.isFalse(await storageCollectionsTester.includesCounterSet(value2))
			assert.equal((await storageCollectionsTester.countCounterSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getCounterSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store addresses set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'
			const value3 = '0xaaffffffffffffffffffffffffffffffffffffaa'

			await storageCollectionsTester.addAddressesSet(value)
			assert.isTrue(await storageCollectionsTester.includesAddressesSet(value))
			assert.isFalse(await storageCollectionsTester.includesAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countAddressesSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addAddressesSet(value2)
			assert.isTrue(await storageCollectionsTester.includesAddressesSet(value))
			assert.isTrue(await storageCollectionsTester.includesAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countAddressesSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getAddressesSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal(await storageCollectionsTester.getFromAddressesSetAtIndex(0), value)
			assert.equal(await storageCollectionsTester.getFromAddressesSetAtIndex(1), value2)

			{
				assert.isFalse(await storageCollectionsTester.includesAddressesSet(value3))
				await storageCollectionsTester.replaceAddressesSetWithValue(value2, value3)
				assert.isTrue(await storageCollectionsTester.includesAddressesSet(value3))
				assert.isFalse(await storageCollectionsTester.includesAddressesSet(value2))
				assert.equal(await storageCollectionsTester.getFromAddressesSetAtIndex(1), value3)
				// return it back to previous state
				await storageCollectionsTester.replaceAddressesSetWithValue(value3, value2)
			}

			assert.equal((await storageCollectionsTester.indexOfAddressesSet(value2)).toNumber(), 2)
			await storageCollectionsTester.removeAddressesSet(value)
			assert.isFalse(await storageCollectionsTester.includesAddressesSet(value))
			assert.isTrue(await storageCollectionsTester.includesAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countAddressesSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageCollectionsTester.indexOfAddressesSet(value2)).toNumber(), 1)
			await storageCollectionsTester.removeAddressesSet(value2)
			assert.isFalse(await storageCollectionsTester.includesAddressesSet(value))
			assert.isFalse(await storageCollectionsTester.includesAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countAddressesSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getAddressesSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered bytes32 set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'
			const value3 = '0xaaffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffee'

			await storageCollectionsTester.addOrderedSet(value)
			assert.isTrue(await storageCollectionsTester.includesOrderedSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addOrderedSet(value2)
			assert.isTrue(await storageCollectionsTester.includesOrderedSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getOrderedSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}
			{
				const collection = await storageCollectionsTester.getOrderedSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value2)
				assert.equal(collection[1], 0)
			}

			await storageCollectionsTester.getOrderedSetWithRevert().then(assert.fail, () => true)

			assert.equal((await storageCollectionsTester.getPreviousOrderedSet(value)).toString(16), zero.bytes32)
			assert.equal((await storageCollectionsTester.getNextOrderedSet(value)).toString(16), value2.toString(16))
			assert.equal((await storageCollectionsTester.getNextOrderedSet(value2)).toString(16), zero.bytes32)
			assert.equal((await storageCollectionsTester.getPreviousOrderedSet(value2)).toString(16), value.toString(16))

			{
				const count = await storageCollectionsTester.countOrderedSet()
				assert.isTrue(await storageCollectionsTester.includesOrderedSet(value))
				await storageCollectionsTester.addOrderedSet(value)
				assert.equal(
					(await storageCollectionsTester.countOrderedSet()).toNumber(),
					count.toNumber()
				)
			}

			await storageCollectionsTester.addOrderedSet("0x0").then(assert.fail, () => true)

			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value3))
			await storageCollectionsTester.removeOrderedSet(value3)
			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value3))

			await storageCollectionsTester.removeOrderedSet(value)
			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageCollectionsTester.removeOrderedSet(value2)
			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getOrderedSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered uint set values', async () => {
			const value = web3.toBigNumber("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
			const value2 = web3.toBigNumber("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00")

			await storageCollectionsTester.addOrderedUIntSet(value)
			assert.isTrue(await storageCollectionsTester.includesOrderedUIntSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedUIntSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedUIntSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedUIntSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageCollectionsTester.addOrderedUIntSet(value2)
			assert.isTrue(await storageCollectionsTester.includesOrderedUIntSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedUIntSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedUIntSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getOrderedUIntSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}
			{
				const collection = await storageCollectionsTester.getOrderedUIntSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value2.toString(16))
				assert.equal(collection[1], 0)
			}

			assert.equal((await storageCollectionsTester.getPreviousOrderedUIntSet(value)).toString(16), '0')
			assert.equal((await storageCollectionsTester.getNextOrderedUIntSet(value)).toString(16), value2.toString(16))
			assert.equal((await storageCollectionsTester.getNextOrderedUIntSet(value2)).toString(16), '0')
			assert.equal((await storageCollectionsTester.getPreviousOrderedUIntSet(value2)).toString(16), value.toString(16))

			await storageCollectionsTester.removeOrderedUIntSet(value)
			assert.isFalse(await storageCollectionsTester.includesOrderedUIntSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedUIntSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedUIntSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedUIntSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			await storageCollectionsTester.removeOrderedUIntSet(value2)
			assert.isFalse(await storageCollectionsTester.includesOrderedUIntSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedUIntSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedUIntSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getOrderedUIntSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store ordered addresses set values', async () => {
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageCollectionsTester.addOrderedAddressesSet(value)
			assert.isTrue(await storageCollectionsTester.includesOrderedAddressesSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedAddressesSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addOrderedAddressesSet(value2)
			assert.isTrue(await storageCollectionsTester.includesOrderedAddressesSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedAddressesSet()).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getOrderedAddressesSet()
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}
			{
				const collection = await storageCollectionsTester.getOrderedAddressesSetFrom(value2, 2)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value2)
				assert.equal(collection[1], 0)
			}

			assert.equal((await storageCollectionsTester.getPreviousOrderedAddressesSet(value)).toString(16), zero.address)
			assert.equal((await storageCollectionsTester.getNextOrderedAddressesSet(value)).toString(16), value2.toString(16))
			assert.equal((await storageCollectionsTester.getNextOrderedAddressesSet(value2)).toString(16), zero.address)
			assert.equal((await storageCollectionsTester.getPreviousOrderedAddressesSet(value2)).toString(16), value.toString(16))

			await storageCollectionsTester.removeOrderedAddressesSet(value)
			assert.isFalse(await storageCollectionsTester.includesOrderedAddressesSet(value))
			assert.isTrue(await storageCollectionsTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedAddressesSet()).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getOrderedAddressesSet()
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageCollectionsTester.removeOrderedAddressesSet(value2)
			assert.isFalse(await storageCollectionsTester.includesOrderedAddressesSet(value))
			assert.isFalse(await storageCollectionsTester.includesOrderedAddressesSet(value2))
			assert.equal((await storageCollectionsTester.countOrderedAddressesSet()).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getOrderedAddressesSet()
				assert.equal(collection.length, 0)
			}
		})

		it('should store bytes32 set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageCollectionsTester.addBytes32SetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesBytes32SetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32SetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addBytes32SetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesBytes32SetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32SetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal(await storageCollectionsTester.getFromBytes32SetMappingAtIndex(key1, 0), value)
			assert.equal(await storageCollectionsTester.getFromBytes32SetMappingAtIndex(key1, 1), value2)

			assert.equal((await storageCollectionsTester.indexOfBytes32SetMapping(key1, value2)).toNumber(), 2)
			await storageCollectionsTester.removeBytes32SetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesBytes32SetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32SetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageCollectionsTester.indexOfBytes32SetMapping(key1, value2)).toNumber(), 1)
			await storageCollectionsTester.removeBytes32SetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesBytes32SetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesBytes32SetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32SetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getBytes32SetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store addresses set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageCollectionsTester.addAddressesSetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesAddressesSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressesSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addAddressesSetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesAddressesSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressesSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			assert.equal(await storageCollectionsTester.getFromAddressesSetMappingAtIndex(key1, 0), value)
			assert.equal(await storageCollectionsTester.getFromAddressesSetMappingAtIndex(key1, 1), value2)

			assert.equal((await storageCollectionsTester.indexOfAddressesSetMapping(key1, value2)).toNumber(), 2)
			await storageCollectionsTester.removeAddressesSetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesAddressesSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressesSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			assert.equal((await storageCollectionsTester.indexOfAddressesSetMapping(key1, value2)).toNumber(), 1)
			await storageCollectionsTester.removeAddressesSetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesAddressesSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesAddressesSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressesSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getAddressesSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store uint set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')

			await storageCollectionsTester.addUIntSetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesUIntSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageCollectionsTester.addUIntSetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesUIntSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			assert.equal((await storageCollectionsTester.getFromUIntSetMappingAtIndex(key1, 0)).toString(16), value.toString(16))
			assert.equal((await storageCollectionsTester.getFromUIntSetMappingAtIndex(key1, 1)).toString(16), value2.toString(16))

			assert.equal((await storageCollectionsTester.indexOfUIntSetMapping(key1, value2)).toNumber(), 2)
			await storageCollectionsTester.removeUIntSetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesUIntSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			assert.equal((await storageCollectionsTester.indexOfUIntSetMapping(key1, value2)).toNumber(), 1)
			await storageCollectionsTester.removeUIntSetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesUIntSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesUIntSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getUIntSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store bytes32 ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00'

			await storageCollectionsTester.addBytes32OrderedSetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32OrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addBytes32OrderedSetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32OrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			await storageCollectionsTester.removeBytes32OrderedSetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32OrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageCollectionsTester.removeBytes32OrderedSetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesBytes32OrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countBytes32OrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getBytes32OrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store address ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = '0xffffffffffffffffffffffffffffffffffffffff'
			const value2 = '0xffffffffffffffffffffffffffffffffffffff00'

			await storageCollectionsTester.addAddressOrderedSetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value)
			}

			await storageCollectionsTester.addAddressOrderedSetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressOrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0], value)
				assert.equal(collection[1], value2)
			}

			await storageCollectionsTester.removeAddressOrderedSetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0], value2)
			}

			await storageCollectionsTester.removeAddressOrderedSetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesAddressOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countAddressOrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getAddressOrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should store uint ordered set mapping values', async () => {
			const key1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaa'
			const value = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
			const value2 = web3.toBigNumber('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00')

			await storageCollectionsTester.addUIntOrderedSetMapping(key1, value)
			assert.isTrue(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value.toString(16))
			}

			await storageCollectionsTester.addUIntOrderedSetMapping(key1, value2)
			assert.isTrue(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntOrderedSetMapping(key1)).toNumber(), 2)
			{
				const collection = await storageCollectionsTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 2)
				assert.equal(collection[0].toString(16), value.toString(16))
				assert.equal(collection[1].toString(16), value2.toString(16))
			}

			await storageCollectionsTester.removeUIntOrderedSetMapping(key1, value)
			assert.isFalse(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value))
			assert.isTrue(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntOrderedSetMapping(key1)).toNumber(), 1)
			{
				const collection = await storageCollectionsTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 1)
				assert.equal(collection[0].toString(16), value2.toString(16))
			}

			await storageCollectionsTester.removeUIntOrderedSetMapping(key1, value2)
			assert.isFalse(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value))
			assert.isFalse(await storageCollectionsTester.includesUIntOrderedSetMapping(key1, value2))
			assert.equal((await storageCollectionsTester.countUIntOrderedSetMapping(key1)).toNumber(), 0)
			{
				const collection = await storageCollectionsTester.getUIntOrderedSetMapping(key1)
				assert.equal(collection.length, 0)
			}
		})

		it('should not allow repeated variables initialization', async () => {
			await asserts.throws(storageCollectionsTester.reinitCollections())
		})
	})
})
