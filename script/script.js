document.addEventListener("DOMContentLoaded", function () {
	//Declaration des variables
	let tempsAffichage = document.getElementById("tempsAffichage");
	let bouton = document.getElementById("boutonDebut");
	let stringTravail = document.getElementById("travailTexte");
	let stringPause = document.getElementById("pauseTexte");
	let tpsTravailEntree = document.getElementById("tpsTravailEntree");
	let tpsPauseEntree = document.getElementById("tpsPauseEntree");
	let boutonSon = document.getElementById("couperSon");
	
	let tpsTravail = 1500; //25min
	let tpsPause = 300; //5min
	let tpsActuel = tpsTravail; //25min
	
	let etatTravailOuPause = "Travail";
	let timerActif = false;
	
	let minutes;
	let secondes;

	let sonnerieActive = false;
	let sonnerie = new Audio('audio/sonnerie.mp3');

    //Recuperer et afficher les valeurs du local storage dans les inputs;
    tpsTravailEntree.value = localStorage.getItem("userTpsTravail");
    tpsPauseEntree.value = localStorage.getItem("userTpsPause");

	if (tpsTravailEntree.value < 10) {
		tempsAffichage.innerHTML = "0" + tpsTravailEntree.value + " : 00";
	}
	else {
		tempsAffichage.innerHTML = tpsTravailEntree.value + " : 00";
	}
	
	//Change le timer et modifie les styles des mots "Travail" ou "Pause".
	function verifEtatTravailOuPause() {
		if (etatTravailOuPause == "Travail") {
			if (tpsActuel <= 0) {
				tpsActuel = tpsPause;
				etatTravailOuPause = "Pause";
			} else {
				stringTravail.style.color = "white";
				stringTravail.style.textShadow = "0px 0px 10px black";
				
				stringPause.style.color = "black";
				stringPause.style.textShadow = "none";
			}
		}
		if (etatTravailOuPause == "Pause") {
			if (tpsActuel <= 0) {
				tpsActuel = tpsTravail;
				etatTravailOuPause = "Travail";
			} else {
				stringPause.style.color = "white";
				stringPause.style.textShadow = "0px 0px 10px black";
				
				stringTravail.style.color = "black";
				stringTravail.style.textShadow = "none";
			}
		}
	}
	
	//Affichage du temps en mm:ss et decrementation du tps chaque seconde.
	function diminuerTps() {
		if (tpsActuel > 0) {
			tpsActuel--;
		} else {
			tpsActuel = 0;
				
		}

		//Jouer la sonnerie si on est a moins de 6 secondes de la fin de la phase.
		if (tpsActuel <= 5 && sonnerieActive) {
			sonnerie.play();
		}

		minutes = parseInt(tpsActuel / 60);
		secondes = parseInt(tpsActuel % 60);
		
		//Permets de toujours avoir un affichage à deux chiffres.
		if (minutes < 10) {
			minutes = "0" + minutes;
		};
		if (secondes < 10) {
			secondes = "0" + secondes;
		};
		
		tempsAffichage.innerHTML = `${minutes} : ${secondes}`; //Permets un affichage mm:ss.
		
		verifEtatTravailOuPause();
	}
	
	//Permets la personnalisation du timer pomodoro grace à un form, seulement si entrees. Sinon options par defauts. 
	//Change le style du bouton et permet la reinitialisation  la page.
	bouton.addEventListener("click", function () {
		if (!timerActif) {
            localStorage.setItem("userTpsTravail", tpsTravailEntree.value); //Sauvegarder la valeur entrée.
			tpsTravail = tpsTravailEntree.value * 60; //Conversion des minutes en secondes.
			tpsActuel = tpsTravail;

            localStorage.setItem("userTpsPause", tpsPauseEntree.value); //Sauvegarder la valeur entrée.
			tpsPause = tpsPauseEntree.value * 60; //Conversion des minutes en secondes.

			setInterval(diminuerTps, 1000); //Fonction diminuant le tps chaque seconde.
			timerActif = true;
			bouton.innerHTML = `<em class="fa-solid fa-rotate"></em><br>Reset`;
		} else {
			location.reload(); //Reinitialiser la page
			timerActif = false;
		}
	});

	//Permet le changement de l'affichage selon la valeur du curseur avec affichage "00 : 00" plutot que "0 : 00"
	tpsTravailEntree.addEventListener("input", function() {
		if (tpsTravailEntree.value < 10) {
			tempsAffichage.innerHTML = "0" + tpsTravailEntree.value + " : 00";
		}
		else {
			tempsAffichage.innerHTML = tpsTravailEntree.value + " : 00";
		}
	})

	tpsPauseEntree.addEventListener("input", function() {
		if (tpsPauseEntree.value < 10) {
			tempsAffichage.innerHTML = "0" + tpsPauseEntree.value + " : 00";
		}
		else {
			tempsAffichage.innerHTML = tpsPauseEntree.value + " : 00";
		}
	})

	//Changer le style de l'affichage horaire lorsqu'on passe la souris sur les curseurs.
	tpsTravailEntree.addEventListener("mouseenter", function() {
		tempsAffichage.style.color = "white";
	});

	tpsTravailEntree.addEventListener("mouseleave", function() {
		tempsAffichage.style.color = "black";
	});

	tpsPauseEntree.addEventListener("mouseenter", function() {
		tempsAffichage.style.color = "white";
	});

	tpsPauseEntree.addEventListener("mouseleave", function() {
		tempsAffichage.style.color = "black";
	});

	//Changer le style du bouton sonnerie et l'état de la sonnerie
	boutonSon.addEventListener("click", function() {
		if (!sonnerieActive) {
			sonnerieActive = true;
			boutonSon.innerHTML = `<em class="fa-regular fa-bell"></em><br>Ring`;
			boutonSon.style.border = "solid green 5px";
		} else {
			sonnerieActive = false;
			boutonSon.innerHTML = `<em class="fa-regular fa-bell-slash"></em><br>Ring`;
			boutonSon.style.border = "solid red 5px";
		}
	})

});

	// TODO :
	// Rajouter les commentaires
	// Regler problemes sur affichage mobile