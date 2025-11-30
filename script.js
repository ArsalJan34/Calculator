// Calculator Object
const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
};

// Update Display
function updateDisplay() {
    document.getElementById('display').textContent = calculator.displayValue;
}

// Error Toast (like your image)
function showToast(msg) {
    const div = document.createElement("div");
    div.textContent = msg;
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.padding = "12px 20px";
    div.style.color = "white";
    div.style.borderRadius = "10px";
    div.style.fontSize = "18px";
    div.style.background = "linear-gradient(to right, #0000ff, #ff0000)";
    div.style.zIndex = "999";

    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 1300);
}

// Input Digit
function inputDigit(digit) {
    if (calculator.waitingForSecondOperand) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue =
            calculator.displayValue === '0' ? digit : calculator.displayValue + digit;
    }
}

// Decimal Handling
function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Operator Handling (LIKE YOUR IMAGE LOGIC)
function handleOperator(nextOperator) {
    const lastValue = calculator.displayValue.slice(-1); // LAST character

    // Prevent operator spam + invalid sequences
    if (["+", "-", "*", "/"].includes(lastValue)) {
        showToast("Enter correct data sir");
        return;
    }

    const inputValue = parseFloat(calculator.displayValue);

    if (calculator.firstOperand === null) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        const result = calculate(calculator.firstOperand, inputValue, calculator.operator);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.operator = nextOperator;
    calculator.waitingForSecondOperand = true;
}

// Perform Calculation
function calculate(a, b, operator) {
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => b === 0 ? "Error" : a / b,
    };
    return operations[operator](a, b);
}

// Equals
function equals() {
    if (!calculator.operator) return;

    const inputValue = parseFloat(calculator.displayValue);
    const result = calculate(calculator.firstOperand, inputValue, calculator.operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

// Clear Calculator
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.operator = null;
    calculator.waitingForSecondOperand = false;
}

// Delete Last Digit (LIKE IMAGE)
function deleteDigit() {
    calculator.displayValue =
        calculator.displayValue.length > 1
            ? calculator.displayValue.slice(0, -1)
            : "0";
}

// BUTTON EVENT HANDLER
document.querySelector(".buttons").addEventListener("click", (event) => {
    const btn = event.target;
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    const actions = {
        number: () => inputDigit(value),
        decimal: () => inputDecimal(value),
        operator: () => handleOperator(value),
        equals: () => equals(),
        clear: () => resetCalculator(),
        delete: () => deleteDigit(),
    };

    if (action && actions[action]) {
        actions[action]();
        updateDisplay();
    }
});

// Initialize
updateDisplay();
