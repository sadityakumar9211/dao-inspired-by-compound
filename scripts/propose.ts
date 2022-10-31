// @ts-ignore
import { readFileSync, writeFileSync } from 'fs'
// @ts-ignore
import { ethers, network } from 'hardhat'
import {
  NEW_PRESIDENT_INFO,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  PROPOSALS_FILE,
} from '../helper-hardhat-config'
import { moveBlocks } from '../utils/move-blocks'

export async function propose(
  args: any[],
  functionToCall: string,
  proposalDescription: string
) {
  const governor = await ethers.getContract('GovernorContract')
  const changePresident = await ethers.getContract('ChangePresident')
  const encodedFunctionCall = changePresident.interface.encodeFunctionData(
    functionToCall,
    args
  )
  console.log(
    `Proposing ${functionToCall} on ${
      changePresident.address
    } with \n${JSON.stringify(args)}`
  )
  console.log(`Proposal Description: \n ${proposalDescription}`)

  const proposeTx = await governor.propose(
    [changePresident.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  )
  const proposeReceipt = await proposeTx.wait(1)

  if (developmentChains.includes(network.name)) {
    moveBlocks(VOTING_DELAY + 1)
  }

  console.log('Proposal Proposed...')
  const proposalId = proposeReceipt.events[0].args.proposalId
  let proposals = JSON.parse(readFileSync(PROPOSALS_FILE, { encoding: 'utf-8' }))
  if (!proposals[network.config.chainId!.toString()]) {
    proposals[network.config.chainId!.toString()] = [proposalId.toString()]
  } else {
    proposals[network.config.chainId!.toString()].push(proposalId.toString())
  }
  writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals))
}

propose([NEW_PRESIDENT_INFO], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => (process.exitCode = 0))
  .catch((e) => {
    console.log(e)
    process.exitCode = 1
  })
