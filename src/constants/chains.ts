export enum ChainId {
  MAINNET = 31337, // BERA Mainnet
  TESTNET = 9000,
  RINKEBY = 4,
}

export const NETWORK_URLS: {
  [chainId in ChainId]: string
} = {
  [ChainId.MAINNET]: `http://127.0.0.1:8545/`, // BERA Mainnet
  [ChainId.TESTNET]: `https://eth.bd.evmos.dev:8545`,
  // From Metamask
  [ChainId.RINKEBY]: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
}
