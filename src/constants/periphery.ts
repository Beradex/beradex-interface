/**
 *
 * https://github.com/diffusion-fi/v2-periphery/blob/main/scripts/config/config.ts
 *
 * When changing this also update: cypress/integration/contracts.ts
 *
 */

const PERIPHERY_TESTNET = {
  factory: '0x6985EaB514E41C767d78CF72CD588bB168c6CD46', // FACTORY
  weth9: '0x7F5bc2250ea57d8ca932898297b1FF9aE1a04999',
  router: '0x477030DAbDfA9322730498af2e82D10296F85B0E', // ROUTER
  testUSDC: '0x3585fF983766Efa4Cfc8dE3F802d9ED82B636F91',
  multicall2: '0x2d4aCBa8010E884c8D44D0393eEea436CE0E5a22',

  // testBRDX: '0x541847ACd3a2195Ce4281779dAAA98a19FB4bB97',
  //mockATOM: '0x9832169B33DC5777D3d28572f35E0a537Ff7A04C',
  //mockOSMOSIS: '0x1dccd8025688e39C72f2539C6f00d77bd6678425',
  //LHS: '0x7c21d6A51d6f591A95470f1F262C9c804c4CEAc3',
  //RHS: '0xD3607915d934576EcdC389E7DBc641097fd5A0dE',
  //testerAddress: '0x1A3f1c69fA4c6d4233E1DdC65017821318166DAe', //dev
  rewardToken: '0xc53D9222FB755b31eDaaFa41a1f9d510DDb4D1EC',
  //secondaryRewardToken: '0x9AC19677BD6B1a3ba046C33f4D2f1952cA0e9a13',

  // Deploy Altogether:
  miniChef: '0x4E3D6c587E5fdC12E54a8AE40B28Efbdc4370698',
  complexRewarderTime: '0xF05E0Bc8D10e5DF36C648F95856f004dC0076495',
  diffusion: '0xc53D9222FB755b31eDaaFa41a1f9d510DDb4D1EC',
}

const MAINNET_PERIPHERY = {
  factory: '0x4ff1f64683785E0460c24A4EF78D582C2488704f', //beraDEX: Change this Factory
  weth: '0xaB837301d12cDc4b97f1E910FC56C9179894d9cf', //beraDEX: Change this WETH
  router: '0x0F527785e39B22911946feDf580d87a4E00465f0', //beraDEX: Change this Router
  multicall2: '0x1D3EDBa836caB11C26A186873abf0fFeB8bbaE63',
  minichef: '0x067eC87844fBD73eDa4a1059F30039584586e09d', //beraDEX: Change this MiniChef
  diffusion: '',
}

const PERIPHERY_HARDHAT = {
  factory: '0x152A9F4Af02c50281929BB08faff09077AD0aFc7', // FACTORY
  weth9: '0x197b2e6678b32CeA414F6b08Dd764a6612292fE5',
  router: '0xb765f85A5DDd3936b090f408A81DFd425a08EF8F', // ROUTER
  testUSDC: '0x541847ACd3a2195Ce4281779dAAA98a19FB4bB97',
  testBRDX: '',
  multicall2: '0xaDB1D8D9c49493d3CE25C11A0BD24f4eb28727b1',
  rewardToken: '0x7e806D59528F6Fa7CCcAdb4821Dd42551113DEFc',
  miniChef: '0x24254eCC88a0561e34b5e54fC2269ECaC15D28B0',
  complexRewarderTime: '0x0e0bBAEED483476729cA35F9Ab900c71b5C0Ee5f',
  diffusion: '',
}

export const MAINNET = {
  ...MAINNET_PERIPHERY,
  diffusionbar: '0x75aeE82a16BD1fB98b11879af93AB7CE055f66Da',
  airdrop: '0xb9A52744213eA63D57F389622e1d569Bb4705207',
}

export const TESTNET = {
  ...PERIPHERY_TESTNET,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x08caBAd8A0eCd6e69b518bf6A5B1035313B08B2B', // xbrdx
}

export const HARDHAT = {
  ...PERIPHERY_HARDHAT,
  airdrop: '0x2F7Ad6172388aED2017FBfA1631724F172360Ab1',
  diffusionbar: '0x96773D01bc92169BEaeE1aCa5B6DA47b02366A94', // xbrdx
}
