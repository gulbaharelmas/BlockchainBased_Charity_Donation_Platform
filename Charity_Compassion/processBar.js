//const web3 = new Web3(window.ethereum);
//const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:5500/compaigns.html'));

//import Web3 from 'web3';

/*if (window.ethereum) {
  window.web3 = new Web3(ethereum);
  try {
    // Request account access if needed
    ethereum.enable();
  } catch (error) {
    // User denied account access...
  }
} else if (window.web3) {
  // Legacy dapp browsers...
  window.web3 = new Web3(web3.currentProvider);
} else {
  // Non-dapp browsers...
  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
}

export default web3; */


import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.0.5/dist/ethers.esm.min.js";

const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"donor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DonationReceived","type":"event"},{"inputs":[],"name":"donate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"donationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";


let provider;
let contract;

//const contract = new web3.eth.Contract(abi, contractAddress);



/*async function fetchDonationData() {
    // Call smart contract methods to retrieve data
    const targetDonation = 200; //await contract.methods.getTargetDonation().call();;
    const currentDonation =await contract.methods.totalDonations().call();

    return { targetDonation, currentDonation };
}*/

/*async function updateProgressFromBlockchain(progressElementId) {
  try {
      const { targetDonation, currentDonation } = await fetchDonationData();
      updateProgress(targetDonation, currentDonation, progressElementId);
  } catch (error) {
      console.error('Error fetching data from blockchain:', error);
  }
}*/ 

/*async function fetchDonationData() {
  // Call smart contract methods to retrieve data
  const currentDonation =await contract.methods.totalDonations().call();
  console.log("kkkkkkkkkkkk");
  return currentDonation ;
}*/
async function fetchDonationData() {
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }
    
    // Create contract instance using provider and ABI if it doesn't exist yet
    if (!contract) {
        contract = new ethers.Contract(contractAddress, contractABI, provider);
    }
      const  totalDonations = await Promise.all([
        
          contract.methods.totalDonations().call()
      ]);
      return totalDonations;
  } catch (error) {
      console.error('Error fetching data from smart contract:', error);
      throw error;
  }
}

async function updateProgressFromBlockchain(targetDonation, progressElementId) {
    
      if (!provider) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
      }
      
      // Create contract instance using provider and ABI if it doesn't exist yet
      if (!contract) {
          contract = new ethers.Contract(contractAddress, contractABI, provider);
      }

        const  currentDonation  = await fetchDonationData();
        console.log("vvvvvvvvvvvvv");
        updateProgress(targetDonation, currentDonation, progressElementId);
        console.log("pppppppppppp");
    
}

updateProgressFromBlockchain(100,'c1');