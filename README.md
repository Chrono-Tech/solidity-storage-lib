# Storage smart contracts library [![Build Status](https://travis-ci.org/ChronoBank/solidity-storage-lib.svg?branch=master)](https://travis-ci.org/ChronoBank/solidity-storage-lib) [![Coverage Status](https://coveralls.io/repos/github/ChronoBank/solidity-storage-lib/badge.svg?branch=master)](https://coveralls.io/github/ChronoBank/solidity-storage-lib?branch=master)

Part of [LaborX project](https://github.com/ChronoBank). Provides a set of smart contracts to organize data storage in a centralized manner, providing an advanced approach for contract upgradability. More you information you can find in a [blog post](https://blog.colony.io/writing-upgradeable-contracts-in-solidity-6743f0eecc88).

- **StorageInterface** - defines a set of compex types and operations that a user could perform on them;
- **Storage** - smart contract that plays role of centralized bank of information; access to "write" functions is restricted;
- **StorageManager** - organizes access to a storage by separating different scopes (crates) for different roles;
- **StorageAdapter** - basic contract that is intended to store a reference to a storage and link with __StorageInterface__ library.

## Installation

Organized as npm package this smart contracts could be easily added to a project by

```bash
npm install -s solidity-storage-lib
```

## Usage

Right before you decided to use them add this library to package dependencies and import any contract according to this pattern, for example:

```javascript
import "solidity-shared-lib/contracts/StorageAdapter.sol";
```

or

```javascript
import "solidity-shared-lib/contracts/StorageManager.sol";
```

Cause you might want to use **StorageManager** without any changes (if you want to then skip this paragraph), you will need to deploy this contract. But due to imperfection of **truffle** framework when you write in migration files `const StorageManager = artifacts.require("StorageManager")` this artifact will not be found. You have two options:
1. Inherit from _StorageManager_ and **truffle** will automatically grap contract's artifact;
2. Create a solidity file, for example, **Imports.sol** and add an `import` statement of _StorageManager_. (I would recommend this one because it will not produce one more contract name and looks more reasonable.)

## Details

Contracts that wants to adopt storage approach should do the following:

1. Define a contract that will inherit from **StorageAdapter** contract. Add any number of internal types (from **StorageInterface**) to define your own data layout:

```javascript
contract Exchange is StorageAdapter {	

	StorageInterface.Bytes32UIntMapping internal bidsStorage;
	StorageInterface.Address internal oracleStorage;
	StorageInterface.AddressesSet internal ownersStorage;
	//...
}
```

2. Defined variables from **StorageInterface** should be initialized to have their unique location. **NOT DEFINING initial values MIGHT BREAK YOUR DATA**. So remember to initialize your variables, for example, in constructor or in a separate method but before first usage of those variables:

```javascript
constructor() public {
	//...
	bidsStorage.init("bids");
	oracleStorage.init("oracle");
	ownersStorage.init("owners");
	//...
}
```

3. Throughout a contract you can easily access to get/set/update data from/to those variables using _store_ reference:

```javascript
//...
function actionExample(address _newOracle) external returns (bool) {
	//...
	address _oracle = store.get(oracleStorage);
	address _owner = store.get(ownersStorage, 2); // get by index
	uint _userBid = store.get(bidsStorage, "myBid");
	
	//...

	require(_newOracle != 0x0);
	store.set(oracleStorage, _newOracle);
	store.add(ownersStorage, msg.sender);
	//... 
}
//...
```

## Migrations

Migration templates are presented in `./migrations_templates` folder so you can use them as a scaffolding for your own configuration. Basic scenarios covered by migration templates are:

- deploying _Storage_ contract;
- deploying and initializing _StorageManager_ contract;
- deploying user's smart contract which is inherited from _StorageAdapter_ contract.

---

For more information and use cases look at tests.