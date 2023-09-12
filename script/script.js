//TOUT METTRE EN FRANCAIS EN HTML, CSS ET JAVA
document.addEventListener("DOMContentLoaded", function() {

    //Declaration des variables
    let timerDisplay = document.getElementById("timerDisplay");
    let button = document.getElementById("buttonStart");
    let stringTravail = document.getElementById("travailText");
    let stringPause = document.getElementById("pauseText");
    
    let tpsTravail = 1500; //25min
    let tpsPause = 300; //5min
    let currentTime = tpsTravail; //25min
    
    let etatTravailOuPause = "Travail";
    let timerActif = false;

    let minutes;
    let secondes;

    function verifEtatTravailOuPause() {
        if (etatTravailOuPause == "Travail") {
            if (currentTime <= 0) {
                currentTime = tpsPause;
                etatTravailOuPause = "Pause";
            } else {
                stringTravail.style.color = "white";
                stringTravail.style.textDecoration = "underline";
                stringTravail.style.textShadow = "0px 0px 10px black";

                stringPause.style.color = "black";
                stringPause.style.textDecoration = "none";
                stringPause.style.textShadow = "none";
            }
        }
        if (etatTravailOuPause == "Pause") {
            if (currentTime <= 0) {
                currentTime = tpsTravail;
                etatTravailOuPause = "Travail";
            } else {
                stringPause.style.color = "white";
                stringPause.style.textDecoration = "underline";
                stringPause.style.textShadow = "0px 0px 10px black";

                stringTravail.style.color = "black";
                stringTravail.style.textDecoration = "none";
                stringTravail.style.textShadow = "none";
            }
        }
    }

    function diminuerTps() {
        
        minutes = parseInt(currentTime / 60);
        secondes = parseInt(currentTime % 60);
        
        if (minutes < 10) {
            minutes = "0" + minutes;
        };
        if (secondes < 10) {
            secondes = "0" + secondes;
        };

        timerDisplay.innerHTML = `${minutes} : ${secondes}`;

        verifEtatTravailOuPause();

        if (currentTime > 0) {
            currentTime--;
        } else {
            currentTime = 0;
        }

        
    }


    button.addEventListener("click", function() {
        
        if (!timerActif) {
            setInterval(diminuerTps, 1000);
            timerActif = true;
            button.innerHTML = `<em class="fa-solid fa-rotate"></em><br>Reset`;
        } else {
            location.reload(); //Reinitialiser la page
            timerActif = false;
        }

        

        
    });
    /*
    localStorage.setItem("tpsTravailForm", "23");

    console.log(localStorage.getItem("test"));
    */
});

//Pour save les infos du formulaire meme lors de la fermeture du naviguateur, utiliser le local storage