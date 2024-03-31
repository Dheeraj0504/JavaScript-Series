let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
let msgElement = document.getElementById("msg");
let userScoreElement = document.getElementById("userScore");
const computerScoreElement = document.querySelector("#computerScore");

function generateComputerChoice(){
    let options = ["rock","paper", "scissors"];
    let randomIdx = Math.floor(Math.random() * 3); // if 5.56 then Math.ceil = 6 & math.floor = 5 
    return options[randomIdx];
}

const drawGame = () => {
    // console.log("Game Was Draw.");
    msgElement.textContent = "Game Was Draw. Play Again!";
    msgElement.style.backgroundColor = "#081b31";
}

function showWinner(userWin, userChoice, compChoice){
    if (userWin){
        userScore ++;
        // console.log("You Win!");
        msgElement.innerText = `You Win!. Your ${userChoice} beats ${compChoice}`;
        msgElement.style.backgroundColor = "green";
        userScoreElement.textContent = userScore;
    }
    else{
        computerScore ++;
        // console.log("You Lose");
        msgElement.textContent = `You lost. ${compChoice} beats your ${userChoice}`;
        msgElement.style.backgroundColor = "red";
        computerScoreElement.innerText = computerScore;
    }
}

function playGame(userChoice){
    // console.log("user choice = ", userChoice);
    // Generate computer choice
    let compChoice = generateComputerChoice();
    // console.log("comp choice = ", compChoice);

    if (userChoice === compChoice){
        // Draw Game
        drawGame();
    }
    else{
        let userWin = true;
        if (userChoice === "rock"){
            // computer can choose paper or scissors 
            userWin = compChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper"){
            // computer can choose scissors or rock 
            userWin = compChoice === "scissors" ? false : true;
        }
        else {
            // user choice = scissors
            // computer can choose rock or paper 
            userWin = compChoice === "rock" ? false : true; 
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

choices.forEach(function(choice){
    // console.log(choice);
    choice.addEventListener("click", function(){
        let userChoice = choice.getAttribute("id"); 
        // console.log("choice was clicked", userChoice)
        playGame(userChoice);
    })
})