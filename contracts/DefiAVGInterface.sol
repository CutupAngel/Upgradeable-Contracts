//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./DateTime.sol";

interface DefiAVGInterface {
    /**
     * Get Price
     * @param _date timestamp
     * @dev Get Price
     * @return price of the specific date
     */
    function getPrice(uint256 _date) external view returns (uint256);

    /**
     * Get AVG Price
     * @dev Get Average price from Aug to Sep
     * @return average price from Aug to Sep
     */
    function getAVGPrice() external view returns (uint256);
}
