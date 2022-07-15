const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

let deployer
let fundMe
const sendValue = ethers.utils.parseEther("1")

describe("FundMe", function() {
    let mockV3Aggregator
    beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        mockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })

    describe("Constructor", function() {
        it("Sets the aggregator addresses correctly", async function() {
            const response = await fundMe.priceFeed()
            assert.equal(response, mockV3Aggregator.address)
        })
    })

    describe("Receive", function() {
        fundTest()
    })

    describe("Fallback", function() {
        fundTest()
    })

    describe("Fund", async function() {
        fundTest()
        it("Fails if you don't send enough ETH", async function() {
            await expect(fundMe.fund()).to.be.revertedWith(
                "Didn't send enough ETH!"
            )
        })
        it("Updated the amount funded data structure", async function() {
            await fundMe.fund({ value: sendValue })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response.toString(), sendValue.toString())
        })
        it("Adds funder to array of funders", async function() {
            await fundMe.fund({ value: sendValue })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    describe("Withdraw", async function() {
        beforeEach(async function() {
            await fundMe.fund({ value: sendValue })
        })

        it("Withdraw ETH from a single founder", async function() {
            // Arrange
            const startingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const startingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            // Act
            const transactionResponse = await fundMe.withdraw()
            const transactionReceip = await transactionResponse.wait(1)
            const { gasUsed, effectiveGasPrice } = transactionReceip
            const gasCost = gasUsed.mul(effectiveGasPrice)

            const endingFundMeBalance = await fundMe.provider.getBalance(
                fundMe.address
            )
            const endingDeployerBalance = await fundMe.provider.getBalance(
                deployer
            )
            // Assert
            assert.equal(endingFundMeBalance, 0)
            assert.equal(
                startingFundMeBalance.add(startingDeployerBalance).toString(),
                endingDeployerBalance.add(gasCost).toString()
            )
        })
    })
})

async function fundTest() {
    it("Fails if you don't send enough ETH", async function() {
        await expect(fundMe.fund()).to.be.revertedWith(
            "Didn't send enough ETH!"
        )
    })
    it("Updated the amount funded data structure", async function() {
        await fundMe.fund({ value: sendValue })
        const response = await fundMe.addressToAmountFunded(deployer)
        assert.equal(response.toString(), sendValue.toString())
    })
    it("Adds funder to array of funders", async function() {
        await fundMe.fund({ value: sendValue })
        const funder = await fundMe.funders(0)
        assert.equal(funder, deployer)
    })
}
