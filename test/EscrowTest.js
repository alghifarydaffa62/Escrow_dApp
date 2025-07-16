const {loadFixture} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect, should } = require("chai");
const { ethers } = require("hardhat");

describe("Escrow", function () {
  async function deployEscrowFixture() {
    const [deployer, services, arbiter, stranger] = await ethers.getSigners()

    const Escrow = await ethers.getContractFactory("Escrow")
    const escrow = await Escrow.deploy(services.address, arbiter.address)

    return {escrow, deployer, services, arbiter, stranger}
  }

  describe("Deployment", function () {
    it("should set deployer, arbiter, service correctly", async function() {
      const {escrow, deployer, arbiter, services } = await loadFixture(deployEscrowFixture)

      expect(await escrow.deployer()).to.equal(deployer.address)
      expect(await escrow.arbiter()).to.equal(arbiter.address)
      expect(await escrow.services()).to.equal(services.address)
    })

    it("should start with 0 balance and status not completed", async function() {
      const {escrow} = await loadFixture(deployEscrowFixture)

      expect(await escrow.balance()).to.equal(0)
      expect(await escrow.isCompleted()).to.equal(false)
    })
  });

  describe("Deposits", function () {
    it("should allow only deployer to deposit ether", async function() {
      const {escrow, stranger} = await loadFixture(deployEscrowFixture)

      await expect(
        escrow.connect(stranger).deposit({ value: ethers.parseEther("1") })
      ).to.be.revertedWith("You are not the deployer!")
    })

    it("should revert if no ether sent", async function() {
      const { escrow } = await loadFixture(deployEscrowFixture)

      await expect(
        escrow.deposit({ value: 0 })
      ).to.be.revertedWith("Must send ether!")
    })

    it("should update balance on successful deposit", async function () {
      const { escrow } = await loadFixture(deployEscrowFixture);

      await escrow.deposit({ value: ethers.parseEther("1") });
      expect(await escrow.balance()).to.equal(ethers.parseEther("1"));
    });

    it("should emit depositSuccess event", async function () {
      const { escrow, deployer } = await loadFixture(deployEscrowFixture);

      await expect(escrow.deposit({ value: ethers.parseEther("0.5") }))
        .to.emit(escrow, "depositSuccess")
        .withArgs(deployer.address, ethers.parseEther("0.5"));
    });
  })
  
  describe("Approve payment", function() {
    it("should allow only arbiter to approve", async function() {
      const {escrow, deployer} = await loadFixture(deployEscrowFixture)

      await escrow.deposit({value: ethers.parseEther("1")})

      await expect(
        escrow.connect(deployer).approvePayment()
      ).to.be.rejectedWith("You are not the arbiter!")
    })

    it("should revert if no balance", async function() {
      const {escrow, arbiter} = await loadFixture(deployEscrowFixture)

      await expect(
        escrow.connect(arbiter).approvePayment()
      ).to.be.rejectedWith("Deployer hasn't send ether!")
    })

    it("it should send ether to service deployer and escrow completed", async function() {
      const {escrow, arbiter, services} = await loadFixture(deployEscrowFixture)

      await escrow.deposit({ value: ethers.parseEther("1")})

      const before = await ethers.provider.getBalance(services.address)

      const tx = await escrow.connect(arbiter).approvePayment()
      await tx.wait()

      const after = await ethers.provider.getBalance(services.address)

      expect(after - before).to.equal(ethers.parseEther("1"))
      expect(await escrow.balance()).to.equal(0)
      expect(await escrow.isCompleted()).to.equal(true)
    })

    it("should emit servicesPayed event", async function() {
      const {escrow, arbiter, services} = await loadFixture(deployEscrowFixture)

      await escrow.deposit({ value: ethers.parseEther("2")})

      await expect(escrow.connect(arbiter).approvePayment())
        .to.emit(escrow, "servicesPayed")
        .withArgs(arbiter.address, services.address, ethers.parseEther("2"))
    })
  })
});
