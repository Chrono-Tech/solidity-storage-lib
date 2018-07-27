/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

pragma solidity ^0.4.23;


import "../StorageAdapter.sol";


contract StorageCollectionsTester is StorageAdapter {

    StorageInterface.Set setVar;
    StorageInterface.AddressesSet addressesSetVar;
    StorageInterface.CounterSet counterSetVar;
    StorageInterface.OrderedSet orderedSetVar;
    StorageInterface.OrderedUIntSet orderedUIntSetVar;
    StorageInterface.OrderedAddressesSet orderedAddressesSetVar;

    StorageInterface.Set set2Var;
    StorageInterface.AddressesSet addressesSet2Var;
    StorageInterface.CounterSet counterSet2Var;

    StorageInterface.Bytes32SetMapping bytes32SetMappingVar;
    StorageInterface.AddressesSetMapping addressesSetMappingVar;
    StorageInterface.UIntSetMapping uIntSetMappingVar;
    StorageInterface.Bytes32OrderedSetMapping bytes32OrderedSetMappingVar;
    StorageInterface.AddressOrderedSetMapping addressOrderedSetMappingVar;
    StorageInterface.UIntOrderedSetMapping uIntOrderedSetMappingVar;

    constructor(Storage _store, bytes32 _crate) StorageAdapter(_store, _crate) public {
    }

    function reinitCollections() public {
        setVar.init("sv");
        addressesSetVar.init("asv");
        counterSetVar.init("csv");
        orderedSetVar.init("osv");
        orderedUIntSetVar.init("ousv");
        orderedAddressesSetVar.init("oasv");

        set2Var.init("set2Var");
        addressesSet2Var.init("as2v");
        counterSet2Var.init("cs2v");

        bytes32SetMappingVar.init("bsmv");
        addressesSetMappingVar.init("asmv");
        uIntSetMappingVar.init("usmv");
        bytes32OrderedSetMappingVar.init("bosmv");
        addressOrderedSetMappingVar.init("aosmv");
        uIntOrderedSetMappingVar.init("uosmv");
    }

    /* Collections */ 
    
    /* Set */

    function addSet(bytes32 _value) external {
        store.add(setVar, _value);
    }

    function removeSet(bytes32 _value) external {
        store.remove(setVar, _value);
    }

    function replaceSetWithValue(bytes32 _old, bytes32 _new) external {
        store.set(setVar, _old, _new);
    }

    function includesSet(bytes32 _value) external view returns (bool) {
        return store.includes(setVar, _value);
    }

    function indexOfSet(bytes32 _value) public view returns (uint) {
        return store.getIndex(setVar, _value);
    }

    function getFromSetAtIndex(uint _idx) public view returns (bytes32) {
        return store.get(setVar, _idx);
    }

    function countSet() public view returns (uint) {
        return store.count(setVar);
    }

    function getSet() public view returns (bytes32[]) {
        return store.get(setVar);
    }

    /* set 2 */

    function addSet2(bytes32 _value) external {
        store.add(set2Var, _value);
    }

    function removeSet2(bytes32 _value) external {
        store.remove(set2Var, _value);
    }

    function includesSet2(bytes32 _value) external view returns (bool) {
        return store.includes(set2Var, _value);
    }

    function countSet2() public view returns (uint) {
        return store.count(set2Var);
    }

    function getSet2() public view returns (bytes32[]) {
        return store.get(set2Var);
    }

    function copySet1ToSet2() public {
        store.copy(setVar, set2Var);
    }

    /* Addresses Set */

    function addAddressesSet(address _value) external {
        store.add(addressesSetVar, _value);
    }

    function removeAddressesSet(address _value) external {
        store.remove(addressesSetVar, _value);
    }

    function replaceAddressesSetWithValue(address _old, address _new) public {
        store.set(addressesSetVar, _old, _new);
    }

    function includesAddressesSet(address _value) external view returns (bool) {
        return store.includes(addressesSetVar, _value);
    }

    function indexOfAddressesSet(address _value) public view returns (uint) {
        return store.getIndex(addressesSetVar, _value);
    }

    function getFromAddressesSetAtIndex(uint _idx) public view returns (address) {
        return store.get(addressesSetVar, _idx);
    }

    function countAddressesSet() public view returns (uint) {
        return store.count(addressesSetVar);
    }

    function getAddressesSet() public view returns (address[]) {
        return store.get(addressesSetVar);
    }

    /* Addresses Set 2 */

    function addAddressesSet2(address _value) external {
        store.add(addressesSet2Var, _value);
    }

    function removeAddressesSet2(address _value) external {
        store.remove(addressesSet2Var, _value);
    }

    function includesAddressesSet2(address _value) external view returns (bool) {
        return store.includes(addressesSet2Var, _value);
    }

    function countAddressesSet2() public view returns (uint) {
        return store.count(addressesSet2Var);
    }

    function getAddressesSet2() public view returns (address[]) {
        return store.get(addressesSet2Var);
    }

    function copyAddressesSet1ToAddressesSet2() public {
        store.copy(addressesSetVar, addressesSet2Var);
    }

    /* Counter Set */

    function addCounterSet() external {
        store.add(counterSetVar);
    }

    function removeCounterSet(uint _value) external {
        store.remove(counterSetVar, _value);
    }

    function includesCounterSet(uint _value) external view returns (bool) {
        return store.includes(counterSetVar, _value);
    }

    function indexOfCounterSet(uint _value) public view returns (uint) {
        return store.getIndex(counterSetVar, _value);
    }

    function getFromCounterSetAtIndex(uint _idx) public view returns (uint) {
        return store.get(counterSetVar, _idx);
    }

    function countCounterSet() public view returns (uint) {
        return store.count(counterSetVar);
    }

    function getCounterSet() public view returns (uint[]) {
        return store.get(counterSetVar);
    }

    /* Counter Set 2 */

    function addCounterSet2() external {
        store.add(counterSet2Var);
    }

    function removeCounterSet2(uint _value) external {
        store.remove(counterSet2Var, _value);
    }

    function includesCounterSet2(uint _value) external view returns (bool) {
        return store.includes(counterSet2Var, _value);
    }

    function countCounterSet2() public view returns (uint) {
        return store.count(counterSet2Var);
    }

    function getCounterSet2() public view returns (uint[]) {
        return store.get(counterSet2Var);
    }

    function copyCounterSet1ToCounterSet2() public {
        store.copy(counterSetVar, counterSet2Var);
    }

    /* Ordered Set */

    function addOrderedSet(bytes32 _value) external {
        store.add(orderedSetVar, _value);
    }

    function removeOrderedSet(bytes32 _value) external {
        store.remove(orderedSetVar, _value);
    }

    function includesOrderedSet(bytes32 _value) external view returns (bool) {
        return store.includes(orderedSetVar, _value);
    }

    function countOrderedSet() public view returns (uint) {
        return store.count(orderedSetVar);
    }

    function getOrderedSet() public view returns (bytes32[] _items) {
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedSetVar);
        _items = new bytes32[](StorageInterface.count(_iterator));
        for (uint _idx = 0; store.canGetNextWithIterator(orderedSetVar, _iterator);) {
            bytes32 _item = store.getNextWithIterator(orderedSetVar, _iterator);
            _items[_idx++] = _item;
        }
    }

    function getOrderedSetFrom(bytes32 _startValue, uint _length) public view returns (bytes32[] _items) {
        _items = new bytes32[](_length);
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedSetVar, "ordered_set", _startValue, _length);
        for (uint _idx = 0; store.canGetNextWithIterator(orderedSetVar, _iterator); ++_idx) {
            bytes32 _item = store.getNextWithIterator(orderedSetVar, _iterator);
            _items[_idx] = _item;
        }
    }

    function getNextOrderedSet(bytes32 _value) public view returns (bytes32) {
        return store.getNextValue(orderedSetVar, _value);
    }

    function getPreviousOrderedSet(bytes32 _value) public view returns (bytes32) {
        return store.getPreviousValue(orderedSetVar, _value);
    }

    function getOrderedSetWithRevert() public view returns (bytes32[] _items) {
        _items = new bytes32[](countOrderedSet() + 1);
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedSetVar);
        uint _idx = 0;
        while (true) {
            bytes32 _item = store.getNextWithIterator(orderedSetVar, _iterator);
            _items[_idx++] = _item;
        }
    }

    /* Ordered UInt Set */

    function addOrderedUIntSet(uint _value) external {
        store.add(orderedUIntSetVar, _value);
    }

    function removeOrderedUIntSet(uint _value) external {
        store.remove(orderedUIntSetVar, _value);
    }

    function includesOrderedUIntSet(uint _value) external view returns (bool) {
        return store.includes(orderedUIntSetVar, _value);
    }

    function countOrderedUIntSet() public view returns (uint) {
        return store.count(orderedUIntSetVar);
    }

    function getOrderedUIntSet() public view returns (uint[] _items) {
        _items = new uint[](countOrderedUIntSet());
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedUIntSetVar);
        for (uint _idx = 0; store.canGetNextWithIterator(orderedUIntSetVar, _iterator); ++_idx) {
            uint _item = store.getNextWithIterator(orderedUIntSetVar, _iterator);
            _items[_idx] = _item;
        }
    }

    function getOrderedUIntSetFrom(uint _startValue, uint _length) public view returns (uint[] _items) {
        _items = new uint[](_length);
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedUIntSetVar, "ordered_set", _startValue, _length);
        for (uint _idx = 0; store.canGetNextWithIterator(orderedUIntSetVar, _iterator); ++_idx) {
            uint _item = store.getNextWithIterator(orderedUIntSetVar, _iterator);
            _items[_idx] = _item;
        }
    }

    function getNextOrderedUIntSet(uint _value) public view returns (uint) {
        return store.getNextValue(orderedUIntSetVar, _value);
    }

    function getPreviousOrderedUIntSet(uint _value) public view returns (uint) {
        return store.getPreviousValue(orderedUIntSetVar, _value);
    }


    /* Ordered Addresses Set */

    function addOrderedAddressesSet(address _value) external {
        store.add(orderedAddressesSetVar, _value);
    }

    function removeOrderedAddressesSet(address _value) external {
        store.remove(orderedAddressesSetVar, _value);
    }

    function includesOrderedAddressesSet(address _value) external view returns (bool) {
        return store.includes(orderedAddressesSetVar, _value);
    }

    function countOrderedAddressesSet() public view returns (uint) {
        return store.count(orderedAddressesSetVar);
    }

    function getOrderedAddressesSet() public view returns (address[] _items) {
        _items = new address[](countOrderedAddressesSet());
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedAddressesSetVar);
        for (uint _idx = 0; store.canGetNextWithIterator(orderedAddressesSetVar, _iterator); ++_idx) {
            address _item = store.getNextWithIterator(orderedAddressesSetVar, _iterator);
            _items[_idx] = _item;
        }
    }

    function getOrderedAddressesSetFrom(address _startValue, uint _length) public view returns (address[] _items) {
        _items = new address[](_length);
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedAddressesSetVar, "ordered_set", _startValue, _length);
        for (uint _idx = 0; store.canGetNextWithIterator(orderedAddressesSetVar, _iterator); ++_idx) {
            address _item = store.getNextWithIterator(orderedAddressesSetVar, _iterator);
            _items[_idx] = _item;
        }
    }

    function getNextOrderedAddressesSet(address _value) public view returns (address) {
        return store.getNextValue(orderedAddressesSetVar, _value);
    }

    function getPreviousOrderedAddressesSet(address _value) public view returns (address) {
        return store.getPreviousValue(orderedAddressesSetVar, _value);
    }

    /* Bytes32 Set Mapping */

    function addBytes32SetMapping(bytes32 _key, bytes32 _value) external {
        store.add(bytes32SetMappingVar, _key, _value);
    }

    function removeBytes32SetMapping(bytes32 _key, bytes32 _value) external {
        store.remove(bytes32SetMappingVar, _key, _value);
    }

    function includesBytes32SetMapping(bytes32 _key, bytes32 _value) external view returns (bool) {
        return store.includes(bytes32SetMappingVar, _key, _value);
    }

    function indexOfBytes32SetMapping(bytes32 _key, bytes32 _value) public view returns (uint) {
        return store.getIndex(bytes32SetMappingVar, _key, _value);
    }

    function getFromBytes32SetMappingAtIndex(bytes32 _key, uint _idx) public view returns (bytes32) {
        return store.get(bytes32SetMappingVar, _key, _idx);
    }

    function countBytes32SetMapping(bytes32 _key) public view returns (uint) {
        return store.count(bytes32SetMappingVar, _key);
    }

    function getBytes32SetMapping(bytes32 _key) public view returns (bytes32[]) {
        return store.get(bytes32SetMappingVar, _key);
    }

    /* Addresses Set Mapping */

    function addAddressesSetMapping(bytes32 _key, address _value) external {
        store.add(addressesSetMappingVar, _key, _value);
    }

    function removeAddressesSetMapping(bytes32 _key, address _value) external {
        store.remove(addressesSetMappingVar, _key, _value);
    }

    function includesAddressesSetMapping(bytes32 _key, address _value) external view returns (bool) {
        return store.includes(addressesSetMappingVar, _key, _value);
    }

    function indexOfAddressesSetMapping(bytes32 _key, address _value) public view returns (uint) {
        return store.getIndex(addressesSetMappingVar, _key, _value);
    }

    function getFromAddressesSetMappingAtIndex(bytes32 _key, uint _idx) public view returns (address) {
        return store.get(addressesSetMappingVar, _key, _idx);
    }

    function countAddressesSetMapping(bytes32 _key) public view returns (uint) {
        return store.count(addressesSetMappingVar, _key);
    }

    function getAddressesSetMapping(bytes32 _key) public view returns (address[]) {
        return store.get(addressesSetMappingVar, _key);
    }

    /* UInt Set Mapping */

    function addUIntSetMapping(bytes32 _key, uint _value) external {
        store.add(uIntSetMappingVar, _key, _value);
    }

    function removeUIntSetMapping(bytes32 _key, uint _value) external {
        store.remove(uIntSetMappingVar, _key, _value);
    }

    function includesUIntSetMapping(bytes32 _key, uint _value) external view returns (bool) {
        return store.includes(uIntSetMappingVar, _key, _value);
    }

    function indexOfUIntSetMapping(bytes32 _key, uint _value) public view returns (uint) {
        return store.getIndex(uIntSetMappingVar, _key, _value);
    }

    function getFromUIntSetMappingAtIndex(bytes32 _key, uint _idx) public view returns (uint) {
        return store.get(uIntSetMappingVar, _key, _idx);
    }

    function countUIntSetMapping(bytes32 _key) public view returns (uint) {
        return store.count(uIntSetMappingVar, _key);
    }

    function getUIntSetMapping(bytes32 _key) public view returns (uint[]) {
        return store.get(uIntSetMappingVar, _key);
    }

    /* Ordered Bytes32 Set Mapping */

    function addBytes32OrderedSetMapping(bytes32 _key, bytes32 _value) external {
        store.add(bytes32OrderedSetMappingVar, _key, _value);
    }

    function removeBytes32OrderedSetMapping(bytes32 _key, bytes32 _value) external {
        store.remove(bytes32OrderedSetMappingVar, _key, _value);
    }

    function includesBytes32OrderedSetMapping(bytes32 _key, bytes32 _value) external view returns (bool) {
        return store.includes(bytes32OrderedSetMappingVar, _key, _value);
    }

    function countBytes32OrderedSetMapping(bytes32 _key) public view returns (uint) {
        return store.count(bytes32OrderedSetMappingVar, _key);
    }

    function getBytes32OrderedSetMapping(bytes32 _key) public view returns (bytes32[] _items) {
        _items = new bytes32[](countBytes32OrderedSetMapping(_key));
        StorageInterface.Iterator memory _iterator = store.listIterator(bytes32OrderedSetMappingVar, _key);
        for (uint _idx = 0; store.canGetNextWithIterator(bytes32OrderedSetMappingVar, _iterator); ++_idx) {
            bytes32 _item = store.getNextWithIterator(bytes32OrderedSetMappingVar, _iterator);
            _items[_idx] = _item;
        }
    }

    /* Ordered Addresses Set Mapping */

    function addAddressOrderedSetMapping(bytes32 _key, address _value) external {
        store.add(addressOrderedSetMappingVar, _key, _value);
    }

    function removeAddressOrderedSetMapping(bytes32 _key, address _value) external {
        store.remove(addressOrderedSetMappingVar, _key, _value);
    }

    function includesAddressOrderedSetMapping(bytes32 _key, address _value) external view returns (bool) {
        return store.includes(addressOrderedSetMappingVar, _key, _value);
    }

    function countAddressOrderedSetMapping(bytes32 _key) public view returns (uint) {
        return store.count(addressOrderedSetMappingVar, _key);
    }

    function getAddressOrderedSetMapping(bytes32 _key) public view returns (address[] _items) {
        _items = new address[](countAddressOrderedSetMapping(_key));
        StorageInterface.Iterator memory _iterator = store.listIterator(addressOrderedSetMappingVar, _key);
        for (uint _idx = 0; store.canGetNextWithIterator(addressOrderedSetMappingVar, _iterator); ++_idx) {
            address _item = store.getNextWithIterator(addressOrderedSetMappingVar, _iterator);
            _items[_idx] = _item;
        }
    }

    /* Ordered UInt Set Mapping */

    function addUIntOrderedSetMapping(bytes32 _key, uint _value) external {
        store.add(uIntOrderedSetMappingVar, _key, _value);
    }

    function removeUIntOrderedSetMapping(bytes32 _key, uint _value) external {
        store.remove(uIntOrderedSetMappingVar, _key, _value);
    }

    function includesUIntOrderedSetMapping(bytes32 _key, uint _value) external view returns (bool) {
        return store.includes(uIntOrderedSetMappingVar, _key, _value);
    }

    function countUIntOrderedSetMapping(bytes32 _key) public view returns (uint) {
        return store.count(uIntOrderedSetMappingVar, _key);
    }

    function getUIntOrderedSetMapping(bytes32 _key) public view returns (uint[] _items) {
        _items = new uint[](countUIntOrderedSetMapping(_key));
        StorageInterface.Iterator memory _iterator = store.listIterator(uIntOrderedSetMappingVar, _key);
        for (uint _idx = 0; store.canGetNextWithIterator(uIntOrderedSetMappingVar, _iterator); ++_idx) {
            uint _item = store.getNextWithIterator(uIntOrderedSetMappingVar, _iterator);
            _items[_idx] = _item;
        }
    }
}
