console.log("new project")
 let computerGuess;
 function init() {
     computerGuess= Math.floor(Math.random()*100 +1);
     console.log(computerGuess)
     document.getElementById("newGameButton").style.display="none";
     document.getElementById("gameArea").style.display="none";
}

function startGameView(){
    document.getElementById("welcomeScreen").style.display="none"
    document.getElementById("gameArea").style.display="block"

}

function easyMode(){
    console.log("hi")
}
function hardMode(){

}

  
