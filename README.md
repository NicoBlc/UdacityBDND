# Udacity Blockchain Developer Nano Degree

## Project 5: Ethereum Star Notary Nico

### Task 1
* Add a name and a symbol for your starNotary tokens.
* Add a function lookUptokenIdToStarInfo, that looks up the stars using the Token ID, and then returns the name of the star.
* Add a function called exchangeStars, so 2 users can exchange their star tokens...Do not worry about the price, just write code to exchange stars between users.
* Write a function to Transfer a Star. The function should transfer a star from the address of the caller. The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.

### Task 2
* The token name and token symbol are added properly.
* 2 users can exchange their stars.
* Stars Tokens can be transferred from one address to another.

### Task 1 & 2 Test result on local Ganache RPC Server
* iMac-van-Nico:Project 5 StarNotary Nico nicobijl$ truffle compile
> Compiled successfully using:
   - solc: 0.5.2+commit.1df8f40c.Emscripten.clang
* iMac-van-Nico:Project 5 StarNotary Nico nicobijl$ truffle migrate --reset
Summary
=======
> Total deployments:   2
> Final cost:          0.05200468 ETH
* iMac-van-Nico:Project 5 StarNotary Nico nicobijl$ truffle test
  * ✓ can Create a Star (157ms)
  * ✓ lets user1 put up their star for sale (338ms)
  * ✓ lets user1 get the funds after the sale (333ms)
  * ✓ lets user2 buy a star, if it is put up for sale (345ms)
  * ✓ lets user2 buy a star and decreases its balance in ether (268ms)
  * ✓ token name and token symbol are added properly (83ms)
  * ✓ 2 users can exchange their stars (356ms)
  * ✓ lets a user transfer a star (206ms)

  8 passing (2s)

### Task 3 Deploy your Contract to Rinkeby
* Edit the truffle.config file to add settings to deploy your contract to the Rinkeby Public Network.

These are my Rinkeby settings inside truffle-config.js:
rinkeby: {
      provider: () => 
      new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/8ada6f911db44c01b13f5ece14e1e5e6"),
        network_id: 4,       // rinkeby's id
        gas: 4500000,        // rinkeby has a lower block limit than mainnet
        gasPrice: 10000000000
    },

### Task 4 Modify the front end of the DAPP
* Lookup a star by ID using tokenIdToStarInfo() (you will have to add code for this in your index.html and index.js files)
You can find my stars on the Rinkeby network onder the following address (This is my Ethereum Address):
https://rinkeby.etherscan.io/address/0x4e46995798c0b352f653c8f137c43d0f1cdabb00 

This Star was created on the frontend (This is the transaction ID):
https://rinkeby.etherscan.io/tx/0xf91a3511b9d3aa49a3e47cf223811bfa4ed88ec89d9409b1db028c1ab11050b4

This is the message that is displayed on the frontend:
New Star Owner is 0x4E46995798C0b352F653C8f137C43d0f1CDaBb00.
Star: Id = 12, Name = Star Nico Rinkeby


### Project Submission Instructions
* Specify the Truffle version and OpenZeppelin version used in the project:
    - Truffle v5.0.13
    - OpenZeppelin v2.2.0
* Your ERC-721 Token Name: Star Notary Nico
* Your ERC-721 Token Symbol: SNN
* Your “Token Address” on the Rinkeby Network:
https://rinkeby.etherscan.io/address/0x2F959D4b0E38cf8D56be3Cdf7f4a62868775E5eD
