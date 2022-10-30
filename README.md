1. write the smart contract
2. write deployment script
3. write scripts to interact with the smart contract

- Note: this is not how the projects are built
> Typically you'll go back and forth between smart contracts, deploy scripts, tests, etc. 


#### Choice of Governance Token
- It is an ERC20 token (fungible token). 
Issues: 
- someone knows a hot proposal is coming up
- so they buy a ton of tokens and then dump after the vote
- so we create a snapshot of the token balances at a certain block
- so we use ERC20Votes contract from openzeppelin to create a snapshots and other functionality required by a governance token

