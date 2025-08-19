// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import './Escrow.sol';

contract EscrowFactory {
    address[] public allEscrows;

    mapping(address => address[]) public userEscrows;

    event EscrowCreated(address indexed escrow, address indexed deployer, address service, address arbiter);

    function createEscrow(address _service, address _arbiter) external {
        Escrow escrow = new Escrow(_service, _arbiter);
        address escrowAddr = address(escrow);

        allEscrows.push(escrowAddr);
        userEscrows[msg.sender].push(escrowAddr);
        userEscrows[_service].push(escrowAddr);
        userEscrows[_arbiter].push(escrowAddr);

        emit EscrowCreated(escrowAddr, msg.sender, _service, _arbiter);
    }

    function getAllEscrows() external view returns(address[] memory) {
        return allEscrows;
    }

    function getUserEscrows(address user) external view returns(address[] memory) {
        return userEscrows[user];
    }
}