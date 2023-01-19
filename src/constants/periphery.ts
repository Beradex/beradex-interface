/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0x1A3f1c69fA4c6d4233E1DdC65017821318166DAe', //beraDEX: Change this Factory
  weth9: '0x197b2e6678b32CeA414F6b08Dd764a6612292fE5',
  router: '0xb98CCc814BD0BB71b0D8cda0871fcBaea9EA5bCE', //beraDEX: Change this Router
  testUSDC: '0x541847ACd3a2195Ce4281779dAAA98a19FB4bB97',
  testBRDX: '0x9F069457fBf2145a43507358DD6640E32B4E1A21',
  //mockATOM: '0x9832169B33DC5777D3d28572f35E0a537Ff7A04C',
  //mockOSMOSIS: '0x1dccd8025688e39C72f2539C6f00d77bd6678425',
  multicall2: '0xaDB1D8D9c49493d3CE25C11A0BD24f4eb28727b1',
  //LHS: '0x7c21d6A51d6f591A95470f1F262C9c804c4CEAc3',
  //RHS: '0xD3607915d934576EcdC389E7DBc641097fd5A0dE',
  testerAddress: '0x1A3f1c69fA4c6d4233E1DdC65017821318166DAe', //dev
  //rewardToken: '0x7e806D59528F6Fa7CCcAdb4821Dd42551113DEFc',
  //secondaryRewardToken: '0x9AC19677BD6B1a3ba046C33f4D2f1952cA0e9a13',
  miniChef: '0x3883B36b3f0F8AeE7485a23990C876c9c87aDC0a',
  //complexRewarderTime: '0x2916d2e0B675e6993250f2DB9764Cd7fD5379C04',
  diffusion: '0x7a721f5330f0d3079EbDf77da01771cEf9B97ae7',
}

const MAINNET_PERIPHERY = {
  factory: '0x4ff1f64683785E0460c24A4EF78D582C2488704f', //beraDEX: Change this Factory
  weth: '0xaB837301d12cDc4b97f1E910FC56C9179894d9cf', //beraDEX: Change this to empty
  router: '0x0F527785e39B22911946feDf580d87a4E00465f0', //beraDEX: Change this Router
  multicall2: '0x1D3EDBa836caB11C26A186873abf0fFeB8bbaE63',
  minichef: '0x067eC87844fBD73eDa4a1059F30039584586e09d', //beraDEX: Change this MiniChef
  //diffusion: '0x3f75ceabCDfed1aCa03257Dc6Bdc0408E2b4b026',
}

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  diffusionbar: '0x75aeE82a16BD1fB98b11879af93AB7CE055f66Da',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x2314D451a1A2519501119f105dd1D65D0CE4E93b',
}
