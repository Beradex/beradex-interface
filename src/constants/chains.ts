export enum ChainId {
  MAINNET = 42161, // Arbi Mainnet
  TESTNET = 421613, // Arbitrum Testnet
  RINKEBY = 4,
  HARDHAT = 31337,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://arb1.arbitrum.io/rpc`, // Arbi Mainnet
  [ChainId.TESTNET]: `https://endpoints.omniatech.io/v1/arbitrum/goerli/public`,
  // From Metamask
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [ChainId.HARDHAT]: `http://127.0.0.1:8545/`, // hardhat local
}
