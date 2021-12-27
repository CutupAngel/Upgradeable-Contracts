# Smart Contracts Test Project

Build the smart contracts to calculate the average token price

## Pre requirements
[HardHat](https://hardhat.org/)
[Openzepplin](https://openzeppelin.com/)

## Build & Test
```shell
git clone https://github.com/CutupAngel/SC-Test.git
cd SC-Test
npm install
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).
