async function main() {
  const Token = await ethers.getContractFactory("BaseV1");
  const Gauges = await ethers.getContractFactory("BaseV1GaugeFactory");
  const Bribes = await ethers.getContractFactory("BaseV1BribeFactory");
  const Core = await ethers.getContractFactory("BaseV1Factory");
  const Factory = await ethers.getContractFactory("BaseV1Router01");
  const Ve = await ethers.getContractFactory("contracts/ve.sol:ve");
  const Ve_dist = await ethers.getContractFactory(
    "contracts/ve_dist.sol:ve_dist"
  );
  const BaseV1Voter = await ethers.getContractFactory("BaseV1Voter");
  const BaseV1Minter = await ethers.getContractFactory("BaseV1Minter");

  const token = await Token.deploy();
  console.log("Tokens have been deployed");
  const gauges = await Gauges.deploy();
  console.log("Gauges have been deployed");
  const bribes = await Bribes.deploy();
  console.log("Bribes have been deployed");
  const core = await Core.deploy();
  console.log("Core has been deployed");
  // await sleep(2000);

  // Add base asset of chain to this line currently set to wrapped fantom
  const factory = await Factory.deploy(
    core.address,
    "0xD9D01A9F7C810EC035C0e42cB9E80Ef44D7f8692"
  );
  console.log("Factory has been deployed");
  const ve = await Ve.deploy(token.address);
  console.log("Ve has been deployed");
  const ve_dist = await Ve_dist.deploy(ve.address);
  console.log("Ve_dist has been deployed");
  const voter = await BaseV1Voter.deploy(
    ve.address,
    core.address,
    gauges.address,
    bribes.address
  );
  console.log("Voter has been deployed");
  const minter = await BaseV1Minter.deploy(
    voter.address,
    ve.address,
    ve_dist.address
  );
  console.log("Minter has been deployed");

  await token.setMinter(minter.address);
  await ve.setVoter(voter.address);
  await ve_dist.setDepositor(minter.address);
  // This is addding all the initial tokens you can vote on?  Top 25 Avax Coins
  await voter.initialize(
    [
      "0xB09FE1613fE03E7361319d2a43eDc17422f36B09",
      "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664",
      "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
      "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
      "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
      "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
      "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
      "0x50b7545627a5162F82A992c33b87aDc75187B218",
      "0x130966628846BFd36ff31a822705796e8cb8C18D",
      "0x22d4002028f537599bE9f666d1c4Fa138522f9c8",
      "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70",
      "0x8F47416CaE600bccF9530E9F3aeaA06bdD1Caa79",
      "0xfcc6CE74f4cd7eDEF0C5429bB99d38A3608043a5",
      "0x260Bbf5698121EB85e7a74f2E45E16Ce762EbE11",
      "0x5947BB275c521040051D82396192181b413227A3",
      "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
      "0x490bf3ABcAb1fB5c88533d850F2a8d6D38298465",
      "0x62edc0692BD897D2295872a9FFCac5425011c661",
      "0x6D923f688C7FF287dc3A5943CAeefc994F97b290",
      "0xA32608e873F9DdEF944B24798db69d80Bbb4d1ed",
      "0xf693248F96Fe03422FEa95aC0aFbBBc4a8FdD172",
      "0x264c1383EA520f73dd837F915ef3a732e204a493",
      "0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4",
      "0x321E7092a180BB43555132ec53AaA65a5bF84251",
    ],
    minter.address
  );

  //This is adding the inital VeNFT distibution  Also Max Suppply is set to 100,000,000
  await minter.initialize(
    [
      "0x0262e61388A249A141b75f36fa29a07a82173BF3",
      "0x2F3779610Bc929c60737034981EDCFCFc8e9D4fb",
      "0x95478C4F7D22D1048F46100001c2C69D2BA57380",
      "0xC0E2830724C946a6748dDFE09753613cd38f6767",
      "0x3293cB515Dbc8E0A8Ab83f1E5F5f3CC2F6bbc7ba",
      "0xffFfBBB50c131E664Ef375421094995C59808c97",
      "0x02517411F32ac2481753aD3045cA19D58e448A01",
      "0xf332789fae0d1d6f058bfb040b3c060d76d06574",
      "0xdFf234670038dEfB2115Cf103F86dA5fB7CfD2D2",
      "0x0f2A144d711E7390d72BD474653170B201D504C8",
      "0x224002428cF0BA45590e0022DF4b06653058F22F",
      "0x26D70e4871EF565ef8C428e8782F1890B9255367",
      "0xA5fC0BbfcD05827ed582869b7254b6f141BA84Eb",
      "0x4D5362dd18Ea4Ba880c829B0152B7Ba371741E59",
      "0x1e26D95599797f1cD24577ea91D99a9c97cf9C09",
      "0xb4ad8B57Bd6963912c80FCbb6Baea99988543c1c",
      "0xF9E7d4c6d36ca311566f46c81E572102A2DC9F52",
      "0xE838c61635dd1D41952c68E47159329443283d90",
      "0x111731A388743a75CF60CCA7b140C58e41D83635",
      "0x0edfcc1b8d082cd46d13db694b849d7d8151c6d5",
      "0xD0Bb8e4E4Dd5FDCD5D54f78263F5Ec8f33da4C95",
      "0x9685c79e7572faF11220d0F3a1C1ffF8B74fDc65",
      "0xa70b1d5956DAb595E47a1Be7dE8FaA504851D3c5",
      "0x06917EFCE692CAD37A77a50B9BEEF6f4Cdd36422",
      "0x5b0390bccCa1F040d8993eB6e4ce8DeD93721765",
    ],
    [
      ethers.BigNumber.from("800000000000000000000000"),
      ethers.BigNumber.from("2376588000000000000000000"),
      ethers.BigNumber.from("1331994000000000000000000"),
      ethers.BigNumber.from("1118072000000000000000000"),
      ethers.BigNumber.from("1070472000000000000000000"),
      ethers.BigNumber.from("1023840000000000000000000"),
      ethers.BigNumber.from("864361000000000000000000"),
      ethers.BigNumber.from("812928000000000000000000"),
      ethers.BigNumber.from("795726000000000000000000"),
      ethers.BigNumber.from("763362000000000000000000"),
      ethers.BigNumber.from("727329000000000000000000"),
      ethers.BigNumber.from("688233000000000000000000"),
      ethers.BigNumber.from("681101000000000000000000"),
      ethers.BigNumber.from("677507000000000000000000"),
      ethers.BigNumber.from("676304000000000000000000"),
      ethers.BigNumber.from("642992000000000000000000"),
      ethers.BigNumber.from("609195000000000000000000"),
      ethers.BigNumber.from("598412000000000000000000"),
      ethers.BigNumber.from("591573000000000000000000"),
      ethers.BigNumber.from("587431000000000000000000"),
      ethers.BigNumber.from("542785000000000000000000"),
      ethers.BigNumber.from("536754000000000000000000"),
      ethers.BigNumber.from("518240000000000000000000"),
      ethers.BigNumber.from("511920000000000000000000"),
      ethers.BigNumber.from("452870000000000000000000"),
    ],
    ethers.BigNumber.from("100000000000000000000000000")
  );
  // Print Deployment contract addresses.
  console.log("Gauges Contract  Address: " + gauges.address);
  console.log("Token Contract Address: " + token.address);
  console.log("Bribes Contract Address: " + bribes.address);
  console.log("Voter Contract Address: " + voter.address);
  console.log("Ve Contract Address: " + ve.address);
  console.log("Ve_dist Contract Address: " + ve_dist.address);
  console.log("Minter Contract Address: " + minter.address);
  console.log("Core Contract Address: " + core.address);
  console.log("Factory Contract Address: " + factory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
