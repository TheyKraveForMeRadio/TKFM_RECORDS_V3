// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IReleaseNFT {
    function mintTo(address to, bytes32 releaseId) external;
}

contract TKFM_Royalties {

    struct Split {
        address wallet;
        uint256 bps;
    }

    mapping(bytes32 => Split[]) private releaseSplits;
    mapping(bytes32 => uint256) private releasePrices;
    mapping(bytes32 => uint256) private releaseRevenue;
    mapping(bytes32 => uint256) private buyerCount;

    mapping(address => uint256) public balances;

    address public authority;
    address public nft;

    event ReleaseRegistered(bytes32 indexed releaseId, uint256 price);
    event ReleasePurchased(bytes32 indexed releaseId, address indexed buyer, uint256 amount);
    event RevenueDistributed(bytes32 indexed releaseId, uint256 totalAmount);
    event Withdrawal(address indexed user, uint256 amount);
    event AuthorityTransferred(address indexed newAuthority);
    event NFTSet(address indexed nftAddress);

    modifier onlyAuthority() {
        require(msg.sender == authority, "Not authority");
        _;
    }

    constructor() {
        authority = msg.sender;
    }

    function setNFT(address _nft) external onlyAuthority {
        nft = _nft;
        emit NFTSet(_nft);
    }

    function transferAuthority(address newAuthority) external onlyAuthority {
        authority = newAuthority;
        emit AuthorityTransferred(newAuthority);
    }

    function registerRelease(
        bytes32 releaseId,
        address[] memory wallets,
        uint256[] memory bps,
        uint256 price
    ) external onlyAuthority {

        require(releaseSplits[releaseId].length == 0, "Already registered");
        require(wallets.length == bps.length, "Length mismatch");

        uint256 totalBps = 0;

        for (uint256 i = 0; i < wallets.length; i++) {
            releaseSplits[releaseId].push(
                Split({
                    wallet: wallets[i],
                    bps: bps[i]
                })
            );
            totalBps += bps[i];
        }

        require(totalBps == 10000, "BPS must equal 10000");

        releasePrices[releaseId] = price;

        emit ReleaseRegistered(releaseId, price);
    }

    function buyRelease(bytes32 releaseId) external payable {

        uint256 price = releasePrices[releaseId];
        require(price > 0, "Release not found");
        require(msg.value == price, "Incorrect payment");
        require(nft != address(0), "NFT not set");

        releaseRevenue[releaseId] += msg.value;
        buyerCount[releaseId] += 1;

        Split[] memory splits = releaseSplits[releaseId];

        for (uint256 i = 0; i < splits.length; i++) {
            uint256 share = (msg.value * splits[i].bps) / 10000;
            balances[splits[i].wallet] += share;
        }

        IReleaseNFT(nft).mintTo(msg.sender, releaseId);

        emit ReleasePurchased(releaseId, msg.sender, msg.value);
        emit RevenueDistributed(releaseId, msg.value);
    }

    function withdraw() external {

        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");

        balances[msg.sender] = 0;

        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    function getReleasePrice(bytes32 releaseId) external view returns (uint256) {
        return releasePrices[releaseId];
    }

    function getReleaseRevenue(bytes32 releaseId) external view returns (uint256) {
        return releaseRevenue[releaseId];
    }

    function getBuyerCount(bytes32 releaseId) external view returns (uint256) {
        return buyerCount[releaseId];
    }

    function getReleaseSplits(bytes32 releaseId)
        external
        view
        returns (address[] memory wallets, uint256[] memory bps)
    {
        Split[] memory splits = releaseSplits[releaseId];

        wallets = new address[](splits.length);
        bps = new uint256[](splits.length);

        for (uint256 i = 0; i < splits.length; i++) {
            wallets[i] = splits[i].wallet;
            bps[i] = splits[i].bps;
        }
    }
}
