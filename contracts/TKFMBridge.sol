// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFMBridge {

 event Locked(address user,uint256 amount);
 event Released(address user,uint256 amount);

 function lock(uint256 amount) public {

  emit Locked(msg.sender,amount);

 }

 function release(address user,uint256 amount) public {

  emit Released(user,amount);

 }

}
