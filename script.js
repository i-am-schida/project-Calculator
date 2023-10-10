// References to HTML
const outputDisplay = document.getElementById('output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('calculate');
const plusMinusButton = document.getElementById('pos-neg');
const percentButton = document.getElementById('percent');

// VARIABLES
let currentInput = '0';
let resultDisplay = '0';
let firstOperand = null;
let selectedOperator = null;
let decimalAdded = false;
let operatorClicked = false;

// FUNCTIONS:

// Function to update the result display
function updateDisplay() {
  outputDisplay.textContent = resultDisplay;
}

// Function to clear the result display
function clearDisplay () {
  currentInput = '0';
  resultDisplay = '0';
  firstOperand = null;
  selectedOperator = null;
  removeOperatorHighlight();
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
      case 'x':
        currentInput = (firstOperand * secondOperand).toString();
        break;
      case '÷':
        if (secondOperand === 0) {
          currentInput = 'Error';
        } else {
          currentInput = (firstOperand / secondOperand).toString();
        }
        break;
    }
    firstOperand = parseFloat(currentInput);
    selectedOperator = null;
    resultDisplay = currentInput;
    updateDisplay();
  }
}

// Function to highlight operator buttons
function highlightOperatorButton(operator) {
  operatorButtons.forEach((button) => {
    button.classList.remove('highlighted');
    if (button.textContent === operator) {
      button.classList.add('highlighted');
    }
  });
}

// Function to remove highlight from operator buttons
function removeOperatorHighlight() {
  operatorButtons.forEach((button) => {
    button.classList.remove('highlighted');
  });
}

// EVENT LISTENERS:

// number buttons
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const digit = button.textContent;

    if (!isNaN(currentInput) || currentInput === 'Error') {
      
      if (digit === '.' && currentInput.includes('.')) {
        return;
      }

      if (currentInput === '0' && digit !== '0' && digit !== '.') {
        currentInput = digit;
        
        if (operatorClicked) {
          removeOperatorHighlight();
          operatorClicked = false;
        }
      } else {
        currentInput += digit;
      }

      resultDisplay = currentInput;
      updateDisplay();
    }
  });
});

// operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;

    if (firstOperand === null) {
      firstOperand = parseFloat(currentInput);
      selectedOperator = operator;
      highlightOperatorButton(operator);
      currentInput = '';
      operatorClicked = true;
    } else if (selectedOperator !== null && currentInput !== '') {
      performCalculation();
      firstOperand = parseFloat(currentInput);
      selectedOperator = operator;
      highlightOperatorButton(operator);
      currentInput = '';
      operatorClicked = true;
    }
  });
});
// equal button
equalButton.addEventListener('click', () => {
  if (firstOperand !== null && selectedOperator !== null && currentInput !== '') {
    performCalculation();
    firstOperand = null;
    operatorClicked = false;
  }
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
    if (currentInput.startsWith('-')) {
      resultDisplay = `-${currentInput.substring(1)}`;
    } else {
      resultDisplay = currentInput;
    }
    updateDisplay();
  }
});

// percent button
percentButton.addEventListener('click', () => {

  if (!isNaN(currentInput)) {
    currentInput = (parseFloat(currentInput) / 100).toString();
    resultDisplay = currentInput;
    updateDisplay();
  }
});