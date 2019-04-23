//Initiliazation of global variables, this is only initiliazed when the page is loaded
/*Global*/var victoryCount = 0;
/*Global*/var constellationArray = ["andromeda", "aquarius", "aquila", "aries", "cancer", "canis-major", "capricornus", "carina", "centaurus", "cetus", "corona-borealis", "crater", "crux", "cygnus", "delphinus", "dorado", "draco", "eridanus", "gemini", "hercules", "hydra", "lacerta", "leo", "libra", "lupus", "lynx", "lyra", "orion", "pegasus", "perseus", "phoenix", "pisces", "sagittarius", "scorpius", "serpens-caput", "taurus", "ursa-major", "ursa-minor", "virgo"];
/*Game Based*/var guessesLeft;
/*Game Based*/var guessedLetters;
/*Game Based*/var wordValue;
/*Game Based*/var wordOutput;

//This is the initialization of a new game. Used for first game and all subsequent games
function startGame(){
    window.removeEventListener("keyup", startGame);
    guessesLeft = 11;
    guessedLetters = "";
    console.log(guessedLetters);
    document.getElementById("victoryCountSpan").innerHTML="Victories: "+victoryCount;
    updateLetters();
    wordValue = assignWord();
    createHiddenWord(wordValue);
    awaitInput();
}

//This is the update of all guess information, utilized any time a NEW and APPROVED key entity is pressed
function updateLetters(){
    document.getElementById("guessesLeftSpan").innerHTML="Guesses Left: "+guessesLeft;
    document.getElementById("guessedLettersSpan").innerHTML="Guessed Letters: "+guessedLetters;
    document.getElementById("guessFeedbackSpan").innerHTML="";
}

//This assigns a new word to the game for the player to guess, utilized only upon instantiation of a new game
function assignWord(){
    var index = Math.floor(Math.random()*constellationArray.length)+1;
    return constellationArray[index];
}

//This creates the hidden output for the player to reference, utilized only upon instantiation of a new game
function createHiddenWord(word){
    wordOutput="";
    for(i=0; i<word.length; i++){
        if(word.substr(i, 1) == "-"){
            wordOutput += "-";
        } else {
            wordOutput += "_";
        }
        wordOutput += " "
    }
    updateWrittenHiddenWord()
}

//This will update the written output for the player to function
function updateWrittenHiddenWord(){
    document.getElementById("wordSpan").innerHTML=wordOutput.toUpperCase();
}

//This is the main function of the game, awaiting information from a key press and submitting information based on the response.
function awaitInput(){
    window.addEventListener("keyup", function(event){
        verifyInput(event.key.toLowerCase());    
    });
}

function verifyInput(input){
    console.log(guessedLetters.search(input));
    if(!/[a-z]/.test(input)){ //Test input against regular expression
        document.getElementById("guessFeedbackSpan").innerHTML="This is not an approved letter. Try again.";
    } else if(guessedLetters.search(input) != -1) { //Test input against Already Guessed Letters
        console.log(guessedLetters.search(input) + ":"+guessedLetters.length);
        document.getElementById("guessFeedbackSpan").innerHTML="This letter has already been guessed.";
    } else {
        compareInputWithWord(input);
        guessedLetters += input + ", ";
        input="";
        updateLetters();
        checkForWinLoseConditions();
    }
}

//Compares the input value to the word and rewrites the output information
function compareInputWithWord(input){
    var newWordOutput="";
    var adjustmentMade = false;
    for(i=0; i<wordValue.length; i++){
        if(wordValue.charAt(i)==input) {
            newWordOutput += input + " ";
            adjustmentMade = true;
        } else {
            newWordOutput += wordOutput.charAt(2*i) + " ";
        }
    }
    if(!adjustmentMade){
        guessesLeft--;
    }
    wordOutput = newWordOutput;
    updateWrittenHiddenWord();
}

function checkForWinLoseConditions(){
    if(guessesLeft<=0){ //If 0 or fewer guesses left, LOSE
        startGame();
    } else if(wordOutput.search("_") == -1){ //If There are no '_' characters in the output, WIN
        victoryCount+=1;
        document.getElementById("themeRewardSpan").src="assets/images/"+wordValue+".jpg";
        startGame();
    }
}

window.addEventListener("keyup", startGame);
//NOTED ISSUES:
/*
Okay, plenty of issues here.
Guesses doesn't decrease correctly all the time
After one good game, every guess responds with "this has already been guessed"
After 2 good games, the most recent input will push over into the next game.
*/