"use strict"

const StorageManagerStub = artifacts.require('StorageManagerStub')

const Reverter = require('./helpers/reverter')

contract('StorageManager', accounts => {
	const reverter = new Reverter(web3)
	let storageManager
	let multiEventsHistory

	const users = {
		contractOwner: accounts[0],
		user1: accounts[1],
	}

	before('setup', () => {
		return StorageManagerStub.deployed()
			.then(instance => storageManager = instance)
			.then(() => multiEventsHistory = storageManager)
			.then(reverter.snapshot)
	})

	context("initial", () => {
		afterEach('revert', reverter.revert)

		it('should have valid events history', () => {
			return storageManager.getEventsHistory.call()
				.then(_eventsHistory => assert.equal(_eventsHistory, multiEventsHistory.address))
		})

		it('should NOT allow to setup events history by non-owner') // TODO

		it('should allow owner to setup events history') // TODO
	})


	context("allowance", () => {
		afterEach('revert', reverter.revert)

		it('should not be accessible when empty', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.isAllowed(address, role)
				.then(result => assert.isFalse(result))
		})

		it('should emit AccessGiven event after access is given', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.giveAccess(address, role)
				.then(result => {
					assert.equal(result.logs.length, 1)
					assert.equal(result.logs[0].address, multiEventsHistory.address)
					assert.equal(result.logs[0].event, 'AccessGiven')
					assert.equal(result.logs[0].args.actor, address)
					assert.equal(result.logs[0].args.role, role)
				})
		})

		it('should emit AccessBlocked event after access is blocked', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return Promise.resolve()
				.then(() => storageManager.giveAccess(address, role))
				.then(() => storageManager.blockAccess(address, role))
				.then(result => {
					assert.equal(result.logs.length, 1)
					assert.equal(result.logs[0].address, multiEventsHistory.address)
					assert.equal(result.logs[0].event, 'AccessBlocked')
					assert.equal(result.logs[0].args.actor, address)
					assert.equal(result.logs[0].args.role, role)
				})
		})

		it('should be accessible', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.giveAccess(address, role)
				.then(() => storageManager.isAllowed(address, role))
				.then(result => assert.isTrue(result))
		})

		it('should not be accessible', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.blockAccess(address, role)
				.then(() => storageManager.isAllowed(address, role))
				.then(result => assert.isFalse(result))
		})

		it('should block allowed access', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.giveAccess(address, role)
				.then(() => storageManager.blockAccess(address, role))
				.then(() => storageManager.isAllowed(address, role))
				.then(result => assert.isFalse(result))
		})

		it('should correctly track changes for different addresses', () => {
			const address1 = '0xffffffffffffffffffffffffffffffffffffffff'
			const address2 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
			const address3 = '0xdddddddddddddddddddddddddddddddddddddddd'
			const role = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			return storageManager.giveAccess(address1, role)
				.then(() => storageManager.giveAccess(address2, role))
				.then(() => storageManager.blockAccess(address2, role))
				.then(() => storageManager.giveAccess(address3, role))
				.then(() => storageManager.isAllowed(address1, role))
				.then(result => assert.isTrue(result))
				.then(() => storageManager.isAllowed(address2, role))
				.then(result => assert.isFalse(result))
				.then(() => storageManager.isAllowed(address3, role))
				.then(result => assert.isTrue(result))
		})

		it('should correctly track changes for different roles', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const role2 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
			const role3 = '0xdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
			return storageManager.giveAccess(address, role1)
				.then(() => storageManager.giveAccess(address, role2))
				.then(() => storageManager.blockAccess(address, role2))
				.then(() => storageManager.giveAccess(address, role3))
				.then(() => storageManager.isAllowed(address, role1))
				.then(result => assert.isTrue(result))
				.then(() => storageManager.isAllowed(address, role2))
				.then(result => assert.isFalse(result))
				.then(() => storageManager.isAllowed(address, role3))
				.then(result => assert.isTrue(result))
		})

		it('should NOT allow access for unset roles', () => {
			const address = '0xffffffffffffffffffffffffffffffffffffffff'
			const role1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			const role2 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
			return storageManager.giveAccess(address, role1)
				.then(() => storageManager.isAllowed(address, role1))
				.then(result => assert.isTrue(result))
				.then(() => storageManager.isAllowed(address, role2))
				.then(result => assert.isFalse(result))
		})

		it('should NOT allow to give an access by non-owner') // TODO

		it('should NOT allow to block an access by non-owner') // TODO

		it('should allow owner to give an access') // TODO

		it('should allow owner to block an access') // TODO
	})

	context("accessibility", () => {
		const user = users.user1
		const role1 = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
		const role2 = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'

		after(reverter.revert)

		it("should NOT have initial authorized roles", async () => {
			assert.equal(
				(await storageManager.authorised.call(user)).toNumber(),
				0
			)
		})

		it("should NOT have access", async () => {
			assert.equal(
				(await storageManager.authorised.call(user)).toNumber(),
				0
			)
		})

		it("should be able to give access to the single actor to different roles", async () => {
			await storageManager.giveAccess(user, role1, { from: users.contractOwner, })
			await storageManager.giveAccess(user, role2, { from: users.contractOwner, })

			assert.equal(
				(await storageManager.authorised.call(user)).toNumber(),
				2
			)
		})

		it("should sign that the actor have access", async () => {
			assert.isTrue(await storageManager.hasAccess.call(user))
		})

		it("should be able to block role1 access for the actor but still has access", async () => {
			await storageManager.blockAccess(user, role2, { from: users.contractOwner, })
			assert.equal(
				(await storageManager.authorised.call(user)).toNumber(),
				1
			)
			assert.isTrue(await storageManager.hasAccess.call(user))
		})

		it("should NOT have access after last role was block for the actor", async () => {
			await storageManager.blockAccess(user, role1, { from: users.contractOwner, })
			assert.equal(
				(await storageManager.authorised.call(user)).toNumber(),
				0
			)
			assert.isFalse(await storageManager.hasAccess.call(user))
		})

		it("should have access to itself (StorageManager to itself)", async () => {
			assert.isTrue(await storageManager.hasAccess.call(storageManager.address))
		})
	})

})
