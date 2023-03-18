import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useContract, useContractRead, useContractWrite, useNetwork, useWaitForTransaction } from 'wagmi'
import styles from '@/styles/Home.module.css'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import mpContract from '../contracts/contract.json'

export default function Home() {
  //createGame state
  const [p1commitment, setp1commitment] = useState("");
  //joinGame state
  const [gameId, setgameId] = useState(0)
  const [choice, setchoice] = useState(0)
  //playGame state
  const [gameIdplaying, setgameIdplaying] = useState()
  const [p1vote, setp1vote] = useState("")
  //withdrawWinnings
  const [gameIdWithdraw, setgameIdWithdraw] = useState(0)

  //hardhat address
  const ADDR = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";

  //createGame
  const {
    data: createGameData,
    write: cg,
    isLoading: isCreateGameLoading,
    isSucess: isCreateGameSuccess,
    error: createGameError
  } = useContractWrite({
    address:ADDR,
    abi: mpContract.abi,
    functionName: "createGame",
    args: [p1commitment],
    overrides: {value: ethers.utils.parseUnits("10", "wei")}
  });

  useEffect(() => {
    console.log("createGameData", createGameData);
    console.log("isCreateGameLoading", isCreateGameLoading);
    console.log("isCreateGameSuccess", isCreateGameSuccess);
    console.log("createGameError", createGameError);
    console.log("-----------------------");
  }, [createGameData, isCreateGameLoading, isCreateGameSuccess]);

  //joinGame
  const {
    data: joinGameData,
    write: jg,
    isLoading: isJoinGameLoading,
    isSucess: isJoinGameSuccess,
    error: joinGameError
  } = useContractWrite({
    address:ADDR,
    abi: mpContract.abi,
    functionName: "joinGame",
    args: [gameId, choice],
    overrides: {value: ethers.utils.parseUnits("10", "wei")}
  });
  
  useEffect(() => {
    console.log("joinGameData", joinGameData);
    console.log("isJoinGameLoading", isJoinGameLoading);
    console.log("isJoinGameSuccess", isJoinGameSuccess);
    console.log("joinGameError", joinGameError);
    console.log("-----------------------");
  }, [joinGameData, isJoinGameLoading, isJoinGameSuccess]);

  //playGame
  const {
    data: playGameData,
    write: pg,
    isLoading: isplayGameLoading,
    isSucess: isplayGameSuccess,
    error: playGameError
  } = useContractWrite({
    address:ADDR,
    abi: mpContract.abi,
    functionName: "playGame",
    args: [gameIdplaying, p1vote]
  });
  
  useEffect(() => {
    console.log("playGameData", playGameData);
    console.log("isplayGameLoading", isplayGameLoading);
    console.log("isplayGameSuccess", isplayGameSuccess);
    console.log("playGameError", playGameError);
    console.log("-----------------------");
  }, [playGameData, isplayGameLoading, isplayGameSuccess]);

  //withdrawWinnings
  const {
    data: withdrawWinningsData,
    write: ww,
    isLoading: iswithdrawWinningsLoading,
    isSucess: iswithdrawWinningsSuccess,
    error: withdrawWinningsError
  } = useContractWrite({
    address:ADDR,
    abi: mpContract.abi,
    functionName: "withdrawWinnings",
    args: [gameIdWithdraw]
  });
  
  useEffect(() => {
    console.log("withdrawWinningsData", withdrawWinningsData);
    console.log("iswithdrawWinnings", iswithdrawWinningsLoading);
    console.log("iswithdrawWinningsSuccess", iswithdrawWinningsSuccess);
    console.log("withdrawWinningsError", withdrawWinningsError);
    console.log("-----------------------");
  }, [withdrawWinningsData, iswithdrawWinningsLoading, iswithdrawWinningsSuccess]);


  return (
    <div className={styles.container}>
      <div className={styles.walletConnect}>
        <ConnectButton/>
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Matching Pennies
        </h1>
        <h2 className={styles.subheading}>
          Player 1 - Input&nbsp;
          <a href="https://emn178.github.io/online-tools/keccak_256.html" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline', color: 'yellow'}}>
            Keccak256(choice, nonce)
          </a>
          &nbsp;and add a "0x" in front
        </h2>
        <form className={styles.form}>
          <input 
            className={styles.input}
            type="text"
            placeholder='Type commitment' 
            name='p1commitment' 
            onChange={(e) => setp1commitment(e.target.value)}/>
          <button className={styles.button} onClick={() => cg()}>
            Create New Game
          </button>
        </form>
        <h2 className={styles.subheading}>
          Player 2 - Input GameID and your choice (0 or 1)
        </h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder='Input Game ID' 
            name='gameId' 
            onChange={(e) => setgameId(e.target.value)}/>
          <input 
            className={styles.input}
            type="text"
            placeholder='Input your choice' 
            name='choice' 
            onChange={(e) => setchoice(e.target.value)}/>
          <button className={styles.button} onClick={() => jg()}>
            Join Existing Game
          </button>
        </form>

        <h2 className={styles.subheading}>
          Player 1 - Input GameID you started and your (choice, nonce)
        </h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder='Input Game ID' 
            name='gameIdplaying' 
            onChange={(e) => setgameIdplaying(e.target.value)}/>
          <input 
            className={styles.input}
            type="text"
            placeholder='Input original choice' 
            name='p1vote' 
            onChange={(e) => setp1vote(e.target.value)}/>
          <button className={styles.button} onClick={() => pg()}>
            Determine Winner
          </button>
        </form>
        <h2 className={styles.subheading}>
          Winner - Withdraw the pot
        </h2>
        <form className={styles.form}>
          <input 
            className={styles.input}
            type="text"
            placeholder='Input Game ID' 
            name='gameIdWithdraw' 
            onChange={(e) => setgameIdWithdraw(e.target.value)}/>
          <button className={styles.button} onClick={() => ww()}>
            Create New Game
          </button>
        </form>
      </div>
    </div>
  )
  
}
