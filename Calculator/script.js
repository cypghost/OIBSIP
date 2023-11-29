// JavaScript
let displayValue = '0';
let operator = '';
let result = 0;
let firstOperand = null;

const operators = ['+', '-', '*', '/', '%'];

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = displayValue;
}

function appendInput(value) {
    displayValue += value;
    updateDisplay();
}

function appendDigit(digit) {
    if (displayValue === '0') {
        displayValue = digit.toString();
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

function appendOperator(op) {
    displayValue += op;
    updateDisplay();
}

function setOperator(op) {
    operator = op;
    firstOperand = parseFloat(displayValue);
    displayValue = '0';
}

function useAns() {
    displayValue = result.toString();
    console.log(result);
    updateDisplay();
}

function appendDecimal() {
    const lastChar = displayValue.charAt(displayValue.length - 1);

    if (!displayValue.includes('.') && (lastChar === '' || !operators.includes(lastChar))) {
        displayValue += '.';
    }

    updateDisplay();
}

function togglePlusMinus() {
    const firstChar = displayValue.charAt(0);

    if (firstChar === '-') {
        displayValue = displayValue.slice(1);
    } else {
        displayValue = '-' + displayValue;
    }

    updateDisplay();
}

function calculateSquareRoot() {
    const currentValue = parseFloat(displayValue);

    if (currentValue >= 0) {
        displayValue = Math.sqrt(currentValue).toString();
        updateDisplay();
    } else {
        alert("Cannot calculate square root of a negative number");
    }
}

function clearDisplay() {
    displayValue = '0';
    result = 0;
    updateDisplay();
}

function deleteLastChar() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
        updateDisplay();
    } else if (displayValue !== '0') {
        // Set to '0' if the current value is between 1 and 9
        displayValue = '0';
        updateDisplay();
    }
}

function enter() {
    const secondOperand = parseFloat(displayValue);
    console.log(secondOperand, "1")
    console.log(firstOperand, "2")
    console.log(operator, "3")
    
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        case '%':
            result = firstOperand % secondOperand;
            break;
        default:
            result = secondOperand; // If no operator set, use the current value as the result
    }
    displayValue = result.toString();
    updateDisplay();
    operator = '';
    firstOperand = result;
}

// Event Listeners for Equals and Square Root Buttons
document.getElementById('btnEnter').addEventListener('click', enter);
document.getElementById('btnSquareRoot').addEventListener('click', calculateSquareRoot);
document.getElementById('btnAns').addEventListener('click', useAns);

// Event Listeners for Digit Buttons
for (let i = 0; i <= 9; i++) {
    document.getElementById(`btn${i}`).addEventListener('click', () => appendDigit(i));
}

// Event Listeners for Operator Buttons
document.getElementById('btnPlus').addEventListener('click', () => setOperator('+'));
document.getElementById('btnMinus').addEventListener('click', () => setOperator('-'));
document.getElementById('btnMultiply').addEventListener('click', () => setOperator('*'));
document.getElementById('btnDivide').addEventListener('click', () => setOperator('/'));
document.getElementById('btnDelete').addEventListener('click', deleteLastChar);
