import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { networkConfig, developmentChains } from '../helper-hardhat-config'
import verify from '../utils/verify'
// @ts-ignore
import { ethers } from 'hardhat'

const deployChangePresident: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log('Deploying Change President Contract...')
  const changePresident = await deploy('ChangePresident', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  console.log('Transfering the ownership of ChangePresident to to timeLock')
  //transferring the ownership of our ChangePresident contract to TimeLock
  const timeLock = await ethers.getContract('TimeLock')
  const changePresidentContract = await ethers.getContractAt(
    'ChangePresident',
    changePresident.address
  )
  const transferOwnerTx = await changePresidentContract.transferOwnership(
    timeLock.address
  )
  await transferOwnerTx.wait(1)
  console.log('You Dun it!!')
}

export default deployChangePresident
