// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRoyalties {
    function registerRelease(
        bytes32 releaseId,
        address[] memory wallets,
        uint256[] memory bps,
        uint256 price
    ) external;
}

contract TKFM_Authority {

    address public owner;
    address public royalties;

    event ReleaseVerified(bytes32 indexed releaseId, address indexed artist, string title);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _royalties) {
        owner = msg.sender;
        royalties = _royalties;
    }

    function verifyAndEmitRelease(
        bytes32 releaseId,
        address artist,
        string memory title,
        uint256 timestamp,
        bytes memory signature,
        address[] memory wallets,
        uint256[] memory bps,
        uint256 price
    ) external payable onlyOwner {

        require(msg.value == price, "Price mismatch");

        bytes32 messageHash = keccak256(
            abi.encode(releaseId, artist, title, timestamp)
        );

        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        address recovered = recoverSigner(ethSignedMessageHash, signature);
        require(recovered == owner, "Invalid signature");

        IRoyalties(royalties).registerRelease(
            releaseId,
            wallets,
            bps,
            price
        );

        emit ReleaseVerified(releaseId, artist, title);
    }

    function recoverSigner(bytes32 ethSignedMessageHash, bytes memory signature)
        internal
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        return ecrecover(ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (bytes32 r, bytes32 s, uint8 v)
    {
        require(sig.length == 65, "Invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }
}
