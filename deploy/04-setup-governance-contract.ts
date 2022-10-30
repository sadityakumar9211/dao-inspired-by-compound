import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
// @ts-ignore
import { ethers } from 'hardhat'
import { ADDRESS_ZERO } from '../helper-hardhat-config'

const setupContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deployer } = await getNamedAccounts()
  const { deploy, log, get } = deployments

  const timeLock = await ethers.getContract('TimeLock', deployer)
  const governor = await ethers.getContract('GovernorContract', deployer)

  log('Setting up the roles...')
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, governor.address)
  await proposerTx.wait(1)

  const executorTx = await timeLock.grantRole(proposerRole, ADDRESS_ZERO)
  await executorTx.wait(1)

  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(1)
}

export default setupContracts
