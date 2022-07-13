// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {

	uint256 public minimumUsd = 50 * 1e18;

	address[] public funders;
	mapping(address => uint256) public addressToAmountFunded;

	function fund() public payable {
		// Want to be able to set a minimum fund amount in USD
		// 1. How do we send ETH to this contract?
		require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enougth!"); // 1e18 == 1 * 10 ** 18 == 1.000.000.000.000.000.000
		funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
	}

	function getPrice() public view returns(uint256) {
        // ABI
        // Address 0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (, int256 price,,,) = priceFeed.latestRoundData();
        // ETH in terms of USD
        require(getConversionRate(msg.value) >= minimumUsd, "Didn't send enougth!"); // ETH price has 8 decimals and msg.value has 18.
    }

    function getVersion() public view returns (uint256) {
    	AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
    	return priceFeed.version();
    }

    function getConversionRate(uint256 ethAmount) public view returns(uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }

	// function withdraw() {}

}
