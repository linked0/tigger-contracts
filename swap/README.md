# TiggerSwap contracts Readme
This project deploy UniSwapV2 contracts like `UniswapV2Router02` and `UniswapV2Factory`, `WETH` and `BOA` token, and tokens for testing like `A Game Token` and `B Game Token`. Also it mints `BOA` token to a user called `MINTEE_ADDRESS` for testing. Last not least, it approve also some `BOA` tokens to `Boa Token Bridge` called `GRANTEE`.

## Install
```
yarn install
```

## Deploy for Marigold(localnet)
```
yarn deploy:localnet
```
After deploying the contracts, the address printed should be written in `.env`.

If you want to verify that the contracts are correctly deployed and that liquidity has been added, you should run this script.
```
yarn get-pair:localnet
```

## Deploy
```
yarn deploy:devnet
```
After deploying the contracts, the address printed should be written in `.env`.

If you want to verify that the contracts are correctly deployed and that liquidity has been added, you should run this script.
```
yarn get-pair:devnet
```

## Mint, transfer, and approve
For testing, we mint `BOA` tokens to `MINTEE_ADDRESS` for testing. As of now, we transfers tokens instead of minting in fact.
```
yarn transfer:localnet
```
Check the balance.
```
yarn boa:localnet
```

Approve the tokens of `GRANTER_KEY` user to `GRANTEE` which is in fact `Boa Token Bridge` contract.
```
yarn allow:localnet
```
Check again balance and allowance
```
yarn boa:localnet
```
## TiggerSwap DEX Protocol 

A continuous, non-upgradable smart contract that creates an automated market maker facilitating the formation and exchange of the P2P market for BOA Coin & ERC-20 tokens on Agora BizNet.
