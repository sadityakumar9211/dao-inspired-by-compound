import { readFileSync } from 'fs'
import { developmentChains, PROPOSALS_FILE, VOTING_PERIOD } from '../helper-hardhat-config'
// @ts-ignore
import { network, ethers } from 'hardhat'
import { moveBlocks } from '../utils/move-blocks'

const index = 0
async function main(proposalIndex: number) {
  const proposals = JSON.parse(
    readFileSync(PROPOSALS_FILE, { encoding: 'utf-8' })
  )
  const proposalId = proposals[network.config.chainId!][proposalIndex] //first proposal in the list of proposal
  // 0 against 1 = for 2 = abstain
  const voteWay = 1 //voting for for
  const governor = await ethers.getContract('GovernorContract')
  const reason = 'I like a do da cha cha'
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  )
  await voteTxResponse.wait(1)
  if(developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD+1)
  }
  console.log(`Voted! Ready to go!`)
}

main(index)
  .then(() => {
    process.exitCode = 0
  })
  .catch((e) => {
    process.exitCode = 1
  })
