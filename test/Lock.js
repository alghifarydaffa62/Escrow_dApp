const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  
  async function deployOneYearLockFixture() {
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy();

    return { lock };
  }

  describe("Deployment", function () {
    
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      
    });

    describe("Events", function () {
      
    });

    describe("Transfers", function () {
      
    });
  });
});
