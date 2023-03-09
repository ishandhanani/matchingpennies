export const ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "_gameId",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_player",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_notif",
          "type": "string"
        }
      ],
      "name": "GameComplete",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint8",
          "name": "_gameId",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "_player",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "_notif",
          "type": "string"
        }
      ],
      "name": "GameStatus",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "p1commitment",
          "type": "bytes32"
        }
      ],
      "name": "createGame",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gameInstance",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "name": "gamesPlayed",
      "outputs": [
        {
          "internalType": "address",
          "name": "p1",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "p1payment",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "p2",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "p2payment",
          "type": "uint256"
        },
        {
          "internalType": "bytes32",
          "name": "p1commitment",
          "type": "bytes32"
        },
        {
          "internalType": "uint8",
          "name": "p2choice",
          "type": "uint8"
        },
        {
          "internalType": "address",
          "name": "winner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "gameComplete",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "startStamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "gameId",
          "type": "uint8"
        },
        {
          "internalType": "uint8",
          "name": "choice",
          "type": "uint8"
        }
      ],
      "name": "joinGame",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "gameId",
          "type": "uint8"
        },
        {
          "internalType": "string",
          "name": "p1vote",
          "type": "string"
        }
      ],
      "name": "playGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "gameId",
          "type": "uint8"
        }
      ],
      "name": "withdrawStake",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint8",
          "name": "gameId",
          "type": "uint8"
        }
      ],
      "name": "withdrawWinnings",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]