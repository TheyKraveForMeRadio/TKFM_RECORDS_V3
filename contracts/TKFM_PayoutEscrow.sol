// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRoyalties {
    function splits(bytes32, uint256) external view returns (address, uint16);
}

contract TKFM_PayoutEscrow {
    IRoyalties public royalties;

    constructor(address royaltiesAddr) {
        royalties = IRoyalties(royaltiesAddr);
    }

    function distribute(bytes32 releaseId) external payable {
        uint256 i = 0;
        while (true) {
            try royalties.splits(releaseId, i) returns (address to, uint16 bps) {
                payable(to).transfer((msg.value * bps) / 10000);
                i++;
            } catch {
                break;
            }
        }
    }
}
