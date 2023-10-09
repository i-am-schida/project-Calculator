// References to HTML
const outputDisplay = document.getElementById('output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('calculate');
const plusMinusButton = document.getElementById('pos-neg');

// VARIABLES
let currentInput = '0';
let firstOperand = null;
let selectedOperator = null;

// FUNCTIONS:

// Function to update the result display
function updateDisplay() {
  outputDisplay.textContent = currentInput;
}

// Function to clear the result display
function clearDisplay () {
  currentInput = '0';
  firstOperand = null;
  selectedOperator = null;
  updateDisplay();
}

// Function for arithmetic operations
function performCalculation() {
  if (firstOperand !== null && selectedOperator !== null) {
    const secondOperand = parseFloat(currentInput);
    switch (selectedOperator) {
      case '+':
        currentInput = (firstOperand + secondOperand).toString();
        break;
      case '-':
        currentInput = (firstOperand - secondOperand).toString();
        break;
      case '*':
        currentInput = (firstOperand * secondOperand).toString();
        break;
      case '/':
        if (secondOperand === 0) {
          currentInput = 'Error';
        } else {
          currentInput = (firstOperand / secondOperand).toString();
        }
        break;
    }
    firstOperand = parseFloat(currentInput);
    selectedOperator = null;
  }
}

// EVENT LISTENERS:

// number buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const digit = button.textContent;

    if (currentInput === '0' || currentInput === '-0') {
      currentInput = digit;
    } else {
      currentInput += digit;
    }

    updateDisplay();
  });
});
// operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;

    if (selectedOperator !== null) {
      performCalculation();
    }

    firstOperand = parseFloat(currentInput);
    selectedOperator = operator;
    currentInput = '';
    updateDisplay();
  });
});
// equal button
equalButton.addEventListener('click', () => {
  performCalculation();
  updateDisplay();
});
// clear button
clearButton.addEventListener('click', () => {
  clearDisplay();
});
// plus or minus button
plusMinusButton.addEventListener('click', () => {
  
  if (!isNaN(currentInput)) {
    currentInput = (-parseFloat(currentInput)).toString();
    updateDisplay();
  }
});