// Calculator Object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
};

// Function to update the display
function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = calculator.displayValue;
}

// Handle number input
function inputDigit(digit) {
    calculator.displayValue =
        calculator.waitingForSecondOperand ? digit : (calculator.displayValue === '0' ? digit : calculator.displayValue + digit);
    calculator.waitingForSecondOperand = false;
}

// Handle decimal point
function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Handle operator
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    const performCalculation = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b === 0 ? 'Error' : a / b
    };

    if (calculator.operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result === 'Error' ? null : result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

// Reset calculator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

// Delete last digit
function deleteDigit() {
    calculator.displayValue = calculator.displayValue.length > 1 ? calculator.displayValue.slice(0, -1) : '0';
}

// Event listener for buttons
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', event => {
    const { target } = event;
    const action = target.dataset.action;
    const value = target.dataset.value;

    const actions = {
        'number': () => inputDigit(value),
        'decimal': () => inputDecimal(value),
        'operator': () => handleOperator(value),
        'equals': () => handleOperator(null),
        'clear': () => resetCalculator(),
        'delete': () => deleteDigit()
    };

    if (action && actions[action]) {
        actions[action]();
        updateDisplay();
    }
});

// Initialize display
updateDisplay();
