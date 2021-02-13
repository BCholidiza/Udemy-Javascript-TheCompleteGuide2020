const ATTACK_VALUE         = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE  = 17;
const HEAL_VALUE           = 20;

const MODE_ATTACK                    = "ATTACK";
const MODE_STRONG_ATTACK             = "STRONG ATTACK";
const LOG_EVENT_PLAYER_ATTACK        = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK       = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL          = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER            = "GAME_OVER";
const LOG_TARGET_PLAYER              = "PLAYER";
const LOG_TARGET_MONSTER             = "MONSTER";

let currentMonsterHealth = 0;
let currentPlayerHealth  = 0;
let hasBonusLife         = true;
let battleLog            = [];



function GetMaxLifeValues(){

    const enteredValue = prompt("Maximum health for you and monster", "100");
    let parsedValue    = parseInt(enteredValue);

    //default to 100 if value is not a number or is not more than 0
    //parsedValue = (isNaN(parsedValue)===true || parsedValue<=0) ? 100 : parsedValue
    if (isNaN(parsedValue) || parsedValue <= 0){
        
        throw {message : "Invalid user input, not a number!"};
    }
    return parsedValue;
}

let chosenMaxLife = 0;

try {
    
    chosenMaxLife = GetMaxLifeValues();
}
catch (error){

    console.log(error);
    chosenMaxLife = 100;
}
/* finally {

} */

currentMonsterHealth = chosenMaxLife;
currentPlayerHealth  = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

attackBtn.addEventListener("click", AttackHandler);
strongAttackBtn.addEventListener("click", StrongAttackHandler);
healBtn.addEventListener("click", HealPlayerHandler);
logBtn.addEventListener("click", PrintLogHandler);

function PrintLogHandler(){

    for (const logEntry of battleLog){

        console.log(logEntry);

        for (const object in logEntry){

            console.log(`${object} => ${logEntry[object]}`);
        }
        
    }
}

function WriteToLog(event, value, monsterHealth, playerHealth){

    let logEntry = {};

    if (event === LOG_EVENT_PLAYER_ATTACK){
        
        logEntry.target = LOG_TARGET_MONSTER;
    }
    else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK){
        
        logEntry.target = LOG_TARGET_MONSTER;
    }
    else if (event === LOG_EVENT_MONSTER_ATTACK){
        
        logEntry.target = LOG_TARGET_PLAYER;
    }
    else if (event === LOG_EVENT_PLAYER_HEAL){
        
        logEntry.target = LOG_TARGET_PLAYER;
    }

    logEntry.value  = value;
    logEntry.event     = event;
    finalMonsterHealth = monsterHealth;
    finalPlayerHealth  = playerHealth;

    battleLog.push(logEntry);
}

function Reset(){

    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth  = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){

    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    WriteToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth<=0 && hasBonusLife==true){

        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("Saved by bonus life");
    }

    if (currentMonsterHealth<=0 && currentPlayerHealth>0){
        
        alert("You won!");
        WriteToLog(LOG_EVENT_GAME_OVER, "Player won", currentMonsterHealth, currentPlayerHealth);
    }
    else if (currentPlayerHealth<=0 && currentMonsterHealth>0){

        alert("You lost!");
        WriteToLog(LOG_EVENT_GAME_OVER, "Monster won", currentMonsterHealth, currentPlayerHealth);

    }
    else if (currentPlayerHealth<=0 && currentMonsterHealth<=0){
        
        alert("You have a draw");
        WriteToLog(LOG_EVENT_GAME_OVER, "A draw", currentMonsterHealth, currentPlayerHealth);

    }

    if (currentMonsterHealth<=0 || currentPlayerHealth<=0){
            
        Reset();
    }
}

function AttackMonster(mode){

    let maxDamage;
    let logEvent;

    if (mode === MODE_ATTACK){

        maxDamage = ATTACK_VALUE;
        logEvent  = LOG_EVENT_PLAYER_ATTACK;
    }
    else {

        maxDamage = STRONG_ATTACK_VALUE;
        logEvent  = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }

    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;

    WriteToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);

    endRound();
}

function StrongAttackHandler(){

    AttackMonster(MODE_STRONG_ATTACK);
}

function AttackHandler(){

    AttackMonster(MODE_ATTACK);
}

function HealPlayerHandler(){
    
    let healValue;

    if (currentMonsterHealth >= chosenMaxLife - HEAL_VALUE){

        alert("You can't heal to more than max");
        healValue = chosenMaxLife - currentPlayerHealth;
    }
    else {
        
        healValue = HEAL_VALUE;
    }

    increasePlayerHealth(healValue);
    currentMonsterHealth += healValue;

    WriteToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);

    endRound();
}