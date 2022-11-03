// @ts-ignore
import { ethers, network } from 'hardhat'
import {
  FUNC,
  NEW_PRESIDENT_INFO,
  PROPOSAL_DESCRIPTION,
  MIN_DELAY,
  developmentChains,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'
import { moveTime } from '../utils/move-time'

export async function queueAndExecute() {
  const args = [NEW_PRESIDENT_INFO]
  const functionToCall = FUNC
  const changePresident = await ethers.getContract('ChangePresident')
  const encodedFunctionCall = changePresident.interface.encodeFunctionData(
    functionToCall,
    args
  )
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  )
  // could also use ethers.utils.id(PROPOSAL_DESCRIPTION)

  const governor = await ethers.getContract('GovernorContract')
  console.log('Queueing...')
  const queueTx = await governor.queue(
    [changePresident.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await queueTx.wait(1)

  //waiting for users to leave after queueing the proposal
  if (developmentChains.includes(network.name)) {
    await moveTime(MIN_DELAY + 1)
    await moveBlocks(1)
  }

  console.log('Executing...')
  // this will fail on a testnet because you need to wait for the MIN_DELAY!
  const executeTx = await governor.execute(
    [changePresident.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  )
  await executeTx.wait(1)
  const newPresidentInfo = await changePresident.retrieve()
  console.log(`New President: ${JSON.stringify(newPresidentInfo)}`)
}

queueAndExecute()
  .then(() => process.exitCode = 0)
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
