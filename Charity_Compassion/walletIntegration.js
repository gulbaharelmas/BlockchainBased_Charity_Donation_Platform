async function connectWallet() {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
            // MetaMask is installed
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const walletAddress = accounts[0]; 
            console.log(walletAddress);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        // MetaMask is not installed
        console.log("Please install MetaMask");
        alert("Please install MetaMask");
    }
    console.log(window.ethereum);
};