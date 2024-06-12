
const localStorageKey = 'donations';


let donations = {};


const storedDonations = localStorage.getItem(localStorageKey);
if (storedDonations) {
    donations = JSON.parse(storedDonations);
}


async function getTs() {
    const res = await fetch("https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x39F3713e6FDe02C4B8aD49772c2eB6e3cD3001A9&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=PU18UGWNA9JCU16JP29XKW6BBBV36RT9CK");
    return await res.json();
}

const ts = getTs();
ts.then(function printData(data) {
    const excludedWallet = "0x39F3713e6FDe02C4B8aD49772c2eB6e3cD3001A9";
    const veriListesiDiv = document.getElementById('veriListesi');
    let html = '<ul class="veriListesi">';
  
    html += `<li class="header"><span class="donator">Donör</span><span class="amount" style="margin-left: 145px;">Value</span><span class="time">Time</span></li>`;
    data.result.forEach(item => {
        if (item.value !== "0" && item.from !== excludedWallet) {
            const value = parseFloat(item.value) * 0.000000000000000001;
            const date = new Date(item.timeStamp * 1000);
            const formattedDate = date.toLocaleString();
            html += `<li><span class="donator">${item.from}</span><span class="amount">${value} ETH</span><span class="time">${formattedDate}</span></li>`;

           
            if (item.from in donations) {
                donations[item.from] += value;
            } else {
                donations[item.from] = value;
            }
        }
    });
    html += '</ul>';
    veriListesiDiv.innerHTML = html;

  
    const transactionContainer = document.querySelector('.transaction-container');
    const topDonations = Object.entries(donations)
        .filter(([wallet]) => wallet !== excludedWallet)
        .map(([wallet, value]) => ({
            wallet,
            value
        }))
        .sort((a, b) => b.value - a.value) 
        .slice(0, 10); 

    topDonations.forEach(item => {
        const transactionCard = document.createElement('div');
        transactionCard.classList.add('transaction-card');

        const transactionImage = document.createElement('div');
        transactionImage.classList.add('transaction-image');
        transactionImage.innerHTML = '<img src="images/green.png" style="width:100%; height:100%;" class="transaction-thumb" alt="">';

        const transactionInfo = document.createElement('div');
        transactionInfo.classList.add('transaction-info');
        transactionInfo.innerHTML = `<div class="transaction-wallet">${abbreviateWallet(item.wallet)}</div><p class="transaction-short-description">${item.value} ETH</p>`;
        transactionCard.appendChild(transactionImage);
        transactionCard.appendChild(transactionInfo);
        transactionContainer.appendChild(transactionCard);
    });

    
    localStorage.setItem(localStorageKey, JSON.stringify(donations));
});


async function updateData() {
    const data = await getTs();
    const excludedWallet = "0x39F3713e6FDe02C4B8aD49772c2eB6e3cD3001A9";

    
    data.result.forEach(item => {
        if (item.value !== "0" && item.from !== excludedWallet) {
            const value = parseFloat(item.value) * 0.000000000000000001;
            if (donations[item.from]) {
                donations[item.from] += value;
            } else {
                donations[item.from] = value;
            }
        }
    });
}
window.onload = function() {
    localStorage.removeItem(localStorageKey);
    updateData();
}

function abbreviateWallet(wallet) {
    return wallet.slice(0, 7) + "...." + wallet.slice(-7);
}

const productContainers = [...document.querySelectorAll('.transaction-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    });
});
