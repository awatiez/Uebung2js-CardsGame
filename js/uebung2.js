var CARDS_ARRAY = ["RH", "RK", "SP", "SK"];

/** 
* Function which executes itself when the page is loading
* set the stake value to "";
**/
window.onload = function() {
  document.getElementById("stake").value = "";
};

/**
* function launches the game
* when the user clicks on the button, it initialize the money amount depending on
* what the user typed in the input then hide the div "pre-game" and displays 
* the div "game" which contains the game itself.
**/
function startGame(){
	var initialMoney = document.getElementById("initialMoney").value;
	if (initialMoney > 0 && initialMoney != null){
		document.getElementById("money").innerHTML = initialMoney;
	}
	document.getElementById("game").style.display = "block";
	document.getElementById("pre-game").style.display = "none";
}

/**
* Core function of the game code.
* Corresponds to one bet from the player.
* The function takes no arguments, the variables are declared and assigned
* inside the function. 
* The variables are : 	msg		- the div where the messages for the player are written
*						gain	- the span element where the player's gain is written
*						stake	- the money amount the player wants to bet
*						money	- the money amount the player disposes of
*						bube, dame, koenig - each is a different shuffled array of the 
*											constant array which corresponds to the cars colors.
*
* The function tests if the player's stake is ok, then displays the three cards by calling
* the function shuffle for the 3 cards, then displays the images which correspond to the first 
* element of the returned shuffled array for each card.
* Then it calls the function checkCards to check whether the player wins or not.		
**/
function game(){
	var msg = document.getElementById("msg");
	var gain = document.getElementById("gain");
	document.getElementById("stake").style.border = "none";
	var stake = document.getElementById("stake").value;
	var money = parseInt(document.getElementById("money").innerHTML);
	if (stake <= 0 || stake == null){
		document.getElementById("stake").style.border = "red solid 4px";
		msg.innerHTML = "Bitte geben Sie einen gueltigen Einsatz ein.";
	}
	else{
		if (stake <= money){
			var bube = shuffle(CARDS_ARRAY)[0];
			var dame = shuffle(CARDS_ARRAY)[0];
			var koenig = shuffle(CARDS_ARRAY)[0];
			
			document.getElementById("cardsDiv").innerHTML = 
				("<img src=\"images/bube/" + bube + ".jpg\"/>" +
				"<img src=\"images/dame/" + dame + ".jpg\"/>" +
				"<img src=\"images/koenig/" + koenig + ".jpg\"/>");
			checkCards(bube, dame, koenig, money, stake);
		}
		else{
			msg.innerHTML = "Nicht genug Geld. Bitte geben Sie einen gueltigen Einsatz ein.";
			document.getElementById("stake").style.border = "red solid 4px";
		}
	}
}

/**
* Function checkCards checks whether the player wins or not, depending on the displayed cards.
* @param {string} bColor - The color of the card "Bube".
* @param {string} dColor - The color of the card "Dame".
* @param {string} kColor - The color of the card "Koenig".
* @param {int} money 	 - The amount of money the player disposes of.
* @param {int} stake 	 - The amount of money the player puts at stake.
* I used here a code for the cards' color, it is a 2 chars-string, 
* the first char is the color of the card ("S" for "schwarz" and "R" for "rot")
* the seconde char is the "card's color" ("K" for "Karo" and "Kreuz" since there is always
*										  a "S" before "Kreuz" and a "R" before "Karo", and
*										  "P" for "Pik" and "H" for "Herz").
*
* The function checks first if cards have the same color, then if they have the same "sign" and
* prints the corresponding message and add or remove money to/from the player's money amount if 
* the player loses or wins.
* If the player's money amount is 0, the function handles the Game Over case by
* displaying the block "gameover" and hiding the block "game".
**/
function checkCards(bColor, dColor, kColor, money, stake){
	if (bColor[0] == dColor[0] && bColor[0] == kColor[0]){
		if (bColor[1] == dColor[1] && bColor[1] == kColor[1]){
			msg.innerHTML ="Glueckwunsch Sie haben gewonnen! Sie erhalten " 
			+ stake + "$!!";
			gain.innerHTML = "+" + stake;
			money += stake * 2
		}
		else{
			msg.innerHTML = "Alle Farben gleich, Sie bekommen ihr Geld zurueck";
			gain.innerHTML = "-";
		}
	}
	else{
		money -= stake;
		if (money == 0){
			document.getElementById("game").style.display = "none";
			document.getElementById("gameover").style.display = "block";
		}
		else{
			msg.innerHTML = "Sorry aber Sie haben ihren Einsatz verloren.. Versuchen Sie nochmal!";
			gain.innerHTML = "-" + stake;
		}
	}
	
	document.getElementById("money").innerHTML = money;
}

/**
* Function which is called when the player lost and decides to play again.
* It mainly reset variables and hide/display divs so that the user can start the game again
**/
function restartGame(){
	document.getElementById("pre-game").style.display = "block";
	document.getElementById("gameover").style.display = "none";
	document.getElementById("cardsDiv").innerHTML = "<img src=\"images/joker.jpg/>";
	gain.innerHTML = "";
	msg.innerHTML = "Viel Glueck!";
	document.getElementById("stake").value = "";
}

/**
*Function shuffle, found on the web
* @param {array} array - the array which is to be shuffled
* take an array as argument, then returns it shuffled
**/
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}