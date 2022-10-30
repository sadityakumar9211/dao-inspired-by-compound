import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { networkConfig, developmentChains } from '../helper-hardhat-config'
import verify from '../utils/verify'
import { MIN_DELAY } from '../helper-hardhat-config'

const deployTimeLocks: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log('----------------------------------------')
  log('Deploying Time Lock........')
  const timeLock = await deploy('TimeLock', {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(timeLock.address, [])
  }

  log(`Deployed Governance token at address ${timeLock.address}`)
}

export default deployTimeLocks
