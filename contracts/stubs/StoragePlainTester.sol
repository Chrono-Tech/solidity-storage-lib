/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

pragma solidity ^0.4.23;


import "../StorageAdapter.sol";


contract StoragePlainTester is StorageAdapter {

    StorageInterface.UInt uintVar;
    StorageInterface.UInt8 uint8Var;
    StorageInterface.Int intVar;
    StorageInterface.Address addressVar;
    StorageInterface.Bool boolVar;
    StorageInterface.Bytes32 bytes32Var;

    constructor(Storage _store, bytes32 _crate) StorageAdapter(_store, _crate) public {
    }

    function reinitPlain() public {
        uintVar.init("uintVar");
        uint8Var.init("uint8Var");
        intVar.init("intVar");
        addressVar.init("addressVar");
        boolVar.init("boolVar");
        bytes32Var.init("bytes32Var");
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

    function setUInt8WithKey(bytes32 _key, uint8 _value) external {
        store.set(uint8Var, _key, _value);
    }

    function getUInt8WithKey(bytes32 _key) public view returns (uint8) {
        return store.get(uint8Var, _key);
    }

    function setInt(int _value) external {
        store.set(intVar, _value);
    }

    function getInt() public view returns (int) {
        return store.get(intVar);
    }

    function setIntWithKey(bytes32 _key, int _value) external {
        store.set(intVar, _key, _value);
    }

    function getIntWithKey(bytes32 _key) public view returns (int) {
        return store.get(intVar, _key);
    }

    function setAddress(address _value) external {
        store.set(addressVar, _value);
    }

    function getAddress() public view returns (address) {
        return store.get(addressVar);
    }

    function setAddressWithKey(bytes32 _key, address _value) external {
        store.set(addressVar, _key, _value);
    }

    function getAddressWithKey(bytes32 _key) public view returns (address) {
        return store.get(addressVar, _key);
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
}
