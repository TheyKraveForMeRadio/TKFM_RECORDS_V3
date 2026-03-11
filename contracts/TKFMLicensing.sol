// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFMLicensing {

 struct License{

  uint256 catalogId;
  address licensee;
  uint256 fee;

 }

 License[] public licenses;

 function issueLicense(
  uint256 catalogId,
  uint256 fee
 ) public payable {

  require(msg.value>=fee);

  licenses.push(
   License(catalogId,msg.sender,fee)
  );

 }

}
