//TOUT METTRE EN FRANCAIS EN HTML, CSS ET JAVA
document.addEventListener("DOMContentLoaded", function() {

    //Declaration des variables
    let tempsAffichage = document.getElementById("tempsAffichage");
    let bouton = document.getElementById("boutonDebut");
    let stringTravail = document.getElementById("travailTexte");
    let stringPause = document.getElementById("pauseTexte");
    
    let tpsTravail = 1500; //25min
    let tpsPause = 300; //5min
    let tpsActuel = tpsTravail; //25min
    
    let etatTravailOuPause = "Travail";
    let timerActif = false;

    let minutes;
    let secondes;

    function verifEtatTravailOuPause() {
        if (etatTravailOuPause == "Travail") {
            if (tpsActuel <= 0) {
                tpsActuel = tpsPause;
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
            if (tpsActuel <= 0) {
                tpsActuel = tpsTravail;
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
        
        minutes = parseInt(tpsActuel / 60);
        secondes = parseInt(tpsActuel % 60);
        
        if (minutes < 10) {
            minutes = "0" + minutes;
        };
        if (secondes < 10) {
            secondes = "0" + secondes;
        };

        tempsAffichage.innerHTML = `${minutes} : ${secondes}`;

        verifEtatTravailOuPause();

        if (tpsActuel > 0) {
            tpsActuel--;
        } else {
            tpsActuel = 0;
        }

        
    }


    bouton.addEventListener("click", function() {
        
        if (!timerActif) {
            setInterval(diminuerTps, 1000);
            timerActif = true;
            bouton.innerHTML = `<em class="fa-solid fa-rotate"></em><br>Reset`;
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