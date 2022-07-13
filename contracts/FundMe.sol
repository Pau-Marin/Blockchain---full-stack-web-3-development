// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract FundMe {

	uint256 public minimumUsd = 50 * 1e18;

	function fund() public payable {
		// Want to be able to set a minimum fund amount in USD
		// 1. How do we send ETH to this contract?
		require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enougth!"); // 1e18 == 1 * 10 ** 18 == 1.000.000.000.000.000.000
	}

	// function withdraw() {}

}
