const add = (x, y) => {
    firstNumber = x + y;
    equate(firstNumber);
};

const subtract = (x, y) => {
    firstNumber = x - y;
    equate(firstNumber);
};

const multiply = (x, y) => {
    firstNumber = x * y;
    equate(firstNumber);
};

const divide = (x, y) => {
    firstNumber = x / y;
    equate(firstNumber);
};

let firstNumber = "";
let secondNumber = "";
let operator = "";
let operatorSelected = false;

const operate = (firstNumber, operator, secondNumber) => {
    if(operator == "+")
        add(firstNumber, secondNumber)
    else if(operator == "-")
        subtract(firstNumber, secondNumber)
    else if(operator == "x")
        multiply(firstNumber, secondNumber)
    else if(operator == "÷")
        divide(firstNumber, secondNumber)
};

const checkForOperator = (text) => {
    let operatorValues = ["+", "-", "x", "÷"];
    return operatorValues.some(op => text.includes(op))
}

const display = document.getElementsByClassName("display");
const button = document.getElementsByTagName("button");
let displayValue = display[0];

const equate = (value) => {
    displayValue.innerText = value;
};

const updateDisplay = (buttonPressed) => {
    if(operator.length == 0){
        if(checkForOperator(buttonPressed)){
            if (firstNumber.length == 0){
                return clearDisplay();
            } else {
                operator = buttonPressed;
                displayValue.innerText = `${firstNumber}${operator}`;
            }

        } else {
            firstNumber += buttonPressed
            displayValue.innerText = `${firstNumber}`;
        }
    } else {
        if(!checkForOperator(buttonPressed)){
            if(secondNumber.length == 0 && buttonPressed == 0)
                return;
            else
                secondNumber += buttonPressed;
        }
        else
            operator = buttonPressed;
        displayValue.innerText = `${firstNumber}${operator}${secondNumber}`;
    }
};

const clearDisplay = () => {
        firstNumber = "";
        secondNumber = "";
        operator = "";
        displayValue.innerText = "0";
};

const secondOperatorSelected = (buttonPressed) => {
    if (checkForOperator(buttonPressed) && operator.length == 0 && secondNumber.length > 0){
        return true;
    }
    else
        return false;
};

const buttonPress = (button) => {
    let buttonPressed = button.srcElement.innerText;

    if(buttonPressed == "=" || secondOperatorSelected(buttonPressed)){
        operate(parseInt(firstNumber), operator, parseInt(secondNumber));
    } else if(buttonPressed == "C"){
        return clearDisplay();
    } else if(firstNumber.length != 0 && operator.length != 0 && secondNumber != 0 && checkForOperator(buttonPressed)){
        operate(parseInt(firstNumber), operator, parseInt(secondNumber));
        operator = buttonPressed;
        secondNumber = "";
        displayValue.innerText = `${firstNumber}${operator}`
    }
    else if(operator.length != 0 && checkForOperator(buttonPressed) && firstNumber.length != 0){
            return updateDisplay(buttonPressed);
    } else {
        if (buttonPressed == 0 && firstNumber.length == 0)
            return clearDisplay();
        updateDisplay(buttonPressed);
    }
};

for(let i = 0; i < button.length; i++){
    button[i].addEventListener('click', buttonPress);
};