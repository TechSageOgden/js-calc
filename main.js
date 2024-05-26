class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    oneoverx() {
        let computation
        if (this.currentOperand === '') return
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return;
        computation = 1 / current
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    square() {
        let computation
        if (this.currentOperand === '') return
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return

        computation = current * current
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    squareRoot() {
        let computation
        if (this.currentOperand === '') return
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return

        computation = Math.sqrt(current)
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const oneOverXButton = document.querySelector('[data-onex]')
const squareButton = document.querySelector('[data-square]')
const squareRootButton = document.querySelector('[data-squareroot]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

console.log(oneOverXButton)

oneOverXButton.addEventListener('click', () => {
    calculator.oneoverx()
    calculator.updateDisplay()
})

squareButton.addEventListener('click', () => {
    calculator.square()
    calculator.updateDisplay()
})

squareRootButton.addEventListener('click', () => {
    calculator.squareRoot()
    calculator.updateDisplay()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})