document.addEventListener("DOMContentLoaded", function () {
	//Declaration des variables
	let tempsAffichage = document.getElementById("tempsAffichage");
	let bouton = document.getElementById("boutonDebut");
	let stringTravail = document.getElementById("travailTexte");
	let stringPause = document.getElementById("pauseTexte");
	let tpsTravailEntree = document.getElementById("tpsTravailEntree");
	let tpsPauseEntree = document.getElementById("tpsPauseEntree");
	
	let tpsTravail = 1500; //25min
	let tpsPause = 300; //5min
	let tpsActuel = tpsTravail; //25min
	
	let etatTravailOuPause = "Travail";
	let timerActif = false;
	
	let minutes;
	let secondes;

    //Recuperer et afficher les valeurs du local storage dans les inputs;
    tpsTravailEntree.value = localStorage.getItem("userTpsTravail");
    tpsPauseEntree.value = localStorage.getItem("userTpsPause");
	

	//Change le timer et modifie les styles des mots "Travail" ou "Pause".
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
	
	//Affichage du temps en mm:ss et diminution du tps chaque seconde.
	function diminuerTps() {
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
		
		if (tpsActuel > 0) {
			tpsActuel--;
		} else {
			tpsActuel = 0;
		}
		
		
	}
	
	//Permets la personnalisation du timer pomodoro grace à un form, seulement si entrees. Sinon options par defauts. 
	//Change le style du bouton et permet la reinitialisation  la page.
	bouton.addEventListener("click", function () {
		if (!timerActif) {
			if (tpsTravailEntree.value != "") {
                localStorage.setItem("userTpsTravail", tpsTravailEntree.value); //Sauvegarder la valeur entrée.
				tpsTravail = tpsTravailEntree.value * 60; //Conversion des minutes en secondes.
				tpsActuel = tpsTravail;
			} 
			if (tpsPauseEntree.value != "") {
                localStorage.setItem("userTpsPause", tpsPauseEntree.value); //Sauvegarder la valeur entrée.
				tpsPause = tpsPauseEntree.value * 60; //Conversion des minutes en secondes.
			}
			setInterval(diminuerTps, 1000); //Fonction diminuant le tps chaque seconde.
			timerActif = true;
			bouton.innerHTML = `<em class="fa-solid fa-rotate"></em><br>Reset`;
		} else {
			location.reload(); //Reinitialiser la page
			timerActif = false;
		}
	});
});


	// /!\ 
	// Extension Wave, erreurs de contraste importantes ?

	// Probleme au niveau label dans index.html
	// sur validator w3c, lui convient si 1 label 
	// alors que pour achecker, il veut 2 labels

	// Retard branche sur Pomodoro_v2
	// comment regler cela ?
