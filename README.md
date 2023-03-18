# Matching Pennies

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Matching Pennies is a two-player zero-sum game where each player chooses either heads or tails, and if the choices match, one player wins, otherwise, the other player wins. This simple game has interesting applications in game theory, especially in the study of mixed strategies. In a Nash equilibrium, each player chooses a mixed strategy such that neither player can improve their expected payoff by unilaterally changing their strategy. In Matching Pennies, there is no pure strategy Nash equilibrium, but there exists a mixed strategy Nash equilibrium where each player chooses each option with a probability of 0.5. 

To address the issue of simultanous actions in a smart contracts, I implemented a commit-reveal scheme where player 1 inputs a hashed value of thieir choice which is checked when the game starts. This approach ensures that participants cannot change their actions after seeing the actions of others, thereby preventing any unfair advantages and ensuring the fairness and security of the smart contract.

## Getting started

### Prerequisites
 - [Node.js](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 - [Hardhat](https://hardhat.org/)
 - [Metamask](https://metamask.io/)

### Installation
To install the necessary dependancies, run 
 - `npm install`

To start the hardhat node, run
 - `npx hardhat node`

Connecting your Metamask to the hardhat node
1. Open Metamask and click on the network dropdown in the top left corner.
2. Select "Custom RPC".
3. In the "New RPC URL" field, enter http://localhost:8545.
4. Click "Save".
5. Import multiple accounts using the private key

Deploy the smart contract
1. Run `npx hardhat run scripts/deploys.js --network localhost`
2. Change the address in `index.js`

Run the frontend through `npm run dev`
#### Getting Started  

