document.addEventListener("DOMContentLoaded", function() {
    let timerDisplay = document.getElementById("tpsDisplay");
    let button = document.getElementById("buttonStart");
    let tpsTravail = 1500; //25min
    let tpsPause = 300; //5min
    let etatTravailOuPause = "Travail";
    let timerActif = false;

    let minutes;
    let secondes;

    function diminuerTps() {
        minutes = parseInt(tpsTravail / 60);
        secondes = parseInt(tpsTravail % 60);
        
        
        if (minutes < 10) {
            minutes = "0" + minutes;
        };
        if (secondes < 10) {
            secondes = "0" + secondes;
        };
        tpsTravail--;
        
        timerDisplay.innerHTML = `${minutes} : ${secondes}`;
    }


    button.addEventListener("click", function() {
        
        if (timerActif) {
            location.reload();
        } else {
            button.innerHTML = `<i class="fa-regular fa-circle-stop"></i><br>Reset !`;
        }

        setInterval(diminuerTps, 1000);

        timerActif = true;
    });
});
