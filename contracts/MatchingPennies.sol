// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Matching Pennies
 * @dev Implements a simple Matching Pennies game with two players.
 * @author Ishan Dhanani
 */
contract MatchingPennies {
    //everything needed for 1 instance of the game
    //does order in a struct matter? 
    struct Game {
        address p1;
        uint256 p1payment;
        address p2;
        uint256 p2payment;
        bytes32 p1commitment;
        uint8 p2choice;
        address winner;
        bool gameComplete; //default value is false
        uint256 startStamp;
    }

    //creating a mapping for each instance of the game 
    //cheaper than creating an array to store each game?
    //easier to access each game based on its #
    mapping (uint8 => Game) public gamesPlayed;
    uint8 public gameInstance;

    //events 
    event GameComplete(uint8 _gameId, address _player, string _notif);
    event GameStatus(uint8 _gameId, address _player, string _notif);

    /**
     * @dev Creates a new game with the given p1commitment as the player one's commitment
     * @param p1commitment A hashed value of the player one's choice for the game
     * @notice Player1's hash input must start with a 0 or 1. For example, 1garay or 0blahblah are valid inputs
     * @notice Use https://emn178.github.io/online-tools/keccak_256.html online to hash
    */
    function createGame(bytes32 p1commitment) public payable {
        ++gameInstance;
        //uint8 gameId = gameInstance;
        gamesPlayed[gameInstance].p1 = msg.sender;
        require(msg.value == 10 wei, "You need to deposit 10 WEI in the pot");
        gamesPlayed[gameInstance].p1payment = msg.value;
        gamesPlayed[gameInstance].p1commitment = p1commitment;
        gamesPlayed[gameInstance].startStamp = block.timestamp;
        //emit new game created
        emit GameStatus(gameInstance, msg.sender, "Player1 has started game");
    }

    /**
     * @dev Function that allows a second player to join an existing game
     * @param gameId The game ID of the game the second player wants to join
     * @param choice The choice the second player has made for the game.
     * @notice The second player must not be the same as the first player, the game must not already have two players, and the game must not be completed.
     * @notice Both players must deposit 10 wei in the pot to start the game.
     * @notice Emits a GameStatus event with the gameId and second player's address to indicate that the second player has joined the game.
    */
    function joinGame(uint8 gameId, uint8 choice) payable public {
        require(msg.sender != gamesPlayed[gameId].p1, "A different player must join the game");
        require(gamesPlayed[gameId].p2 == address(0), "Player2 has already joined. Game is full");
        require(gamesPlayed[gameId].gameComplete == false, "Game is over. Start a new game");
        gamesPlayed[gameId].p2 = msg.sender;
        require(msg.value == 10 wei, "You need to deposit 10 WEI in the pot");
        gamesPlayed[gameId].p2payment = msg.value;
        gamesPlayed[gameId].p2choice = choice;
        //emit p2 has joined gameID # and the game has begun
        emit GameStatus(gameId, msg.sender, "Player 2 has joined");
    }

    //i could create a local version of the game struct and use it for all the req
    //and then update the storage struct when i check choices
    //constantly reading state is expensive. creating local stroage allows me to edit state 
    //but not incur cost of reading state every time
    //gas?

    /**
      * @dev This function is called by Player1 after both players have made their moves.
      * It checks if Player1's vote matches the original commitment and determines the winner of the game.
      * If both values are the same, Player1 wins. Otherwise, Player2 wins.
      * @param gameId The ID of the game to play.
      * @param p1vote The vote of Player1, represented as a their input to the hash (ex. 1nonce or 083nsd8)
     */
   function playGame(uint8 gameId, string calldata p1vote) public{
        require(gamesPlayed[gameId].p2 != address(0), "Player2 must call joinGame");
        require(msg.sender == gamesPlayed[gameId].p1, "Only player1 can start the game");
        require(bytes(p1vote)[0] == "1" || bytes(p1vote)[0] == "0");
        require(keccak256(abi.encodePacked(p1vote)) == gamesPlayed[gameId].p1commitment, "Your vote does not match original commitment");
        if ((bytes(p1vote)[0] == "1" && gamesPlayed[gameId].p2choice == 1) || (bytes(p1vote)[0] == "0" && gamesPlayed[gameId].p2choice == 0)){
            gamesPlayed[gameId].winner = msg.sender; //or currentGame.p1 depending on gas
            emit GameStatus(gameId, gamesPlayed[gameId].winner, "The game has ended. Player1 can now withdraw their winnings");
        }
        else{
            gamesPlayed[gameId].winner = gamesPlayed[gameId].p2;
            emit GameStatus(gameId, gamesPlayed[gameId].winner, "The game has ended. Player2 can now withdraw their winnings");
        }
   }

    /**
      * @dev This function lets the winner withdraw their winnings. It can only be called after `playGame`
      * @param gameId The ID of the game to that was played.
     */
   function withdrawWinnings(uint8 gameId) public payable{
       require(msg.sender == gamesPlayed[gameId].winner, "Only the winner can withdraw funds");
       require(gamesPlayed[gameId].gameComplete == false, "This game is over and funds have been withdrawn");
       payable(gamesPlayed[gameId].winner).transfer(gamesPlayed[gameId].p1payment +  gamesPlayed[gameId].p2payment);
       gamesPlayed[gameId].gameComplete = true;
       emit GameComplete(gameId, gamesPlayed[gameId].winner, "Winnings have been withdrawn");
   }
   
   /**
      * @dev This function lets either player1 or player2 withdraw their stake if the game has not started
      * Player1 can only withdraw their stake after 30 seconds and if Player2 has not joined
      * Player2 can only withdraw thier stake if Player1 has not called `playGame`
      * @param gameId The ID of the game to that was played.
      * @notice If either player withdraws their stake, the game is set to complete and a new game must be started
     */
   function withdrawStake(uint8 gameId) public payable{
       //Game storage game = gamesPlayed[gameId];
       require(gamesPlayed[gameId].p1 != address(0), "No one is playing this game. Nothing to withdraw");
       if (msg.sender == gamesPlayed[gameId].p1 && gamesPlayed[gameId].p2 == address(0)){
           require(block.timestamp > gamesPlayed[gameId].startStamp + 30 seconds, "You must wait for 30 before you can withdraw your stake");
           payable(msg.sender).transfer(gamesPlayed[gameId].p1payment);
           gamesPlayed[gameId].gameComplete = true;
           emit GameStatus(gameId, msg.sender, "Player 2 has not joined within 30 seconds and Player 1 has removed their stake. This game has been voided");
       }
       else if (msg.sender == gamesPlayed[gameId].p2){
        require(gamesPlayed[gameId].gameComplete == false, "Game is complete. Your stake cannot be withdrawn. The winner may claim winnings");
        require(gamesPlayed[gameId].winner == address(0), "The game has been played and a winner has been selected. You cannot remove your stake. If you are the winner, you can remove your winnings");
        payable(msg.sender).transfer(gamesPlayed[gameId].p2payment);
        gamesPlayed[gameId].gameComplete = true;
        emit GameStatus(gameId, msg.sender, "Player 2 has removed their stake from the game. Player1 may remove their stake");
       }
   }
}
