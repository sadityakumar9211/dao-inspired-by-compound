import { readFileSync } from "fs"
import { PROPOSALS_FILE } from "../helper-hardhat-config"

const index = 0
async function main(proposalIndex: number) {
    const proposals = JSON.parse(readFileSync(PROPOSALS_FILE, {encoding: "utf-8"}))
    const proposalId = proposals[network.config.chainId][]

}

main(index)
  .then(() => {
    process.exitCode = 0
  })
  .catch((e) => {
    process.exitCode = 1
  })
