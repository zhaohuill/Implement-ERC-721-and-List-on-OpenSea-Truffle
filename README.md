# Implement ERC-721 and List on OpenSea

Hello. Thank you for being here. This repository belongs to the youtube video series [NTF with no clue](https://www.youtube.com/watch?v=GAFh2Z5VtgM&list=PLuZkwckxno0o7_GZoOBp2gnX5DfakVcxy).
If you haven't seen it, please consider watching the videos, to get a better understanding of this code.


<p align="center">
  <a href="https://www.youtube.com/watch?v=GAFh2Z5VtgM&list=PLuZkwckxno0o7_GZoOBp2gnX5DfakVcxy" target="_blank">
    <img src="http://i3.ytimg.com/vi/GAFh2Z5VtgM/hqdefault.jpg" alt="NFT with no clue DAY 1">
  </a>
</p>

+-Users can Connect their Wallets and Mint N.F.T.s giving a Date and a Title by Paying a Fee and the List it on OpenSea.

## +-For Testing the Successful S.C. DEMO Deployed in the Ropsten Ethereum TestNet:\_
Smart Contract deployed with the account: ------------------
https://ropsten.etherscan.io/address/------------------

+-You can get Ropsten Test Ether Here:\_
https://faucet.dimensions.network

***Task:_ Check the File "./app/index.js" just in case.***

## +-Quick Project start:\_

+-(1)-The first things you need to do are cloning this repository and installing its
dependencies:

```sh
npm install
```

+-(2)-Connect Ganache(The Truffle Suite Local Testing Node) with Metamask and create a Test Account:_
https://www.linkedin.com/pulse/using-ganache-ethereum-emulator-metamask-farhan-khan/
, and then in a Terminal let's Compile, Deploy in a Local Node and Test your Project with Truffle:\_
+-IMPORTANT NOTE:_ While trying to Compile the Smart Contracts with Truffle, you will probably have issues related to the Solidity Version of the OpenZeppelin Library Smart Contracts; so after Installing them you will have to go the Library Smart Contract Files and change their Solidity Versions to the one used by "truffle-config.js" manually.

https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations

```sh
truffle compile
truffle migrate --reset
truffle test
```

## +-Deploying the Project to the Ropsten TestNet:_

+-(3)-Copy and Paste the File ".env.example" inside the same Root Folder(You will Duplicate It) and then rename it removing the part of ".example" so that it looks like ".env" and then fill all the Data Needed Inside the File. In the part of "ALCHEMY_API_KEY" just write the KEY, not the whole URL. Do the same with the ".env.example" Files inside "./app" and "./app/client". Both the Express.js Back-End and React.js Front-End can be Deployed using Amazon Lightsail.

+-(4)-Deploy the Smart Contract to the Ropsten Ethereum Test Network(https://www.trufflesuite.com/guides/deploying-to-the-live-network):\_

```sh
truffle migrate --network=ropsten
```

## +-Deploying the Project to the Ethereum MainNet:_

+-(5)-Deploy the Smart Contract to the Ethereum Main Network(https://www.trufflesuite.com/guides/deploying-to-the-live-network):\_

```sh
truffle migrate --network=mainnet
```
