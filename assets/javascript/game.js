// array of words for the game
var wordArray = [
    "immense","pig","whistle","song","whisper",
    "mundane","excited","bulb","nest","special",
    "theory","disrupt","correct","plucky","vein",
    "care","adjust","right","drink","save",
    "face","dust","beast","bruise","train",
    "late","earn","wise","hold","noisy",
    "beds","produce","aspect","steep","beauty",
    "suit","potato","frog","sprite","music"
];

// Variables holding necessary data for word guess
var remainingGuesses = 10;
var hiddenWord = "";
var divContent = "";
var guessedLetter = "";
var arrayOfGuesses = [];
var gameStarted = false;
var strLength = 0;
var matches = 0;
var wins = 0;
var losses = 0;

// Event listener for keyup keyboard events
window.addEventListener('keyup', function (e) {


    // Return/Enter/Spacebar all activate the play() function
    if(e.keyCode === 32 || e.keyCode === 13) play();
    else if(gameStarted  && strLength !== matches){

        guessedLetter = String.fromCharCode(e.keyCode);

       // Check if guessed character is a letter     
        if(validate(guessedLetter)){

            // Check if there are remaining guesses and that the guess hasn't already been guessed
            if(remainingGuesses && !arrayOfGuesses.includes(guessedLetter)){
                arrayOfGuesses.push(guessedLetter);
                evaluateGuess();
                document.getElementById("guessedDiv").innerHTML = arrayOfGuesses;
            }

            // Handles when there are remaining guess and the guess has already been guessed
            else if(remainingGuesses && arrayOfGuesses.includes(guessedLetter)){
                document.getElementById("scoreDiv").innerHTML = 
                    "<font color='orange'> Letter has already been picked: " + 
                    guessedLetter +
                    "</font>" +
                    "<br> Remaining Guesses: " +
                    remainingGuesses +
                    "<br> Wins: " +
                    wins +
                    "<br> Losses: " +
                    losses;
            }             
        }

        // Handles when guessed character isn't a letter
        else {
            document.getElementById("scoreDiv").innerHTML =

                "<font color='orange'>Not a valid letter: " +
                guessedLetter +
                "</font>" +
                "<br> Remaining Guesses: " +
                remainingGuesses +
                "<br> Wins: " +
                wins +
                "<br> Losses: " +
                losses;
        }
    }
}, false);


// init for intro to game section
function init(){
    document.getElementById("scoreDiv").innerHTML =
    "<h1>Word Guess Game</h1>" +
    "<font color='white' style='font-style: centered'>Sasha Peters</font>";
}

// function attached to button to play game
function play(){
    reset();
    document.getElementById("myBtn").innerHTML = "RESET";
    //x.disabled = true;
    getWord();
    drawLetterBoxes();
    gameStarted = true;
}

// all values except score are set back to default
function reset(){
    remainingGuesses=10;
    hiddenWord="";
    divContent="";
    guessedLetter="";
    arrayOfGuesses=[];
    gameStarted=false;
    strLength=0;
    matches=0;
    document.getElementById("scoreDiv").innerHTML =
        "<font color='cyan'>Type any letter to start guessing.</font>" +
        "<br> Remaining Guesses: " +
        remainingGuesses +
        "<br> Wins: " +
        wins +
        "<br> Losses: " +
        losses;
    document.getElementById("guessedDiv").innerHTML = arrayOfGuesses;
}

// grabs a random word from array
function getWord(){
    var x = Math.floor(Math.random()*wordArray.length);
    hiddenWord = wordArray[x].toUpperCase();
    strLength = hiddenWord.toString().length;

}

// draws boxes for the letters in the word that's being guessed
function drawLetterBoxes(){
    for(var i = 0; i < strLength; i++){
        divContent += 
        "<div class='lettersDiv'><div class='letterDiv'><a class='letterSlice' id='slice" + i +"'>" +
        "</a></div><div class='underscore'></div>" + 
        "</div>";
        document.getElementById("lettersContainer").innerHTML = divContent;  
    }
}

// function to check if char is string or not
function validate(strValue) {
    var objRegExp  = /^[a-z\A-Z]+$/;
    return objRegExp.test(strValue);
}


function evaluateGuess(e){
    var tempBool = false;
    for(var i = 0; i < strLength; i++){

        // Handles when the letter is a match
        if(guessedLetter === hiddenWord.slice(i,i+1)){
            document.getElementById("scoreDiv").innerHTML =
                "<font color='green'>The letter you typed matches: " +
                guessedLetter +
                "</font>" +
                "<br> Remaining Guesses: " +
                remainingGuesses +
                "<br> Wins: " +
                wins +
                "<br> Losses: " +
                losses;
            matches++;
            tempBool = true; 
            var temp = "slice" + i;
            document.getElementById(temp).innerHTML = hiddenWord.slice(i,i+1);

            // break the loop if the word is complete
            if(strLength===matches){
                wins++;
                document.getElementById("scoreDiv").innerHTML =
                    "<font color='cyan'>Press RESET or enter/return to play again.</font>" +
                    "<br> <font color='green'>You win!</font>"  +
                    "<br> Wins: " +
                    wins +
                    "<br> Losses: " +
                    losses;
                break;
            }
        }
    }
    if(!tempBool){
        remainingGuesses--;

        // Handles when there are remainging guesses and the guess didn't match
        if(remainingGuesses){
            document.getElementById("scoreDiv").innerHTML =
                "<font color='orange'>The letter you typed does not match: " +
                guessedLetter +
                "</font>" +
                "<br> Remaining Guesses: " +
                remainingGuesses +
                "<br> Wins: " +
                wins +
                "<br> Losses: " +
                losses;
        }

        // Handles when there are no remainging guesses and the guess didn't match
        else{
            gameStarted = false;
            losses++;
            document.getElementById("scoreDiv").innerHTML = 
                "<font color='cyan'>Press Reset or enter/return to play again.</font>" +
                "<br> <font color='red'>Game Over</font>"  +
                "<br> Wins: " +
                wins +
                "<br> Losses: " +
                losses;
            finishWord();
        }
        
    }
}

// Draw in any unguessed letters
function finishWord(){
    for(var i = 0; i < strLength; i++){
        if(!arrayOfGuesses.includes(hiddenWord.slice(i,i+1))){
            var temp = "slice" + i;
            document.getElementById(temp).innerHTML = "<font color='red'>" + hiddenWord.slice(i,i+1) + "</font>";
        }
    }
}

init();