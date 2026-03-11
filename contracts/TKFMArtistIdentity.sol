// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFMArtistIdentity {

 struct Artist {
  string name;
  string metadataURI;
  bool verified;
 }

 mapping(address => Artist) public artists;

 event ArtistRegistered(address artist,string name);
 event ArtistVerified(address artist);

 function registerArtist(
  string memory name,
  string memory metadataURI
 ) public {

  artists[msg.sender] = Artist(
   name,
   metadataURI,
   false
  );

  emit ArtistRegistered(msg.sender,name);

 }

 function verifyArtist(address artist) public {

  artists[artist].verified = true;

  emit ArtistVerified(artist);

 }

}
