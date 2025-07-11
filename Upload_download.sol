// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UploadDownload is Ownable {

    ERC20 public udtToken;

    struct File {
        string cid;
        string filename;
        address uploader;
    }

    File[] public files;

    uint256 public uploadCost = 10 * 10**18;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Invalid token address");
        udtToken = ERC20(_tokenAddress);
    }

    function uploadFile(string memory _cid, string memory _filename) public {
        require(bytes(_cid).length > 0, "CID cannot be empty");
        require(bytes(_filename).length > 0, "Filename cannot be empty");

        bool success = udtToken.transferFrom(msg.sender, address(this), uploadCost);
        require(success, "Token payment failed");

        files.push(File({
            cid: _cid,
            filename: _filename,
            uploader: msg.sender
        }));

        emit FileUploaded(msg.sender, _cid, _filename);
    }

    function getFiles() public view returns (File[] memory) {
        return files;
    }

    function withdrawTokens() public onlyOwner {
        uint256 balance = udtToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        bool success = udtToken.transfer(owner(), balance);
        require(success, "Token transfer failed");
    }

    function setUploadCost(uint256 _newCost) external onlyOwner {
        uploadCost = _newCost;
    }

    event FileUploaded(address indexed uploader, string cid, string filename);
}
