/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

pragma solidity ^0.4.23;


import "../StorageAdapter.sol";


contract StorageTester is StorageAdapter {

    StorageInterface.UInt uintVar;
    StorageInterface.UInt8 uint8Var;
    StorageInterface.Int intVar;
    StorageInterface.Address addressVar;
    StorageInterface.Bool boolVar;
    StorageInterface.Bytes32 bytes32Var;
    StorageInterface.Mapping mappingVar;
    StorageInterface.UIntBoolMapping uIntBoolMappingVar;
    StorageInterface.UIntUIntMapping uIntUIntMappingVar;
    StorageInterface.UIntBytes32Mapping uIntBytes32MappingVar;
    StorageInterface.UIntAddressMapping uIntAddressMappingVar;
    StorageInterface.UIntEnumMapping uIntEnumMappingVar;
    StorageInterface.AddressBoolMapping addressBoolMappingVar;
    StorageInterface.AddressUIntMapping addressUIntMappingVar;
    StorageInterface.AddressBytes32Mapping addressBytes32MappingVar;
    StorageInterface.AddressAddressMapping addressAddressMappingVar;
    StorageInterface.Bytes32UIntMapping bytes32UIntMappingVar;
    StorageInterface.Bytes32Bytes32Mapping bytes32Bytes32MappingVar;
    StorageInterface.Bytes32AddressMapping bytes32AddressMappingVar;
    StorageInterface.AddressAddressUInt8Mapping addressAddressUInt8MappingVar;
    StorageInterface.AddressAddressUIntMapping addressAddressUIntMappingVar;
    StorageInterface.AddressUIntUIntMapping addressUIntUIntMappingVar;
    StorageInterface.AddressUIntUInt8Mapping addressUIntUInt8MappingVar;
    StorageInterface.AddressBytes32Bytes32Mapping addressBytes32Bytes32MappingVar;
    StorageInterface.AddressBytes4BoolMapping addressBytes4BoolMappingVar;
    StorageInterface.AddressBytes4Bytes32Mapping addressBytes4Bytes32MappingVar;
    StorageInterface.UIntAddressUIntMapping uIntAddressUIntMappingVar;
    StorageInterface.UIntAddressAddressMapping uIntAddressAddressMappingVar;
    StorageInterface.UIntAddressBoolMapping uIntAddressBoolMappingVar;
    StorageInterface.UIntUIntAddressMapping uIntUIntAddressMappingVar;
    StorageInterface.UIntUIntBytes32Mapping uIntUIntBytes32MappingVar;
    StorageInterface.UIntUIntUIntMapping uIntUIntUIntMappingVar;
    StorageInterface.AddressUIntUIntUIntMapping addressUIntUIntUIntMappingVar;
    StorageInterface.AddressUIntStructAddressUInt8Mapping addressUIntStructAddressUInt8MappingVar;
    StorageInterface.AddressUIntUIntStructAddressUInt8Mapping addressUIntUIntStructAddressUInt8MappingVar;
    StorageInterface.AddressUIntUIntUIntStructAddressUInt8Mapping addressUIntUIntUIntStructAddressUInt8MappingVar;
    StorageInterface.AddressUIntUIntUIntUIntStructAddressUInt8Mapping addressUIntUIntUIntUIntStructAddressUInt8MappingVar;
    StorageInterface.AddressUIntAddressUInt8Mapping addressUIntAddressUInt8MappingVar;
    StorageInterface.AddressUIntUIntAddressUInt8Mapping addressUIntUIntAddressUInt8MappingVar;
    StorageInterface.AddressUIntUIntUIntAddressUInt8Mapping addressUIntUIntUIntAddressUInt8MappingVar;
    StorageInterface.UIntAddressAddressBoolMapping uIntAddressAddressBoolMappingVar;
    StorageInterface.UIntUIntUIntBytes32Mapping uIntUIntUIntBytes32MappingVar;
    
    StorageInterface.Set setVar;
    StorageInterface.AddressesSet addressesSetVar;
    StorageInterface.CounterSet counterSetVar;
    StorageInterface.OrderedSet orderedSetVar;
    StorageInterface.OrderedUIntSet orderedUIntSetVar;
    StorageInterface.OrderedAddressesSet orderedAddressesSetVar;

    StorageInterface.Bytes32SetMapping bytes32SetMappingVar;
    StorageInterface.AddressesSetMapping addressesSetMappingVar;
    StorageInterface.UIntSetMapping uIntSetMappingVar;
    StorageInterface.Bytes32OrderedSetMapping bytes32OrderedSetMappingVar;
    StorageInterface.AddressOrderedSetMapping addressOrderedSetMappingVar;
    StorageInterface.UIntOrderedSetMapping uIntOrderedSetMappingVar;

    constructor(Storage _store, bytes32 _crate) StorageAdapter(_store, _crate) public {
        // reinit();
    }

    function reinitPlain() public {
        uintVar.init("uintVar");
        intVar.init("intVar");
        addressVar.init("addressVar");
        boolVar.init("boolVar");
        bytes32Var.init("bytes32Var");
        mappingVar.init("mappingVar");
    }

    // function reinitMapping() public {
    //     uIntBoolMappingVar.init("uIntBoolMappingVar");
    //     uIntUIntMappingVar.init("uIntUIntMappingVar");
    //     uIntBytes32MappingVar.init("uIntBytes32MappingVar");
    //     uIntAddressMappingVar.init("uIntAddressMappingVar");
    //     uIntEnumMappingVar.init("uIntEnumMappingVar");
    //     addressBoolMappingVar.init("addressBoolMappingVar");
    //     addressUIntMappingVar.init("addressUIntMappingVar");
    //     addressBytes32MappingVar.init("addressBytes32MappingVar");
    //     addressAddressMappingVar.init("addressAddressMappingVar");
    //     bytes32UIntMappingVar.init("bytes32UIntMappingVar");
    //     bytes32Bytes32MappingVar.init("bytes32Bytes32MappingVar");
    //     bytes32AddressMappingVar.init("bytes32AddressMappingVar");
    //     addressAddressUInt8MappingVar.init("aaui8mv");
    //     addressAddressUIntMappingVar.init("aaumv");
    //     addressUIntUIntMappingVar.init("auum");
    //     addressUIntUInt8MappingVar.init("auu8m");
    //     addressBytes32Bytes32MappingVar.init("abbm");
    //     addressBytes4BoolMappingVar.init("ab4vm");
    //     addressBytes4Bytes32MappingVar.init("ab4bm");
    //     uIntAddressUIntMappingVar.init("uaum");
    //     uIntAddressAddressMappingVar.init("uaam");
    //     uIntAddressBoolMappingVar.init("uabm");
    //     uIntUIntAddressMappingVar.init("uuam");
    //     uIntUIntBytes32MappingVar.init("uubm");
    //     uIntUIntUIntMappingVar.init("uuum");
    //     addressUIntUIntUIntMappingVar.init("auuum");
    // }

    function reinitMappingComplex() public {
        addressUIntStructAddressUInt8MappingVar.init("ausau8m");
        addressUIntUIntStructAddressUInt8MappingVar.init("auusau8m");
        addressUIntUIntUIntStructAddressUInt8MappingVar.init("auuusau8m");
        addressUIntUIntUIntUIntStructAddressUInt8MappingVar.init("auuuusau8m");
        addressUIntAddressUInt8MappingVar.init("auau8m");
        addressUIntUIntAddressUInt8MappingVar.init("auuaumm");
        addressUIntUIntUIntAddressUInt8MappingVar.init("auuuau8m");
        uIntAddressAddressBoolMappingVar.init("uaabm");
        uIntUIntUIntBytes32MappingVar.init("uuubm");
    }

    function reinitCollections() public {
        setVar.init("sv");
        addressesSetVar.init("asv");
        counterSetVar.init("csv");
        orderedSetVar.init("osv");
        orderedUIntSetVar.init("ousv");
        orderedAddressesSetVar.init("oasv");

        bytes32SetMappingVar.init("bsmv");
        addressesSetMappingVar.init("asmv");
        uIntSetMappingVar.init("usmv");
        bytes32OrderedSetMappingVar.init("bosmv");
        addressOrderedSetMappingVar.init("aosmv");
        uIntOrderedSetMappingVar.init("uosmv");
    }

    function setUInt(uint _value) external {
        store.set(uintVar, _value);
    }

    function getUInt() public view returns (uint) {
        return store.get(uintVar);
    }

    function setUInt8(uint8 _value) external {
        store.set(uint8Var, _value);
    }

    function getUInt8() public view returns (uint8) {
        return store.get(uint8Var);
    }

    function setInt(int _value) external {
        store.set(intVar, _value);
    }

    function getInt() public view returns (int) {
        return store.get(intVar);
    }

    function setAddress(address _value) external {
        store.set(addressVar, _value);
    }

    function getAddress() public view returns (address) {
        return store.get(addressVar);
    }

    function setBool(bool _value) external {
        store.set(boolVar, _value);
    }

    function getBool() public view returns (bool) {
        return store.get(boolVar);
    }

    function setBytes32(bytes32 _value) external {
        store.set(bytes32Var, _value);
    }

    function getBytes32() public view returns (bytes32) {
        return store.get(bytes32Var);
    }

    function setMapping(bytes32 _key, bytes32 _value) external {
        store.set(mappingVar, _key, _value);
    }

    function getMapping(bytes32 _key) external view returns (bytes32) {
        return store.get(mappingVar, _key);
    }

    function setUIntBoolMapping(uint _key, bool _value) external {
        store.set(uIntBoolMappingVar, _key, _value);
    }

    function getUIntBoolMapping(uint _key) public view returns (bool) {
        return store.get(uIntBoolMappingVar, _key);
    }

    function setUIntUIntMapping(uint _key, uint _value) external {
        store.set(uIntUIntMappingVar, _key, _value);
    }

    function getUIntUIntMapping(uint _key) public view returns (uint) {
        return store.get(uIntUIntMappingVar, _key);
    }
    
    function setUIntBytes32Mapping(uint _key, bytes32 _value) external {
        store.set(uIntBytes32MappingVar, _key, _value);
    }

    function getUIntBytes32Mapping(uint _key) public view returns (bytes32) {
        return store.get(uIntBytes32MappingVar, _key);
    }

    function setUIntAddressMapping(uint _key, address _value) external {
        store.set(uIntAddressMappingVar, _key, _value);
    }

    function getUIntAddressMapping(uint _key) public view returns (address) {
        return store.get(uIntAddressMappingVar, _key);
    }

    function setUIntEnumMapping(uint _key, uint8 _value) external {
        store.set(uIntEnumMappingVar, _key, _value);
    }

    function getUIntEnumMapping(uint _key) public view returns (uint8) {
        return store.get(uIntEnumMappingVar, _key);
    }

    function setAddressBoolMapping(address _key, bool _value) external {
        store.set(addressBoolMappingVar, _key, _value);
    }

    function getAddressBoolMapping(address _key) public view returns (bool) {
        return store.get(addressBoolMappingVar, _key);
    }

    function setAddressUIntMapping(address _key, uint _value) external {
        store.set(addressUIntMappingVar, _key, _value);
    }

    function getAddressUIntMapping(address _key) public view returns (uint) {
        return store.get(addressUIntMappingVar, _key);
    }

    function setAddressBytes32Mapping(address _key, bytes32 _value) external {
        store.set(addressBytes32MappingVar, _key, _value);
    }

    function getAddressBytes32Mapping(address _key) public view returns (bytes32) {
        return store.get(addressBytes32MappingVar, _key);
    }

    function setAddressAddressMapping(address _key, address _value) external {
        store.set(addressAddressMappingVar, _key, _value);
    }

    function getAddressAddressMapping(address _key) public view returns (address) {
        return store.get(addressAddressMappingVar, _key);
    }

    function setBytes32UIntMapping(bytes32 _key, uint _value) external {
        store.set(bytes32UIntMappingVar, _key, _value);
    }

    function getBytes32UIntMapping(bytes32 _key) public view returns (uint) {
        return store.get(bytes32UIntMappingVar, _key);
    }

    function setBytes32Bytes32Mapping(bytes32 _key, bytes32 _value) external {
        store.set(bytes32Bytes32MappingVar, _key, _value);
    }

    function getBytes32Bytes32Mapping(bytes32 _key) public view returns (bytes32) {
        return store.get(bytes32Bytes32MappingVar, _key);
    }

    function setBytes32AddressMapping(bytes32 _key, address _value) external {
        store.set(bytes32AddressMappingVar, _key, _value);
    }

    function getBytes32AddressMapping(bytes32 _key) public view returns (address) {
        return store.get(bytes32AddressMappingVar, _key);
    }
    
    function setAddressAddressUInt8Mapping(address _key, address _key2, uint8 _value) external {
        store.set(addressAddressUInt8MappingVar, _key, _key2, _value);
    }

    function getAddressAddressUInt8Mapping(address _key, address _key2) public view returns (uint8) {
        return store.get(addressAddressUInt8MappingVar, _key, _key2);
    }

    function setAddressAddressUIntMapping(address _key, address _key2, uint _value) external {
        store.set(addressAddressUIntMappingVar, _key, _key2, _value);
    }

    function getAddressAddressUIntMapping(address _key, address _key2) public view returns (uint) {
        return store.get(addressAddressUIntMappingVar, _key, _key2);
    }

    function setAddressUIntUIntMapping(address _key, uint _key2, uint _value) external {
        store.set(addressUIntUIntMappingVar, _key, _key2, _value);
    }

    function getAddressUIntUIntMapping(address _key, uint _key2) public view returns (uint) {
        return store.get(addressUIntUIntMappingVar, _key, _key2);
    }

    function setAddressUIntUInt8Mapping(address _key, uint _key2, uint8 _value) external {
        store.set(addressUIntUInt8MappingVar, _key, _key2, _value);
    }

    function getAddressUIntUInt8Mapping(address _key, uint _key2) public view returns (uint) {
        return store.get(addressUIntUInt8MappingVar, _key, _key2);
    }

    function setAddressBytes32Bytes32Mapping(address _key, bytes32 _key2, bytes32 _value) external {
        store.set(addressBytes32Bytes32MappingVar, _key, _key2, _value);
    }

    function getAddressBytes32Bytes32Mapping(address _key, bytes32 _key2) public view returns (bytes32) {
        return store.get(addressBytes32Bytes32MappingVar, _key, _key2);
    }

    function setAddressBytes4BoolMapping(address _key, bytes4 _key2, bool _value) external {
        store.set(addressBytes4BoolMappingVar, _key, _key2, _value);
    }

    function getAddressBytes4BoolMapping(address _key, bytes4 _key2) public view returns (bool) {
        return store.get(addressBytes4BoolMappingVar, _key, _key2);
    }

    function setAddressBytes4Bytes32Mapping(address _key, bytes4 _key2, bytes32 _value) external {
        store.set(addressBytes4Bytes32MappingVar, _key, _key2, _value);
    }

    function getAddressBytes4Bytes32Mapping(address _key, bytes4 _key2) public view returns (bytes32) {
        return store.get(addressBytes4Bytes32MappingVar, _key, _key2);
    }

    function setUIntAddressUIntMapping(uint _key, address _key2, uint _value) external {
        store.set(uIntAddressUIntMappingVar, _key, _key2, _value);
    }

    function getUIntAddressUIntMapping(uint _key, address _key2) public view returns (uint) {
        return store.get(uIntAddressUIntMappingVar, _key, _key2);
    }

    function setUIntAddressAddressMapping(uint _key, address _key2, address _value) external {
        store.set(uIntAddressAddressMappingVar, _key, _key2, _value);
    }

    function getUIntAddressAddressMapping(uint _key, address _key2) public view returns (address) {
        return store.get(uIntAddressAddressMappingVar, _key, _key2);
    }

    function setUIntAddressBoolMapping(uint _key, address _key2, bool _value) external {
        store.set(uIntAddressBoolMappingVar, _key, _key2, _value);
    }

    function getUIntAddressBoolMapping(uint _key, address _key2) public view returns (bool) {
        return store.get(uIntAddressBoolMappingVar, _key, _key2);
    }

    function setUIntUIntAddressMapping(uint _key, uint _key2, address _value) external {
        store.set(uIntUIntAddressMappingVar, _key, _key2, _value);
    }

    function getUIntUIntAddressMapping(uint _key, uint _key2) public view returns (address) {
        return store.get(uIntUIntAddressMappingVar, _key, _key2);
    }
    
    function setUIntUIntBytes32Mapping(uint _key, uint _key2, bytes32 _value) external {
        store.set(uIntUIntBytes32MappingVar, _key, _key2, _value);
    }

    function getUIntUIntBytes32Mapping(uint _key, uint _key2) public view returns (bytes32) {
        return store.get(uIntUIntBytes32MappingVar, _key, _key2);
    }

    function setUIntUIntUIntMapping(uint _key, uint _key2, uint _value) external {
        store.set(uIntUIntUIntMappingVar, _key, _key2, _value);
    }

    function getUIntUIntUIntMapping(uint _key, uint _key2) public view returns (uint) {
        return store.get(uIntUIntUIntMappingVar, _key, _key2);
    }

    function setAddressUIntUIntUIntMapping(address _key, uint _key2, uint _key3, uint _value) external {
        store.set(addressUIntUIntUIntMappingVar, _key, _key2, _key3, _value);
    }

    function getAddressUIntUIntUIntMapping(address _key, uint _key2, uint _key3) public view returns (uint) {
        return store.get(addressUIntUIntUIntMappingVar, _key, _key2, _key3);
    }

    function setAddressUIntStructAddressUInt8Mapping(address _key, uint _key2, address _value, uint8 _value2) external {
        store.set(addressUIntStructAddressUInt8MappingVar, _key, _key2, _value, _value2);
    }

    function getAddressUIntStructAddressUInt8Mapping(address _key, uint _key2) public view returns (address, uint8) {
        return store.get(addressUIntStructAddressUInt8MappingVar, _key, _key2);
    }

    function setAddressUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3, address _value, uint8 _value2) external {
        store.set(addressUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3, _value, _value2);
    }

    function getAddressUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3) public view returns (address, uint8) {
        return store.get(addressUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3);
    }

    function setAddressUIntUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4, address _value, uint8 _value2) external {
        store.set(addressUIntUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3, _key4, _value, _value2);
    }

    function getAddressUIntUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4) public view returns (address, uint8) {
        return store.get(addressUIntUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3, _key4);
    }

    function setAddressUIntUIntUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4, uint _key5, address _value, uint8 _value2) external {
        store.set(addressUIntUIntUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3, _key4, _key5, _value, _value2);
    }

    function getAddressUIntUIntUIntUIntStructAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4, uint _key5) public view returns (address, uint8) {
        return store.get(addressUIntUIntUIntUIntStructAddressUInt8MappingVar, _key, _key2, _key3, _key4, _key5);
    }

    function setAddressUIntAddressUInt8Mapping(address _key, uint _key2, address _key3, uint8 _value) external {
        store.set(addressUIntAddressUInt8MappingVar, _key, _key2, _key3, _value);
    }

    function getAddressUIntAddressUInt8Mapping(address _key, uint _key2, address _key3) public view returns (uint8) {
        return store.get(addressUIntAddressUInt8MappingVar, _key, _key2, _key3);
    }

    function setAddressUIntUIntAddressUInt8Mapping(address _key, uint _key2, uint _key3, address _key4, uint8 _value) external {
        store.set(addressUIntUIntAddressUInt8MappingVar, _key, _key2, _key3, _key4, _value);
    }

    function getAddressUIntUIntAddressUInt8Mapping(address _key, uint _key2, uint _key3, address _key4) public view returns (uint8) {
        return store.get(addressUIntUIntAddressUInt8MappingVar, _key, _key2, _key3, _key4);
    }

    function setAddressUIntUIntUIntAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4, address _key5, uint8 _value) external {
        store.set(addressUIntUIntUIntAddressUInt8MappingVar, _key, _key2, _key3, _key4, _key5, _value);
    }

    function getAddressUIntUIntUIntAddressUInt8Mapping(address _key, uint _key2, uint _key3, uint _key4, address _key5) public view returns (uint8) {
        return store.get(addressUIntUIntUIntAddressUInt8MappingVar, _key, _key2, _key3, _key4, _key5);
    }

    function setUIntAddressAddressBoolMapping(uint _key, address _key2, address _key3, bool _value) external {
        store.set(uIntAddressAddressBoolMappingVar, _key, _key2, _key3, _value);
    }

    function getUIntAddressAddressBoolMapping(uint _key, address _key2, address _key3) public view returns (bool) {
        return store.get(uIntAddressAddressBoolMappingVar, _key, _key2, _key3);
    }

    function setUIntUIntUIntBytes32Mapping(uint _key, uint _key2, uint _key3, bytes32 _value) external {
        store.set(uIntUIntUIntBytes32MappingVar, _key, _key2, _key3, _value);
    }

    function getUIntUIntUIntBytes32Mapping(uint _key, uint _key2, uint _key3) public view returns (bytes32) {
        return store.get(uIntUIntUIntBytes32MappingVar, _key, _key2, _key3);
    }

    /* Collections */ 
    
    /* Set */

    function addSet(bytes32 _value) external {
        store.add(setVar, _value);
    }

    function removeSet(bytes32 _value) external {
        store.remove(setVar, _value);
    }

    function includesSet(bytes32 _value) external view returns (bool) {
        return store.includes(setVar, _value);
    }

    function indexOfSet(bytes32 _value) public view returns (uint) {
        return store.getIndex(setVar, _value);
    }

    function countSet() public view returns (uint) {
        return store.count(setVar);
    }

    function getSet() public view returns (bytes32[]) {
        return store.get(setVar);
    }

    /* Addresses Set */

    function addAddressesSet(address _value) external {
        store.add(addressesSetVar, _value);
    }

    function removeAddressesSet(address _value) external {
        store.remove(addressesSetVar, _value);
    }

    function includesAddressesSet(address _value) external view returns (bool) {
        return store.includes(addressesSetVar, _value);
    }

    function indexOfAddressesSet(address _value) public view returns (uint) {
        return store.getIndex(addressesSetVar, _value);
    }

    function countAddressesSet() public view returns (uint) {
        return store.count(addressesSetVar);
    }

    function getAddressesSet() public view returns (address[]) {
        return store.get(addressesSetVar);
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

    function countCounterSet() public view returns (uint) {
        return store.count(counterSetVar);
    }

    function getCounterSet() public view returns (uint[]) {
        return store.get(counterSetVar);
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
        _items = new bytes32[](countOrderedSet());
        StorageInterface.Iterator memory _iterator = store.listIterator(orderedSetVar);
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
