// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ChangePresident is Ownable {
    struct PresidentInfo {
        address addr;
        string name;
        string party;
        string term;
    }

    PresidentInfo private s_president;

    //emitted when the stored value changes
    event ValueChanged(PresidentInfo _president);

    function store(PresidentInfo calldata _president) external onlyOwner {
        s_president = _president;
        emit ValueChanged(_president);
    }

    //reads the last stored value
    function retrieve() public view returns (PresidentInfo memory) {
        return s_president;
    }
}
