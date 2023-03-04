## Matching Pennies Smart Contract

Matching Pennies is a two-player zero-sum game where each player chooses either heads or tails, and if the choices match, one player wins, otherwise, the other player wins. This simple game has interesting applications in game theory, especially in the study of mixed strategies. In a Nash equilibrium, each player chooses a mixed strategy such that neither player can improve their expected payoff by unilaterally changing their strategy. In Matching Pennies, there is no pure strategy Nash equilibrium, but there exists a mixed strategy Nash equilibrium where each player chooses each option with a probability of 0.5. 

To address the issue of simultanous actions in a smart contracts, I implemented a commit-reveal scheme where player 1 inputs a hashed value of thieir choice which is checked when the game starts. This approach ensures that participants cannot change their actions after seeing the actions of others, thereby preventing any unfair advantages and ensuring the fairness and security of the smart contract.

#### Built With

Solidity 0.8.9
JavaScript (ethers.js)
HardHat

#### Getting Started

To run this smart contract, you can compile it in Remix or use the HardHat test network.    

