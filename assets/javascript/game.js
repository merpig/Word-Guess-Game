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

window.addEventListener('keyup', function (e) {
    
    if(e.keyCode === 32 || e.keyCode === 13) play();
    else if(gameStarted  && strLength !== matches){

        guessedLetter = String.fromCharCode(e.keyCode);
            
        if(validate(guessedLetter)){

            if(remainingGuesses && !arrayOfGuesses.includes(guessedLetter)){
                arrayOfGuesses.push(guessedLetter);
                evaluateGuess();
                document.getElementById("guessedDiv").innerHTML = arrayOfGuesses;
            }

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
        
            else{
            }              
        }

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

function init(){
    document.getElementById("scoreDiv").innerHTML =
    "<h1>Word Guess Game</h1>" +
    "<font color='white' style='font-style: centered'>Sasha Peters</font>";
}

function play(){
    reset();
    document.getElementById("myBtn").innerHTML = "RESET";
    //x.disabled = true;
    getWord();
    drawLetterBoxes();
    gameStarted = true;
}

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

function getWord(){
    var x = Math.floor(Math.random()*wordArray.length);
    hiddenWord = wordArray[x].toUpperCase();
    strLength = hiddenWord.toString().length;

}

function drawLetterBoxes(){
    for(var i = 0; i < strLength; i++){
        divContent += 
        "<div class='lettersDiv'><div class='letterDiv'><a class='letterSlice' id='slice" + i +"'>" +
        "</a></div><div class='underscore'></div>" + 
        "</div>";
        document.getElementById("lettersContainer").innerHTML = divContent;  
    }
}

function validate(strValue) {
    var objRegExp  = /^[a-z\A-Z]+$/;
    return objRegExp.test(strValue);
}

function evaluateGuess(e){
    var tempBool = false;
    for(var i = 0; i < strLength; i++){
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

!arrayOfGuesses.includes(guessedLetter)


function finishWord(){
    for(var i = 0; i < strLength; i++){
        if(!arrayOfGuesses.includes(hiddenWord.slice(i,i+1))){
            var temp = "slice" + i;
            document.getElementById(temp).innerHTML = "<font color='red'>" + hiddenWord.slice(i,i+1) + "</font>";
        }
    }
}

init();
