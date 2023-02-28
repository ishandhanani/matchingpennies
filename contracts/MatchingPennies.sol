// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

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

    //Player1 will the person who creates the game
    //does this need to be public?
    function createGame(bytes32 p1commitment) public payable returns(uint8){
        ++gameInstance;
        //uint8 gameId = gameInstance;
        gamesPlayed[gameInstance].p1 = msg.sender;
        require(msg.value == 10 wei, "You need to deposit 10 WEI in the pot");
        gamesPlayed[gameInstance].p1payment = msg.value;
        gamesPlayed[gameInstance].p1commitment = p1commitment;
        gamesPlayed[gameInstance].startStamp = block.timestamp; //p2 must join within 10 minutes
        //emit new game created
        emit GameStatus(gameInstance, msg.sender, "Player1 has started game");
        return gameInstance; //return gameId
    }

    //Joining game - this is Player2
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
   function playGame(uint8 gameId, string calldata p1vote) public{
        require(gamesPlayed[gameId].p2 != address(0), "Player2 must call joinGame");
        require(msg.sender == gamesPlayed[gameId].p1, "Only player1 can start the game");
        require(bytes(p1vote)[0] == "1" || bytes(p1vote)[0] == "0");
        require(keccak256(abi.encodePacked(p1vote)) == gamesPlayed[gameId].p1commitment, "Your vote does not match original commitment");
        if (bytes(p1vote)[0] == "1" && gamesPlayed[gameId].p2choice == 1){
            gamesPlayed[gameId].winner = msg.sender; //or currentGame.p1 depending on gas
            emit GameStatus(gameId, gamesPlayed[gameId].winner, "The game has ended. Player1 can now withdraw their winnings");
        }
        else{
            gamesPlayed[gameId].winner = gamesPlayed[gameId].p2;
            emit GameStatus(gameId, gamesPlayed[gameId].winner, "The game has ended. Player2 can now withdraw their winnings");
        }
   }

   function withdrawWinnings(uint8 gameId) public payable{
       require(msg.sender == gamesPlayed[gameId].winner, "Only the winner can withdraw funds");
       require(gamesPlayed[gameId].gameComplete == false, "This game is over and funds have been withdrawn");
       payable(gamesPlayed[gameId].winner).transfer(gamesPlayed[gameId].p1payment +  gamesPlayed[gameId].p2payment);
       gamesPlayed[gameId].gameComplete = true;
       emit GameComplete(gameId, gamesPlayed[gameId].winner, "Winnings have been withdrawn");
   }
   //add logic for player 2 to remove
   function withdrawStake(uint8 gameId) public{
       Game storage game = gamesPlayed[gameId];
       require(game.p1 != address(0), "No one is playing this game. Nothing to withdraw");
       if (msg.sender == game.p1 && game.p2 == address(0)){
           require(block.timestamp > game.startStamp + 30 seconds, "You must wait for 30 before you can withdraw your stake");
           payable(msg.sender).transfer(game.p1payment);
           game.gameComplete = true;
           emit GameStatus(gameId, msg.sender, "Player 2 has not joined within 30 seconds and Player 1 has removed their stake. This game has been voided");
       }
   }
}
