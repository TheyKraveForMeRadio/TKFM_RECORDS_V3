// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CatalogMarketplace {

    struct Listing {

        address seller;
        address nft;
        uint256 tokenId;
        uint256 price;
        bool active;

    }

    uint256 public listingId;

    mapping(uint256 => Listing) public listings;

    event Listed(uint256 id,address seller);
    event Sold(uint256 id,address buyer);

    function list(
        address nft,
        uint256 tokenId,
        uint256 price
    ) external {

        IERC721(nft).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        listingId++;

        listings[listingId] = Listing({
            seller: msg.sender,
            nft: nft,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit Listed(listingId,msg.sender);

    }

    function buy(uint256 id) external payable {

        Listing storage L = listings[id];

        require(L.active,"inactive");
        require(msg.value == L.price,"price");

        payable(L.seller).transfer(msg.value);

        IERC721(L.nft).transferFrom(
            address(this),
            msg.sender,
            L.tokenId
        );

        L.active=false;

        emit Sold(id,msg.sender);

    }

}
