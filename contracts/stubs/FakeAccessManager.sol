pragma solidity ^0.4.23;


import "../Storage.sol";


contract FakeAccessManager is Manager {
    bool public isAllAllowed;

    mapping(address => mapping(bytes32 => bool)) internal acl;
    address[] internal actors;

    function isAllowed(address _actor, bytes32 _role) public view returns (bool) {
        if (isAllAllowed) {
            return true;
        }

        return acl[_actor][_role];
    }

    function hasAccess(address _actor) public view returns (bool) {
        if (isAllAllowed) {
            return true;
        }

        for (uint idx = 0; idx < actors.length; ++idx) {
            if (actors[idx] == _actor) {
                return true;
            }
        }
        return false;
    }

    function updateAllowed(address _actor, bytes32 _role, bool allowed) public {
        acl[_actor][_role] = allowed;
    }

    function setAllAllowed(bool _isAllAllowed) public {
        isAllAllowed = _isAllAllowed;
    }
}
