pragma solidity ^0.4.8;

import "../Storage.sol";

contract FakeAccessManager is Manager {
    bool public isAllAllowed;

    mapping(address => mapping(bytes32 => bool)) acl;

    function isAllowed(address _actor, bytes32 _role) constant returns(bool) {
        if (isAllAllowed) {
            return true;
        }

        return acl[_actor][_role];
    }

    function updateAllowed(address _actor, bytes32 _role, bool allowed) {
        acl[_actor][_role] = allowed;
    }

    function setAllAllowed(bool _isAllAllowed) {
        isAllAllowed = _isAllAllowed;
    }
}
