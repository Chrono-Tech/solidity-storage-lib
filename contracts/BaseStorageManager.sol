/**
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 */

pragma solidity ^0.4.23;


import "solidity-shared-lib/contracts/Owned.sol";


contract BaseStorageManager is Owned {

    uint constant OK = 1;

    event AccessGiven(address indexed self, address actor, bytes32 role);
    event AccessBlocked(address indexed self, address actor, bytes32 role);

    mapping (address => uint) public authorised;
    mapping (bytes32 => bool) public accessRights;

    function getEventsHistory() public view returns (address);
    function _self() internal view returns (address);

    function giveAccess(address _actor, bytes32 _role) onlyContractOwner external returns (uint) {
        if (!accessRights[keccak256(_actor, _role)]) {
            accessRights[keccak256(_actor, _role)] = true;
            authorised[_actor] += 1;
            _emitAccessGiven(_actor, _role);
        }

        return OK;
    }

    function blockAccess(address _actor, bytes32 _role) onlyContractOwner external returns (uint) {
        if (accessRights[keccak256(_actor, _role)]) {
            delete accessRights[keccak256(_actor, _role)];
            authorised[_actor] -= 1;
            if (authorised[_actor] == 0) {
                delete authorised[_actor];
            }
            _emitAccessBlocked(_actor, _role);
        }

        return OK;
    }

    function isAllowed(address _actor, bytes32 _role) public view returns (bool) {
        return accessRights[keccak256(_actor, _role)] || (this == _actor);
    }

    function hasAccess(address _actor) public view returns (bool) {
        return (authorised[_actor] > 0) || (this == _actor);
    }

    function emitAccessGiven(address _user, bytes32 _role) external {
        emit AccessGiven(_self(), _user, _role);
    }

    function emitAccessBlocked(address _user, bytes32 _role) external {
        emit AccessBlocked(_self(), _user, _role);
    }

    function _emitAccessGiven(address _user, bytes32 _role) internal {
        BaseStorageManager(getEventsHistory()).emitAccessGiven(_user, _role);
    }

    function _emitAccessBlocked(address _user, bytes32 _role) internal {
        BaseStorageManager(getEventsHistory()).emitAccessBlocked(_user, _role);
    }
}
