console.log("new project")
 let computerGuess;
 let userGuesses=[];
 let attempts=0;
 let maxGuesses;
 let low=1;
 let high=100;
 function usern(){
    const userName=String(document.getElementById("username").value);
        console.log(userName);}
 function init() {
     computerGuess= Math.floor(Math.random()*100 +1);
     console.log(computerGuess);
     document.getElementById("newGameButton").style.display="none";
     document.getElementById("logo1").style.display="none";
     document.getElementById("logo2").style.display="none";
     document.getElementById("gameArea").style.display="none";
     
}


function easyMode(){
    maxGuesses=10;
    startGameView();
    console.log("hi")
}
function hardMode(){
    maxGuesses=5;
    startGameView();
}

function startGameView(){
    document.getElementById("welcome").style.display="none"
    document.getElementById("logo").style.display="none"
    // document.getElementById("logo2").style.display="none"
    document.getElementById("logo1").style.display="block"
    document.getElementById("gameArea").style.display="block"

}


function compareGuess(){
    const userGuess=Number(document.getElementById("inputBox").value);
   userGuesses.push(userGuess);
   document.getElementById("guesses").innerHTML=userGuesses;
   attempts++;
   document.getElementById("attempts").innerHTML=attempts;
   
   if(attempts<maxGuesses){
        if(userGuess> computerGuess){
            if(userGuess<high)high=userGuess;
            document.getElementById("textOutput").innerHTML="Your Guess is too High";
            document.getElementById("inputBox").value=""

        }
        else if(userGuess<computerGuess){
            if(userGuess>low)low=userGuess
            document.getElementById("textOutput").innerHTML="Your Guess is too low";
            document.getElementById("inputBox").value=""
        }
        else{
            document.getElementById("textOutput").innerHTML="Correct! You got it  in "+attempts+" attempts";
            gameEnded()
        }
   }
   else{
        if(userGuess> computerGuess){
            document.getElementById("textOutput").innerHTML=`You Loss!, <br> The Number Was ${computerGuess}`;
            gameEnded()

        }
        else if(userGuess<computerGuess){
            document.getElementById("textOutput").innerHTML=`You Loss!, <br> The Number Was ${computerGuess}`;
            gameEnded()
        }
        else{
            document.getElementById("textOutput").innerHTML="Correct! You got it  in "+attempts+" attempts";
            gameEnded()
        }
   }
   updateRange();

    
}


function updateRange(){
    const lowValue =document.getElementById("low");
           lowValue.style.flex=low+"%";
           lowValue.style.background="#ef7d54"
    const space=document.getElementById("space");
          space.style.flex=high-low+'%';
           space.style.background="#83e1d0"
    const highValue=document.getElementById("high");
    highValue.style.flex=100-high+'%';
    highValue.style.background="#ef7b54"
    const rangeOut=document.getElementById("rangeOutput");
    rangeOut.innerHTML=`${low}-${high}`
    rangeOut.style.marginLeft=low+"%";
    rangeOut.style.marginRight=100-high+"%";
    rangeOut.classList.add("flash");

}


function gameEnded(){
    document.getElementById("newGameButton").style.display="inline";
    document.getElementById("logo1").style.display="none"
    document.getElementById("logo2").style.display="block"
    document.getElementById("inputBox").setAttribute('readonly','readonly')
}
function newGame(){
    window.location.reload();
}
function endGame(){
    window.location.reload();
}
