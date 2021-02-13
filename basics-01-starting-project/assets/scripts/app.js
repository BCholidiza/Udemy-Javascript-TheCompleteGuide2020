let currentResult = 0;
let calculationDescription = "";
let logEntries = [];


/**
 * Event listeners
 */
addBtn.addEventListener("click", Add);
subtractBtn.addEventListener("click", Subtract);
multiplyBtn.addEventListener("click", Multiply);
divideBtn.addEventListener("click", Divide);


/**
 * Functions
 */
function CalculateResult(calculationType){

    const enteredNumber = GetUserNumberInput();
    const initialResult = currentResult;
    let mathOperator = null;

    if (enteredNumber == false){

        return;
    }

    if (calculationType !== "Add"    && calculationType !== "Subtract" && 
        calculationType !== "Divide" && calculationType !== "Multiply"){

        return;
    }

    if (calculationType === "Add"){

        currentResult += enteredNumber;
        mathOperator = "+";
    }
    else if (calculationType === "Subtract"){

        currentResult -= enteredNumber;
        mathOperator = "-";
    }
    else if (calculationType === "Divide"){

        currentResult /= enteredNumber;
        mathOperator = "/";
    }
    else {

        currentResult *= enteredNumber;
        mathOperator = "*";
    }

    CreateAndWriteOutPut(mathOperator, initialResult, enteredNumber);
    WriteToLog(calculationType, initialResult, enteredNumber, currentResult);
}

// Get input from input field
function GetUserNumberInput(){

    return parseInt(userInput.value);
}

function WriteToLog(operationIdentifier, prevResult, operationNumber, newResult){

    const logEntry = {
        
        operation: operationIdentifier,
        prevResult: prevResult,
        number: operationNumber,
        result: newResult
    };

    logEntries.push(logEntry);
    console.log(logEntries);
}

// Generates and writes calculation log
function CreateAndWriteOutPut(operator, resultBeforeCalc, calcNumber){

    const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
    outputResult(currentResult, calcDescription);
}

function Add(){
    
    CalculateResult("Add");
}

function Subtract(){
    
    CalculateResult("Subtract");
}

function Multiply(){
    
    CalculateResult("Multiply");
}

function Divide(){

    CalculateResult("Divide");
}
