// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {

	uint256 public minimumUsd = 50 * 1e18;

	address[] public funders;
	mapping(address => uint256) public addressToAmountFunded;

	address public owner;

    constructor() {
        owner = msg.sender;
    }

	function fund() public payable {
		// Want to be able to set a minimum fund amount in USD
		// 1. How do we send ETH to this contract?
		require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enougth!"); // 1e18 == 1 * 10 ** 18 == 1.000.000.000.000.000.000
		funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
	}

	function withdraw() public {
        for(uint256 i = 0; i < funders.length; i++) {
            address funder = funders[i];
            addressToAmountFunded[funder] = 0;
        }
        // Reset the array
        // (x) indicates x new elements
        funders = new address[](0);

        // Actually withdraw the funds
        /*
         *         msg.sender  is an adress 
         * payable(msg.sender) is a payable address
         */

        // Transfer: max 2300 gas, throws error.
        // payable(msg.sender).transfer(address(this).balance);
        // Send: max 2300 gas, returns bool indicating if succesful or not.
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        // Call: forward all gas or set gas, return bool indicating if succesful or not.
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

}
