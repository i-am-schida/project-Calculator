// References to HTML
const outputDisplay = document.getElementById('output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');

// VARIABLES
let currentInput = '0';


// FUNCTIONS:

// Function to update the result display
function updateDisplay() {
  outputDisplay.textContent = currentInput;
}

// Function to clear the result display
function clearDisplay () {
  currentInput = '0';
  updateDisplay();
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
    currentInput = operator;
    updateDisplay();
  });
});
// clear button
clearButton.addEventListener('click', () => {
  clearDisplay();
});