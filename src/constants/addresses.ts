import { ChainId } from 'constants/chains'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { MAINNET, TESTNET, HARDHAT } from './periphery'

// Actively Deployed by us

export const V2_FATORY_ADDRESS = {
  // Unit Tests
  [1]: '0xBB86C1332f54afb6509CB599BF88980f7b389403',
  [ChainId.MAINNET]: MAINNET.factory,
  [ChainId.TESTNET]: TESTNET.factory,
  [ChainId.RINKEBY]: '0xcF5ef8d007a616066e5eaEa0916592374a0F478D',
  [ChainId.HARDHAT]: HARDHAT.factory,
}
export const MULTICALL2_ADDRESSES = {
  [ChainId.MAINNET]: MAINNET.multicall2,
  [ChainId.TESTNET]: TESTNET.multicall2,
  [ChainId.RINKEBY]: '0xb65823dAdB4EA34C4779F937339C34B6775Ed4E1',
  [ChainId.HARDHAT]: HARDHAT.multicall2,
}

export const V2_ROUTER_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.router,
  [ChainId.TESTNET]: TESTNET.router,
  [ChainId.RINKEBY]: '0x638771E1eE3c85242D811e9eEd89C71A4F8F4F73',
  [ChainId.HARDHAT]: HARDHAT.router,
}

export const MINICHEF_V2_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.minichef,
  [ChainId.TESTNET]: TESTNET.miniChef,
  [ChainId.RINKEBY]: '0xFCd2Ce20ef8ed3D43Ab4f8C2dA13bbF1C6d9512F',
  [ChainId.HARDHAT]: HARDHAT.miniChef,
}

export const AIRDROP_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.airdrop,
  [ChainId.TESTNET]: TESTNET.airdrop,
  [ChainId.RINKEBY]: '',
}

export const BERADEX_STAKING_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.xbrdx,
  [ChainId.TESTNET]: TESTNET.xbrdx,
  [ChainId.RINKEBY]: '0x9AC19677BD6B1a3ba046C33f4D2f1952cA0e9a13',
  [ChainId.HARDHAT]: HARDHAT.xbrdx,
}

// Used but ultimately not ours
export const WETH9_ADDRESS = {
  [ChainId.MAINNET]: MAINNET.weth,
  [ChainId.TESTNET]: TESTNET.weth9,
  [ChainId.RINKEBY]: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  [ChainId.HARDHAT]: HARDHAT.weth9,
}

/**
 * ------------------------------------------------------------------------------------
 * @TODO: cleanup
 */

export const GOVERNANCE_ADDRESS = constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F')
export const TIMELOCK_ADDRESS = constructSameAddressMap('0x59dbebc2956B337BcDb196FC3A2b4a4d290b1538')
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES = constructSameAddressMap('@TODO:CHANGEME1234567890')
export const QUOTER_ADDRESSES = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6')
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88'
)
export const ENS_REGISTRAR_ADDRESSES = {
  [ChainId.MAINNET]: '0xae9Da235A2276CAa3f6484ad8F0EFbF4e0d45246',
  [ChainId.TESTNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES = {
  [ChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564')
export const V3_MIGRATOR_ADDRESSES = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34')
