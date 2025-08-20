// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import './Escrow.sol';

contract EscrowFactory {

    struct EscrowInfo {
        string name;
        address escrowAddress;
        address deployer;
        address arbiter;
        address service;
    }

    EscrowInfo[] public allEscrows;

    mapping(address => EscrowInfo[]) public userEscrows;

    event EscrowCreated(string indexed name, address indexed escrow, address indexed deployer, address service, address arbiter);

    function createEscrow(string memory _name, address _service, address _arbiter) external {
        Escrow escrow = new Escrow(_name, msg.sender, _service, _arbiter);
        address escrowAddr = address(escrow);

        EscrowInfo memory Info = EscrowInfo({
            name: _name,
            escrowAddress: escrowAddr,
            deployer: msg.sender,
            arbiter: _arbiter,
            service: _service
        });

        allEscrows.push(Info);
        userEscrows[msg.sender].push(Info);
        userEscrows[_arbiter].push(Info);
        userEscrows[_service].push(Info);

        emit EscrowCreated(_name, escrowAddr, msg.sender, _service, _arbiter);
    }

    function getAllEscrows() external view returns(EscrowInfo[] memory) {
        return allEscrows;
    }

    function getUserEscrows(address user) external view returns(EscrowInfo[] memory) {
        return userEscrows[user];
    }
}