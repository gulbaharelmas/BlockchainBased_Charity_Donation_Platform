/*
//veri çekme işlemi bu noktada gerşekleşecek
targetDonation=150;
currentDonation=80;

//updateProgress(targetDonation,currentDonation,progressElementId); example of usage
updateProgress(targetDonation, currentDonation, 'c4'); //c4 için
*/


import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.0.5/dist/ethers.esm.min.js";

// Akıllı kontratın ABI'sini tanımlayın
const contractABI = [
  {"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"donor","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DonationReceived","type":"event"},{"inputs":[],"name":"donate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"donationAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalDonationsAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet1","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet3","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sepoliaWallet4","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonations","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// Akıllı kontrat adresini tanımlayın
const contractAddress = "0x1AdaAaAb2bc1eC22e6b6d87d19EA998903A9E9a3";

//const sepoliaWallet4 = "0x1AdaAaAb2bc1eC22e6b6d87d19EA998903A9E9a3";

//var donationcount=3;
var donationcount4 = parseInt(localStorage.getItem("donationcount4"))||1;
let provider;
let contract;

function updateDonationCount4(count) {
    donationcount4 = count;
    localStorage.setItem("donationcount4", count.toString());
  }
  



// Ethereum ağına bağlantı sağlayın
export async function connectWalletAndDonate() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // MetaMask is installed, request accounts
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];
        console.log(walletAddress);
  
        // Create provider using the injected window.ethereum if it doesn't exist yet
        if (!provider) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
        }
  
        // Create contract instance using provider and ABI if it doesn't exist yet
        if (!contract) {
            contract = new ethers.Contract(contractAddress, contractABI, provider);
        }
  
        // Bağış miktarını belirleyin
        const signer = provider.getSigner(); // Signer nesnesini al
        const donationAmount = ethers.utils.parseEther("0.00001"); // parseEther fonksiyonunu utils altından çağır
  
        // Bağış yapma işlemi
        const transaction = await contract.connect(signer).donate({ value: donationAmount });
        await transaction.wait(); // İşlem tamamlanana kadar bekleyin

       /*// Bağışı Sepolia cüzdanına gönderin
        await provider.getSigner().sendTransaction({
        to: sepoliaWallet4,
        value: donationAmount
        });*/

        //donationcount++;
        updateDonationCount4(donationcount4 + 1);
     
        console.log("bağiş sayisi:",donationcount4);
        console.log("Bağiş başariyla yapildi!");
        window.alert("Donation successful!"); 
      } catch (err) {
        console.error(err.message);
      }
    } else {
      // MetaMask is not installed
      console.log("Please install MetaMask");
      alert("Please install MetaMask");
    }
}


window.addEventListener("load", () => {
    // Bağış sayısını yerel depolamadan al
    const storedCount = localStorage.getItem("donationcount4");
    if (storedCount !== null) {
      donationcount4 = parseInt(storedCount);
    }
  });

  

// Bağış yapma fonksiyonunu çağırın
async function donate() {
    try {
        if (!provider) {
            console.error("Wallet not connected.");
            return;
        }

        // Bağış miktarını belirleyin
        const donationAmount = ethers.ethers.utils.parseEther("0.01");

        // Bağış yap
        const transaction = await contract.connect(provider.getSigner()).donate({ value: donationAmount });
        await transaction.wait();
        console.log("Bağiş başariyla yapildi!");
    } catch (error) {
        console.error("Bağiş yaparken bir hata oluştu:", error);
    }
}

// Bağış yapma fonksiyonunu çağırın
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("donateButton4").addEventListener("click", connectWalletAndDonate);
});


/* ******************************************************************progress bar *************************************************/

async function totalDonate(){
  var total=donationcount4*0.01;
  console.log("total:",total);
  return total;
}

setInterval(totalDonate, 600);

async function updateProgressFromBlockchain(targetDonation, progressElementId) {
  try {
    if (!provider) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
    }

    // Create contract instance using provider and ABI if it doesn't exist yet
    if (!contract) {
        contract = new ethers.Contract(contractAddress, contractABI, provider);
    }
   
     
     var currentDonation=0;
     currentDonation=await totalDonate();


      // İlerleme çubuğunu güncelle
      var percentage = (currentDonation / targetDonation) * 100;
      if (percentage < 0) {
          percentage = 0;
      } else if (percentage > 100) {
          percentage = 100;
      }
      setProgress(progressElementId, percentage);
      
      // HTML elementlerini güncelle
      document.getElementById(progressElementId + '-progress-text').textContent = percentage.toFixed(2) + '%';
      document.getElementById(progressElementId + '-goalAndRaised').textContent = currentDonation + ' raised of ' + targetDonation + ' goal';
  } catch (error) {
      console.error('Error updating progress from blockchain:', error);
  }
}
function setProgress(progressElementId,progressPercentage) {
  var progressElement = document.getElementById(progressElementId +'-progress');
  var dashOffset = 100 - progressPercentage;
  progressElement.style.strokeDashoffset = dashOffset;
 
}


setInterval(function() {
  updateProgressFromBlockchain(1, 'c4');
}, 600);
