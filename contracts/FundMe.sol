// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./PriceConverter.sol";

contract FundMe {

	uint256 public minimumUsd = 50 * 1e18;

	address[] public funders;
	mapping(address => uint256) public addressToAmountFunded;

	function fund() public payable {
		// Want to be able to set a minimum fund amount in USD
		// 1. How do we send ETH to this contract?
		require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enougth!"); // 1e18 == 1 * 10 ** 18 == 1.000.000.000.000.000.000
		funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
	}

	// function withdraw() {}

}
