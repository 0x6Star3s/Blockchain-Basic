const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("SimpleStorage", function () {

  let simpleStorageFactory, simpleStorage

  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    // assert
    // expect
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue)
    // assert i expect te dwie key ward działają tak samo
  })

  // it.onle - oznacza że tylko te test bedziemy sprawdzać
  it("Should updata when we call store", async function(){
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)

    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("Should add name too the favoriteNumber", async function(){
    const expectedValue = [12, "pawel"] 
    const transactionAddNewPerson = await simpleStorage.addPerson("pawel", 12)
    await transactionAddNewPerson.wait(1)

    const currentValuePerson = await simpleStorage.people(0)
    assert.equal(currentValuePerson.toString(), expectedValue)
  })

})