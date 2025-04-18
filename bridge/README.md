# bizboa-bridge-contracts
Contract of BizBOA Bridge

## Deploy and Setup
1. Deploy contracts on Poonet and Magrigold
```
yarn deploy:localnet
yarn deploy:marigold-localnet
```
2. Approve
```
yarn approve:localnet
yarn approve:marigold-localnet
```

3. Set the Admin to Manager role to BOA_COIN_BRIDGE on tigger-bridge-contracts Poonet
```
yarn setManager:localnet
```

4. Add liquidity to BOA_COIN_BRIDGE on tigger-bridge-contracts Poonet
```
yarn addLiquid:localnet
```

4. Change time lock to BOA_COIN_BRIDGE on tigger-bridge-contracts Poonet
```
yarn changeTimelock:localnet
```

## Contracts
#### BOACoinBridge.sol
- Should be deployed on Poohnet
- Used for bridging between POO coin and other tokens
#### BOATokenBridge.sol
- Should be deployed on Marigold test network
- Used for bridging between PooToken and other tokens
#### TokenBridge.sol
- Can be deployed on any chain network
- Used for bridging between ERC tokens