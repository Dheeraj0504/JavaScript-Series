let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector("#reset-btn");
let newGameBtn = document.getElementById("new-btn");
// let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); 
let msgElement = document.getElementById("msg");
// let msgElement = document.querySelector("#msg");

let turnO = true; //playerX playerO 
let count = 0// to Track Draw

// 2D Array
const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         console.log("box was clicked");
//     })
// })

boxes.forEach(function(box){
    box.addEventListener("click", function(){
        // console.log("box was clicked");
        if (turnO === true){ //playerO
            box.textContent = "O";
            box.style.color = "#b0413e"
            turnO = false;
        }
        else{ // playerX
            box.textContent = "X";
            box.style.color = "#355E3B"
            turnO = true;
        }
        box.disabled = true;
        count ++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msgElement.textContent = "Game Was a Draw.";
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const enabledBoxes = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const disabledBoxes = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}

// function showWinner(Winner){
//     msgElement.innerText = `Conguralations, Winner is ${Winner}`;
//     msgContainer.classList.remove("hide");
//     disabledBoxes();
// }
const showWinner = (winner) => {
    msgElement.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

function checkWinner(){
    for (let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].textContent);

        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("Winner", pos1Val);
                showWinner(pos1Val);
            }
        }

    }

};

newGameBtn.addEventListener("click", resetGame);
restBtn.addEventListener("click", resetGame);

