const startGameBtn = document.getElementById('start-game-btn');

const ROCK     = "ROCK";
const PAPER    = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;

const RESULT_DRAW          = "DRAW";
const RESULT_PLAYER_WINS   = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

const getPlayerChoice = function (){

    const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}?`, "").toUpperCase();

    if (selection !== ROCK   &&
        selection !== PAPER  &&
        selection !== SCISSORS){

            alert(`Invalid choice! We chose ${ROCK} for you!`);
            return;
        }
    return selection;
};

const getComputerChoice = function (){

    const randomValue = Math.random();

    if (randomValue < 0.34){
        return ROCK;
    }
    else if (randomValue < 0.67){

        return PAPER;
    }
    else {

        return SCISSORS;
    }
};

/**Using function expression to get winner */
/* const getWinner = function(cChoice, pChoice){

    if (cChoice === pChoice){

        return RESULT_DRAW;
    }
    else if (cChoice===ROCK     && pChoice===PAPER ||
             cChoice===PAPER    && pChoice===SCISSORS ||
             cChoice===SCISSORS && pChoice===ROCK){

                return RESULT_PLAYER_WINS;
        }
    else {

        return RESULT_COMPUTER_WINS;
    }
}; */

/** Using arrow functions to get winner.  */
const getWinner = (cChoice, pChoice=DEFAULT_USER_CHOICE) =>

    cChoice === pChoice
    ? RESULT_DRAW 
    : (cChoice===ROCK && pChoice===PAPER) ||
      (cChoice===PAPER && pChoice===SCISSORS) || 
      (cChoice===SCISSORS && pChoice===ROCK) 
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

startGameBtn.addEventListener("click", function (){

    if (gameIsRunning === true)
        return;

    gameIsRunning = true;
    console.log("Game is starting. . . ");
    const playerChoice   = getPlayerChoice();           //might be undefined without default arguments
    const computerChoice = getComputerChoice();
    let winner;

    if (playerChoice){

        winner = getWinner(computerChoice, playerChoice);
    }
    else {

        winner = getWinner(computerChoice);
    }

    let message = `You picked ${playerChoice||DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore you `;
    if (winner === RESULT_DRAW){

        message += `had a draw.`;
    }
    else if (winner === RESULT_PLAYER_WINS){

        message += `won.`;
    }
    else {
        message += `lost.`;
    }
    alert(message);
    gameIsRunning = false;
});

// not related to the game 
// rest operator has to be the last argument in function declaration
// you can only use rest once
const sumUp = (resultHandler, ...args) => {

    // this is the equivalent of a private function
    const validateNumber = number => isNaN(number) ? 0 : number;
    let sum = 0;

    for (const num of args){
        
        sum += validateNumber(num);
    }
    resultHandler(sum);
};


/* const subtractUp = function(resultHandler){

    let sum = 0;

    for (const num of arguments){

        sum -= num;
    }

    resultHandler(sum);
}; */


// Removed the 'arguments' because result Handler was being seen as one of the arguments
// We are now using the rest operator 
const subtractUp = function(resultHandler, ...numbers){

    let sum = 0;

    for (const num of numbers){

        sum -= num;
    }

    resultHandler(sum);
};


const showResult = (messageText, result) => {

    alert(messageText +" "+ result);
};

sumUp(showResult.bind(this, "The result after adding all numbers is:"), 4, 5, 5, 6);          //Just testing the call back function
subtractUp(showResult.bind(this, "The result after subtracting all numbers is:"), 1, 10, 15, 20);