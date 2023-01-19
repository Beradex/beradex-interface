require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.7.5',
  networks: {
    hardhat: {
      forking: {
        url: 'https://eth-mainnet.g.alchemy.com/v2/hGD6KnBpSpDDPm82rkOB6PCS6SGlB6ZZ',
      },
    },
  },
}
