// SPDX-License-Identifier: MIT
pragma solidity 0.7.4;

contract Donation {
    address public owner; // Akıllı kontrat sahibinin adresi
    address public sepoliaWallet = 0xE595FfB62521c54cD7d80dB98352a5aAfBA79aEE; // Sepolia cüzdanı
    address public sepoliaWallet1 = 0xCf5739410C28376BB698B911b2E654c00516cBbf;
    address public sepoliaWallet2 = 0x39F3713e6FDe02C4B8aD49772c2eB6e3cD3001A9;
    address public sepoliaWallet3 = 0x416cacAa5F9D98Dd0321ba5Bd21a89d648Ae0c2b;
    address public sepoliaWallet4 = 0x1AdaAaAb2bc1eC22e6b6d87d19EA998903A9E9a3;
    address public sepoliaWallet5 = 0x850C448d7DB1BA62B62b711b9fB76D9116e07279;
    uint256 public donationAmount = 0.000001 * 10**18; // 0.01 SepoliaEther (Sepolia'nın alt birimi olarak)
    uint256 totalDonationsAmount=0;

    event DonationReceived(address indexed donor, uint256 amount);

    // Kurucu fonksiyon, akıllı kontrat sahibini belirler
    constructor() {
        owner = msg.sender;
    }

    // Bağış yapma fonksiyonu
    function donate() external payable {
        require(msg.value == donationAmount, "Invalid donation amount");
        
        (bool sent, ) = sepoliaWallet.call{value: msg.value}("");
        require(sent, "Failed to send donation");
        totalDonationsAmount += donationAmount;
        emit DonationReceived(msg.sender, msg.value);
    }

    // Akıllı kontrattaki toplam bağış miktarını gösteren fonksiyon
    function totalDonations() external view returns (uint256) {
        return address(this).balance;
    }

    // Akıllı kontrattan ETH çekme fonksiyonu (sadece sahip tarafından kullanılabilir)
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        
        payable(owner).transfer(address(this).balance);
    }

    function getTotalDonationsAmount() public view returns (uint256) {
        return totalDonationsAmount;
    }
}

