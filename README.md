# DAO inspired by Compound
This is the hardhat project for a DAO inspired by compound. 

#### Choice of Governance Token
- It is an ERC20 token (fungible token). 
Issues: 
- someone knows a hot proposal is coming up
- so they buy a ton of tokens and then dump after the vote
- so we create a snapshot of the token balances at a certain block
- so we use ERC20Votes contract from openzeppelin to create a snapshots and other functionality required by a governance token


### Why we use TimeLock.sol contract?
- TimeLock.sol is the contract that is the owner of the proposed contract.
- We want to wait for some time before the new vote is "executed"
- This is because if a bad proposal goes through and users who don't wanna be a part of the community, want to get out, they can get out during that time. 
