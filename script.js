// References to HTML
const outputDisplay = document.getElementById('output');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');

// VARIABLES
let currentInput = '0';


// FUNCTIONS:

// Function to update the result display
function updateDisplay() {
  outputDisplay.textContent = currentInput;
}

// EVENT LISTENERS:

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


operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const operator = button.textContent;
    currentInput = operator;
    updateDisplay();
  });
});
