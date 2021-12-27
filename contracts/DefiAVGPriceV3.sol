//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import "./DateTime.sol";

/// @author Angel Michael
/// @title Coding challenge
/// @dev Contract for calculate the avearge price of token - upgradeable, pausable
contract DefiAVGPriceV3 is Ownable, Pausable, DateTime, Initializable {
    using SafeMath for uint256;

    mapping(uint256 => uint256) private _prices;
    uint256 private _sumOfPrice;
    uint256 private _sumOfDay;

    /**
     * modifier for availability of set price
     * @dev Modifier for availability of set price
     */
    modifier onlyOncerSet() {
        require(
            _prices[block.timestamp.div(3600)] == 0,
            "Set price once per a day"
        );
        _;
    }

    /**
     * Set Price ( available for only onwer )
     * @param _price new price for a day
     * @dev Set Price when not paused
     */
    function setPrice(uint256 _price)
        external
        whenNotPaused
        onlyOwner
        onlyOncerSet
    {
        _prices[block.timestamp.div(3600)] = _price;
        uint256 _month = getMonth(block.timestamp);
        if (_month >= 8 && _month <= 9) {
            _sumOfDay = _sumOfDay.add(1);
            _sumOfPrice = _sumOfPrice.add(_price);
        }
    }

    /**
     * Get Price
     * @param _date timestamp
     * @dev Get Price
     * @return price of the specific date
     */
    function getPrice(uint256 _date) external view returns (uint256) {
        return _prices[_date.div(3600)];
    }

    /**
     * Get AVG Price
     * @dev Get Average price from Aug to Sep
     * @return average price from Aug to Sep
     */
    function getAVGPrice() external view returns (uint256) {
        return _sumOfPrice.div(_sumOfPrice);
    }

    /**
     * Pause to set price ( available for only owner )
     * @dev Pause to set the price
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * Unpause to set price ( available for only owner )
     * @dev Unpause to set the price
     */
    function unpause() public onlyOwner {
        _unpause();
    }
}
