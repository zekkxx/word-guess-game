var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
var victoryCount=0;

class Sound {
    constructor(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
    }
    play() {
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
}

class Game {
    constructor(){ //Constructs each new game to eradicate overlapping errors
        this.chancesLeft=11;
        this.guessedLetters="";
        this.constellationName=this.assignWord();
        this.playerHint=this.createPlayerHint();
        //console.log(this.constellationName + ":" + this.playerHint);
    }

    //This assigns a new word to the game for the player to guess, utilized only upon instantiation of a new game
    assignWord(){
        var index = Math.floor(Math.random()*constellationArray.length);
        return constellationArray[index];
    }

    //This creates the hidden output for the player to reference, utilized only upon instantiation of a new game
    createPlayerHint(){
        var output="";
        for(var i=0; i<this.constellationName.length; i++){
            if(this.constellationName.substr(i, 1) == "-"){
                output += "-"; //Places an - inbetween words to keep in line with pictures
            } else {
                output += "_"; //Replaces the letter with an '_'
            }
            output += " " //Adds a space between '_'s
        }
        return output;
    }

    //This is the update of all guess information, utilized any time a NEW and APPROVED key entity is pressed
    updateFields(){
        document.getElementById("wordSpan").innerHTML=this.playerHint;
        document.getElementById("guessesLeftSpan").innerHTML="Chances Left: "+this.chancesLeft;
        document.getElementById("guessedLettersSpan").innerHTML="Guessed Letters: "+this.guessedLetters;
    }

    //This is the main function of the game, awaiting information from a key press and submitting information based on the response.
    verifyInput(input){
        if(!/[a-z]/.test(input)){ //Test input against regular expression
            document.getElementById("guessFeedbackSpan").innerHTML="This is not an approved letter. Try again.";
        } else if(this.guessedLetters.search(input) != -1) { //Test input against Already Guessed Letters
            document.getElementById("guessFeedbackSpan").innerHTML="This letter has already been guessed.";
        } else {
            document.getElementById("guessFeedbackSpan").innerHTML="";
            this.compareInputWithName(input);
            this.guessedLetters += input + ", "
        }
    }

    //Compares the input value to the word and rewrites the output information
    compareInputWithName(input){
        var newWordOutput="";
        var adjustmentMade = false;
        for(var i=0; i<this.constellationName.length; i++){
            if(this.constellationName.charAt(i)==input) { //If the point in the word has the input letter
                newWordOutput += input + " ";
                adjustmentMade = true;
            } else {
                newWordOutput += this.playerHint.charAt(2*i) + " "; //Due to spaces, i has to be doubled to get the proper next character
            }
        }
        if(!adjustmentMade){
            this.chancesLeft--;
        }
        this.playerHint = newWordOutput.toUpperCase(); //change the output to uppercase and save it back to playerHint
    }

    checkForWinLoseConditions(){
        if(this.chancesLeft<=0){ //If 0 or fewer guesses left, LOSE
            mySound.stop();
            this.newGame();
        } else if(this.playerHint.search("_") == -1){ //If There are no '_' characters in the output, WIN
            victoryCount+=1;
            mySound.play();
            document.getElementById("themeRewardSpan").src="assets/images/"+this.constellationName+".jpg";
            this.newGame();
        }
    }

    newGame(){
        myGame = new Game(); //Creates a new overriding Game element
        document.getElementById("victoryCountSpan").innerHTML="Victories: "+victoryCount;
    }
}
var myGame = new Game();
var mySound = new Sound("assets/sounds/Commerce_start.mp3")
window.addEventListener("keyup", startUp); //Start Screen
function startUp(){
    window.removeEventListener("keyup", startUp); //remove input element
    myGame.updateFields(); //Move to player screen
    window.addEventListener("keyup", function(event){ //replace input element and apply game loop.
        myGame.verifyInput(event.key.toLowerCase());
        myGame.checkForWinLoseConditions();
        myGame.updateFields();
    });
}
