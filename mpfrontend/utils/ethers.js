import { ABI } from "./abi"
import { ethers } from "ethers"

const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const abi = ABI;
const provider = new ethers.providers.Web3Provider(window.ethereum)

const contract = new ethers.Contract(address, abi, provider)
export { contract };