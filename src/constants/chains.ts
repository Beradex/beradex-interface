export enum ChainId {
  MAINNET = 9001, // BERA Mainnet
  TESTNET = 421613, // Arbitrum Testnet
  RINKEBY = 4,
  HARDHAT = 31337,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `https://eth.bd.evmos.org:8545`, // BERA Mainnet
  [ChainId.TESTNET]: `https://goerli-rollup.arbitrum.io/rpc`,
  // From Metamask
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  [ChainId.HARDHAT]: `http://127.0.0.1:8545/`, // hardhat local
}
