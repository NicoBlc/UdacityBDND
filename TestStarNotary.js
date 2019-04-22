const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
  });

// ##################### TASK 2 #####################
// Add supporting unit tests, to test the following:

// The token name and token symbol are added properly.
it('token name and token symbol are added properly', async() => {
    let instance = await StarNotary.deployed();
    // Check (Assert) if token name and symbol have the correct names.
    assert.equal(await instance.name(), 'Star Notary Nico');
    assert.equal(await instance.symbol(), 'SNN');
});

// 2 users can exchange their stars.
it('2 users can exchange their stars', async() => {
    let instance = await StarNotary.deployed();
    // Setting up 2 user accounts and creating stars to exchange
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId1 = 6;
    let starId2 = 7;
    await instance.createStar('Star 1', starId1, {from: user1});
    await instance.createStar('Star 2', starId2, {from: user2});
    // Use the exchangeStars method that takes in 2 parameters i.e. the stars to exchange
    await instance.exchangeStars(starId1,starId2, {from: user1});
    // Checking if the owners of the stars have indeed changed i.e. user2 should now own starId1
    assert.equal(await instance.ownerOf(starId1), user2);
    assert.equal(await instance.ownerOf(starId2), user1);
});

// Stars Tokens can be transferred from one address to another.
it('lets a user transfer a star', async() => {
    let instance = await StarNotary.deployed();
    // Setting up 2 user accounts and creating a star to transfer
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 8;
    await instance.createStar('transferred star 8', starId, {from: user1});
    // Use the transferStar method that takes in 2 parameters i.e. the star to transfer
    await instance.transferStar(user2, starId, {from: user1});
    // Checking if the owner of star 8 has indeed changed i.e. user2 should now own starId = 8
    assert.equal(user2,await instance.ownerOf(starId));
});
// ##################### TASK 2 #####################