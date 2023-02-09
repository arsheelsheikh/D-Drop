// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Upload {
  mapping(address => string[]) value;
  mapping(address => mapping(address => bool)) ownership;
  mapping(address => accessPoint[]) accessList;
  mapping(address => mapping(address => bool)) previousData;

  struct accessPoint {
    address user;
    bool access;
  }

  function Add(address _user, string memory url) external {
    value[_user].push(url);
  }

  function Allow(address user) external {
    ownership[msg.sender][user] = true;

    if (previousData[msg.sender][user]) {
      for (uint i = 0; i < accessList[msg.sender].length; i++) {
        if (accessList[msg.sender][i].user == user) {
          accessList[msg.sender][i].access = true;
        }
      }
    } else {
      accessList[msg.sender].push(accessPoint(user, true));
      previousData[msg.sender][user] = true;
    }
  }

  function Disallow(address user) public {
    ownership[msg.sender][user] = false;
    for (uint i = 0; i < accessList[msg.sender].length; i++) {
      if (accessList[msg.sender][i].user == user) {
        accessList[msg.sender][i].access = false;
      }
    }
  }

  function Display(address _user) external view returns (string[] memory) {
    require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
    return value[_user];
  }

  function ShareAccess() public view returns (accessPoint[] memory) {
    return accessList[msg.sender];
  }
}