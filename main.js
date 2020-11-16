const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const updateDisplay = () => {
  const display = document.querySelector(".screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }

  console.log(calculator);
}

const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const currentValue = firstOperand || 0;
    const result = performCalculation[operator](currentValue, inputValue);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,

  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,

  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,

  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,

  "=": (firstOperand, secondOperand) => secondOperand,
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
