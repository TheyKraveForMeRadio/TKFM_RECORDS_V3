// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CatalogRegistry {

    struct Catalog {
        address owner;
        string metadataURI;
        uint256 createdAt;
    }

    uint256 public catalogCount;

    mapping(uint256 => Catalog) public catalogs;

    event CatalogRegistered(
        uint256 catalogId,
        address owner,
        string metadataURI
    );

    function registerCatalog(string memory metadataURI) external returns (uint256) {

        catalogCount++;

        catalogs[catalogCount] = Catalog({
            owner: msg.sender,
            metadataURI: metadataURI,
            createdAt: block.timestamp
        });

        emit CatalogRegistered(
            catalogCount,
            msg.sender,
            metadataURI
        );

        return catalogCount;
    }
}
