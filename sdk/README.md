# BizBOA Swap SDK

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Actions Status](https://https://github.com/bosagora/bizboa-swap-sdk/workflows/CI/badge.svg)](https://github.com/Uniswap/uniswap-sdk)
[![npm version](https://img.shields.io/npm/v/@uniswap/sdk/latest.svg)](https://www.npmjs.com/package/@uniswap/sdk/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/@uniswap/sdk/latest.svg)](https://bundlephobia.com/result?p=@uniswap/sdk@latest)

## Changes Needed

### Address Modifications

- **BOA_TOKEN_BRIDGE:**  
  Ensure that the `BOA_TOKEN_BRIDGE` value from your `.env` file is assigned to the `bridge` property in `.src/constants.ts`.

- **TOKEN_BRIDGE:**  
  Ensure that the `TOKEN_BRIDGE` value from your `.env` file is assigned to the `tokenBridge` property in `.src/constants.ts`.

### Adding the WDEV Constant

When adding a new chain ID (for example, `MARIGOLD_LOCALNET`), make sure to include its corresponding entry in the `WDEV` constant. For instance, add the following item:

```ts
[ChainId.MARIGOLD_LOCALNET]: new Token(
  ChainId.MARIGOLD_LOCALNET,
  CONTRACT_ADDRESS_NETWORKS[ChainId.MARIGOLD_LOCALNET].WETH,
  18,
  'WETH',
  'Wrapped Ether'
),
```

## Running tests

To run the tests, follow these steps. You must have at least node v10 and [yarn](https://yarnpkg.com/) installed.

First clone the repository:

```sh
git clone https://github.com/linked0/tigger-contracts.git
```

Move into the sdk working directory

```sh
cd sdk/
```

Install dependencies

```sh
yarn install
```

Run test for .env files
```
yarn tsdx test test/env.test.ts
```

Run tests

```sh
yarn test
```

You should see output like the following:

```sh
yarn run v1.22.4
$ tsdx test
 PASS  test/constants.test.ts
 PASS  test/pair.test.ts
 PASS  test/fraction.test.ts
 PASS  test/miscellaneous.test.ts
 PASS  test/entities.test.ts
 PASS  test/trade.test.ts

Test Suites: 1 skipped, 6 passed, 6 of 7 total
Tests:       3 skipped, 82 passed, 85 total
Snapshots:   0 total
Time:        5.091s
Ran all test suites.
✨  Done in 6.61s.
```
