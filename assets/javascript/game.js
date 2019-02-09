var wordArray = [
    "immense","pig","whistle","song","whisper",
    "mundane","excited","bulb","nest","special",
    "theory","district","correct","plucky","vein",
    "care","adjustment","righteous","drink","save",
    "face","dust","difficult","bruise","train"
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


window.addEventListener('keyup', function (e) {

    if(gameStarted  && strLength !== matches){
        guessedLetter = String.fromCharCode(e.keyCode);

        if(validate(guessedLetter)){

            if(remainingGuesses && !arrayOfGuesses.includes(guessedLetter)){
                arrayOfGuesses.push(guessedLetter);
                evaluateGuess();
                document.getElementById("guessedDiv").innerHTML = arrayOfGuesses;
            }

            else if(remainingGuesses && arrayOfGuesses.includes(guessedLetter)){
                document.getElementById("scoreDiv").innerHTML = 
                "Remaining Guesses: " +
                remainingGuesses +
                "<br>Wins: " +
                wins +
                "<br>You've alreay tried guessing the letter: " + 
                guessedLetter +
                "!";
            }
        
            else{
            }              
        }

        else {
            document.getElementById("scoreDiv").innerHTML =
            "Remaining Guesses: " +
            remainingGuesses +
            "<br>Wins: " +
            wins
            "<br>The character you entered is not a valid letter. Please try again.";
        }

    

    }
}, false);

function init(){
    document.getElementById("scoreDiv").innerHTML =
    "<h1>Click play and enter letters to guess the word!</h1>";
}

function play(){
    reset();
    var x = document.getElementById("myBtn");
    x.disabled = true;
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
        "Remaining Guesses: " +
        remainingGuesses +
        "<br>Wins: " +
        wins;
    document.getElementById("guessedDiv").innerHTML = arrayOfGuesses;
}

function getWord(){
    var x = Math.floor(Math.random()*wordArray.length);
    hiddenWord = wordArray[x].toUpperCase();
    strLength = hiddenWord.toString().length;

}

function drawLetterBoxes(){
    
    //console.log(strLength);
    for(var i = 0; i < strLength; i++){
        divContent += 
        "<div class='lettersDiv'><div class='letterDiv'><a class='letterSlice' id='slice" + i +"'>" +
        //hiddenWord.slice(i,i+1) + 
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
            matches++;
            tempBool = true; 
            var temp = "slice" + i;
            document.getElementById(temp).innerHTML = hiddenWord.slice(i,i+1);
            if(strLength===matches){
                wins++;
                document.getElementById("scoreDiv").innerHTML =
                    "You win!"  +
                    "<br>Wins: " +
                    wins;
                var x = document.getElementById("myBtn");
                x.disabled = false;
                break;
            }
        }
    }
    if(!tempBool){
        remainingGuesses--;
        if(remainingGuesses){
            document.getElementById("scoreDiv").innerHTML =
            "Remaining Guesses: " +
            remainingGuesses +
            "<br>Wins: " +
            wins;
        }
        else{
            gameStarted = false;
            document.getElementById("scoreDiv").innerHTML = 
                "Game Over"  +
                "<br> Wins: " +
                wins +
                "<br> Press Play or spacebar/enter to play again.";
            finishWord();
            var x = document.getElementById("myBtn");
            x.disabled = false;
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
//play();
