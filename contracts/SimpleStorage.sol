 // SPDX-License-Identifier: MIT

/*
 *  ^ indicates this versión and above. Ex: ^0.8.8 = from 0.8.8 to 0.8.99999999...
 *  >= < indicates a range of versions. Ex: >= 0.8.8 <0.8.10  = from 0.8.8 to less than (not included) 0.8.10
 */ 
pragma solidity ^0.8.8;

contract SimpleStorage {
    // Variables are initialized to their null value by default (0 in ints)
    uint256 public favoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    // view & pure methods don't spend gas to run.
    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }
}
