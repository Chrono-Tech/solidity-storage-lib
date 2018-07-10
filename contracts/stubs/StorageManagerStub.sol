pragma solidity ^0.4.23;


import "../BaseStorageManager.sol";


contract StorageManagerStub is BaseStorageManager {

    address eventsHistory;

    function setupEventsHistory(address _eventsHistory) onlyContractOwner public returns (bool) {
        if (getEventsHistory() != 0x0) {
            return false;
        }
        _setEventsHistory(_eventsHistory);
        return true;
    }

    function getEventsHistory() public view returns (address) {
        return eventsHistory != 0x0 ? eventsHistory : this;
    }

    function _self() internal view returns (address) {
        return msg.sender;
    }

    function _setEventsHistory(address _eventsHistory) internal returns (bool) {
        eventsHistory = _eventsHistory;
        return true;
    }
}