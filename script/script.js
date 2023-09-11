let timerDisplay = document.getElementById("cercle");
let button = document.getElementById("buttonStart");
let tpsTravail = 1500; //25min
let tpsPause = 300; //5min
let etatTravailOuPause = "Travail";
let timerActif = false;



button.addEventListener("click", function() {
    if (timerActif) {
        location.reload();
    } else {
        button.innerHTML = `<i class="fa-regular fa-circle-stop"></i><br>Reset !`;
    }
    timerDisplay.textContent = "test";


    
    timerActif = true;
})

