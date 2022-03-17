const { mnemonic } = require("./secrets.json");

require("@nomiclabs/hardhat-waffle");
require("@float-capital/solidity-coverage");
require("@nomiclabs/hardhat-web3");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("pk", "Prints the pk account", async () => {
  const wallet = new ethers.Wallet.fromMnemonic(mnemonic);
  const address = wallet.getAddress();
  console.log("address: ", address);
  console.log("privateKey: ", wallet.privateKey);
});
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    ftmtest: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: { mnemonic: mnemonic },
      timeout: 900_000,
      gasPrice: 225000000000,
      gas: 60000000,
      gasLimit: 50000000,
      gasMultiplier: 40,
    },
    AvaxTest: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: { mnemonic: mnemonic },
      // gas: 600000000,
      // gasMultiplier: 2.5,
      // confirmations: 3,
      // gasPrice: 25000000000,
      chainId: 43113,
      timeout: 300_000,
      gasLimit: 25000000000,
    },
    dashboard: {
      url: "http://localhost:24012/rpc",
    },
  },
};
