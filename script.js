class Calculator {
  constructor(inputHistory, input) {
    this.inputHistory = inputHistory;
    this.input = input;
    this.previousOperand = "";
  }

  clear() {
    this.input.innerText = "";
    this.inputHistory.innerText = "";
    this.operation = "";
    this.previousOperand = "";
  }

  delete() {
    let input = this.input.innerText.toString();
    if (input.length <= 1) {
      this.input.innerText = 0;
    } else {
      this.input.innerText = Number(input.slice(0, -1));
    }
  }

  updateDisplay() {
    if (this.operation != null && this.previousOperand !== "") {
      this.inputHistory.innerText =
        this.previousOperand.toString() + this.operation.toString();
    } else if (
      this.operation != null &&
      this.previousOperand === "" &&
      this.input.innerText === ""
    ) {
      this.input.innerText = this.operation.toString();
    } else {
      this.inputHistory.innerText = "";
    }
  }

  calculate() {
    let calculation = 0;
    let current = Number(this.input.innerText);
    let previous = Number(this.previousOperand);
    if (!current && !previous) {
      return;
    }
    switch (this.operation) {
      case "+":
        calculation = current + previous;
        break;
      case "-":
        if (current < 0 && previous === 0) {
          calculation = current;
          break;
        }
        calculation = previous - current;
        break;
      case "*":
        calculation = current * previous;
        break;
      case "÷":
        calculation = previous / current;
        break;
      case "^":
        calculation = previous ** current;
        break;
      case "√":
        calculation = Math.sqrt(previous);
        break;

      default:
        return;
    }
    if (!isFinite(calculation)) {
      calculation = "error";
      this.previousOperand = "";
    } else if (calculation.toString().length > 10) {
      calculation =
        Math.round(Number(calculation.toString().substring(0, 10)) * 100) / 100;
    }

    this.input.innerText = calculation;
    this.previousOperand = calculation;

    this.inputHistory.innerText = "";
    this.operation = "";
  }

  addNumber(num) {
    if (num === "." && this.input.innerText.indexOf(".") > -1) return;
    this.input.innerText = this.input.innerText.toString() + num.toString();
  }

  chooseOperation(operation) {
    this.operation = operation;
    if (this.input.innerText.length === 0 && this.operation !== "-") {
      this.operation = operation;
      return;
    }
    this.previousOperand = this.input.innerText;
    this.input.innerText = "";
  }

  invert() {
    this.input.innerText = -this.input.innerText;
  }

  root() {
    if (this.input.innerText < 0) {
      this.input.innerText = "error";
    } else {
      this.input.innerText = Math.sqrt(this.input.innerText);
    }
  }
}

const numberButtons = document.getElementsByClassName("number");
const operationButtons = document.getElementsByClassName("operation");
const equalButton = document.getElementById("equal");
const deleteButton = document.getElementById("delete");
const allClearButton = document.getElementById("allClear");
const inputHistory = document.getElementById("inputHistory");
const input = document.getElementById("input");
const invert = document.getElementById("invert");

const calculator = new Calculator(inputHistory, input);

for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", () => {
    calculator.addNumber(numberButtons[i].innerText);
    calculator.updateDisplay();
  });
}

for (let i = 0; i < operationButtons.length; i++) {
  operationButtons[i].addEventListener("click", () => {
    let last = this.inputHistory.innerText;
    if (last && isNaN(Number(last)) && !this.input.innerText) {
      return;
    }
    calculator.calculate();
    calculator.chooseOperation(operationButtons[i].innerText);
    calculator.updateDisplay();
  });
}

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
});

equalButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

invert.addEventListener("click", () => {
  calculator.invert();
});
