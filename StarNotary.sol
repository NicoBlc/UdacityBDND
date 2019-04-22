pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721 {

    struct Star {
        string name;
    }

    // ##################### TASK 1 #####################
    // Add a name and a symbol for your starNotary tokens.
    string public constant name = "Star Notary Nico";
    string public constant symbol = "SNN";
    // ##################### TASK 1 #####################

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;


    // Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public { // Passing the name and tokenId as a parameters
        Star memory newStar = Star(_name); // Star is an struct so we are creating a new Star
        tokenIdToStarInfo[_tokenId] = newStar; // Creating in memory the Star -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the the star with _tokenId to the sender address (ownership)
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't owned");
        starsForSale[_tokenId] = _price;
    }


    // Function that allows you to convert an address into a payable address
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    function buyStar(uint256 _tokenId) public  payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough Ether");
        _transferFrom(ownerAddress, msg.sender, _tokenId); // We can't use _addTokenTo or_removeTokenFrom functions, now we have to use _transferFrom
        address payable ownerAddressPayable = _make_payable(ownerAddress); // We need to make this conversion to be able to use transfer() function to transfer ethers
        ownerAddressPayable.transfer(starCost);
        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    // ##################### TASK 1 #####################################################
    // Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID,
    // and then returns the name of the star.
    function lookupTokenIdToStarInfo (uint _tokenId) public view returns (string memory) {
        return tokenIdToStarInfo[_tokenId].name;
    }

    // Add a function called exchangeStars, so 2 users can exchange their star tokens...
    // Do not worry about the price, just write code to exchange stars between users.
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        address token1Owner = ownerOf(_tokenId1);
        address token2Owner = ownerOf(_tokenId2);
        require(token1Owner != address(0), "First token owner is required and must exist before exchanging");
        require(token2Owner != address(0), "Second token owner is required and must exist before exchanging");
        // After verifying that token owner 1 and 2 exist execute the swap.
        if(msg.sender == token1Owner) {
            _transferFrom(token1Owner, token2Owner, _tokenId1);
            _transferFrom(token2Owner, token1Owner, _tokenId2);
        }
        else if(msg.sender == token2Owner) {
            _transferFrom(token2Owner, token1Owner, _tokenId2);
            _transferFrom(token1Owner, token2Owner, _tokenId1);
        }
    }

    // Write a function to Transfer a Star. The function should transfer a star from the address...
    // of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
    function transferStar(address _to, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "Owner of the token need to be the sender");
        // Using ERC721 method transferFrom that takes in 3 parameters
        transferFrom(msg.sender, _to, _tokenId);
    }
    // ##################### TASK 1 #####################################################

}