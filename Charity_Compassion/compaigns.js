// İlerleme miktarını değiştirmek için:
function setProgress(progressElementId,progressPercentage) {
    var progressElement = document.getElementById(progressElementId +'-progress');
    var dashOffset = 100 - progressPercentage;
    progressElement.style.strokeDashoffset = dashOffset;
   
}
//veri çekme işlemi bu noktada gerşekleşecek
//targetDonation=100;
//currentDonation=80;
function updateProgress(targetDonation ,currentDonation,progressElementId){
    
    var percentage=(currentDonation/targetDonation)*100;

    if (percentage < 0) {
        percentage = 0;
    } else if (percentage > 100) {
        percentage = 100;
    }

    setProgress(progressElementId,percentage);

    document.getElementById(progressElementId+'-progress-text').textContent = percentage.toFixed(2) + '%';
    document.getElementById(progressElementId+'-goalAndRaised').textContent=currentDonation+' raised of '+targetDonation+' goal';
}
//updateProgress(targetDonation,currentDonation,progressElementId); example of usage


function redirectToComp1() {
    window.location.href = "comp1.html"; // comp1.html sayfasına yönlendir
}

function redirectToComp2() {
    window.location.href = "comp2.html"; // comp2.html sayfasına yönlendir
}

function redirectToComp3() {
    window.location.href = "comp3.html"; // comp3.html sayfasına yönlendir
}

function redirectToComp4() {
    window.location.href = "comp4.html"; // comp4.html sayfasına yönlendir
}

function redirectToView() {
    window.location.href = "view.html"; // view.html sayfasına yönlendir
}

function redirectToCompaigns() {
    window.location.href = "compaigns.html"; // view.html sayfasına yönlendir
}