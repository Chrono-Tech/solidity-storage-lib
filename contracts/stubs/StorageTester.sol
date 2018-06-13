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

    constructor(Storage _store, bytes32 _crate) StorageAdapter(_store, _crate) public {
        reinit();
    }

    function reinit() public {
        uintVar.init("uintVar");
        intVar.init("intVar");
        addressVar.init("addressVar");
        boolVar.init("boolVar");
        bytes32Var.init("bytes32Var");
        mappingVar.init("mappingVar");
        addressUIntMappingVar.init("addressUIntMappingVar");
        setVar.init("setVar");
        addressesSetVar.init("addressesSetVar");
    }

    function setUInt(uint _value) external {
        store.set(uintVar, _value);
    }

    function getUInt() public view returns (uint) {
        return store.get(uintVar);
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

    function addSet(bytes32 _value) external {
        store.add(setVar, _value);
    }

    function removeSet(bytes32 _value) external {
        store.remove(setVar, _value);
    }

    function includesSet(bytes32 _value) external view returns (bool) {
        return store.includes(setVar, _value);
    }

    function countSet() public view returns (uint) {
        return store.count(setVar);
    }

    function getSet() public view returns (bytes32[]) {
        return store.get(setVar);
    }

    function addAddressesSet(address _value) external {
        store.add(addressesSetVar, _value);
    }

    function removeAddressesSet(address _value) external {
        store.remove(addressesSetVar, _value);
    }

    function includesAddressesSet(address _value) external view returns (bool) {
        return store.includes(addressesSetVar, _value);
    }

    function countAddressesSet() public view returns (uint) {
        return store.count(addressesSetVar);
    }

    function getAddressesSet() public view returns (address[]) {
        return store.get(addressesSetVar);
    }
}
