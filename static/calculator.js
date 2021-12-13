function add(num1, num2) {
    const result = num1 + num2;
    return result.toString();
}

function subtract(num1, num2) {
    const result = num1 - num2;
    return result.toString();
}

function multiply(num1, num2) {
    const result = parseFloat((num1 * num2).toFixed(9));
    return result.toString();
}

function divide(num1, num2) {
    const result = parseFloat((num1 / num2).toFixed(9));
    return result.toString();
}

function operate(operator, num1, num2) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

function display(event) {
    let btnValue;
    // Store the value when button clicked or key pressed
    if (event.type === 'click') {
        btnValue = event.target.textContent;
    } else if (event.type === 'keydown') {
        // Prevent the default behaviors of browsers
        event.preventDefault();
        btnValue = event.key;
    }

    // Check if one of 0-9 button is pressed
    if (!Number.isNaN(parseInt(btnValue))) {
        // Check value belongs first operand or second operand
        if (!OPERATOR) {
            FIRST_OPERAND += btnValue;
            // Update display text
        } else {
            SECOND_OPERAND += btnValue;
        }
    }

    if (btnValue === '.') {
        // Set the first operand to '0.' if don't have a value yet
        if (!FIRST_OPERAND) {
            FIRST_OPERAND = '0.';
        }
        // Update the first operand if operator's not been set and first operand is valid integer with no '.' yet
        if (!OPERATOR && FIRST_OPERAND && FIRST_OPERAND !== '+' && FIRST_OPERAND !== '-' && !FIRST_OPERAND.includes('.')) {
            FIRST_OPERAND += '.';
        }
        // Update the second operand to '0.' if has no value when the operator is set
        if (OPERATOR && !SECOND_OPERAND) {
            SECOND_OPERAND = '0.';
        }
        // Update the second operand if operator's been set and second operand is valid integer with no '.' yet
        if (OPERATOR && !SECOND_OPERAND.includes('.')) {
            SECOND_OPERAND += '.';
        }
    }

    if (btnValue === '+' || btnValue === '-') {
        // Check if the two operands and operator already have value
        if (FIRST_OPERAND && OPERATOR) {
            if (!SECOND_OPERAND) {
                SECOND_OPERAND = FIRST_OPERAND;
            }
            // Show the expression as a previous record
            PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;

            // Display error if user trys "num / 0"
            if (OPERATOR === '/' && (parseFloat(SECOND_OPERAND) === 0)) {
                DISPLAY.textContent = 'Error: Divide by zero';
                // Reset operands and operator
                FIRST_OPERAND = '';
                SECOND_OPERAND = '';
                OPERATOR = '';
                return;
            }

            // Calculate the answer then reset the operands the operator
            QUOCIENT = operate(OPERATOR, parseFloat(FIRST_OPERAND), parseFloat(SECOND_OPERAND));
            FIRST_OPERAND = QUOCIENT;
            SECOND_OPERAND = '';
            OPERATOR = btnValue;
        }
        // Set the first operand to negative or positve if don't has a value yet
        if (!FIRST_OPERAND || FIRST_OPERAND === '+' || FIRST_OPERAND === '-') {
            FIRST_OPERAND = btnValue;
        // Set the operator when first operand has valid value
        } else {
            OPERATOR = btnValue;
        }
    }

    if (btnValue === '*' || btnValue ==='/') {
        // Check if the two operands and operator already have value
        if (FIRST_OPERAND && OPERATOR) {
            if (!SECOND_OPERAND) {
                SECOND_OPERAND = FIRST_OPERAND;
            }
            // Show the expression as a previous record
            PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;
            
            // Display error if user trys "num / 0"
            if (OPERATOR === '/' && (parseFloat(SECOND_OPERAND) === 0)) {
                DISPLAY.textContent = 'Error: Divide by zero';
                // Reset operands and operator
                FIRST_OPERAND = '';
                SECOND_OPERAND = '';
                OPERATOR = '';
                return;
            }

            // Calculate the answer then reset the operands and operator
            QUOCIENT = operate(OPERATOR, parseFloat(FIRST_OPERAND), parseFloat(SECOND_OPERAND));
            FIRST_OPERAND = QUOCIENT;
            SECOND_OPERAND = '';
            OPERATOR = btnValue;
        }
        // Set the operator when first operand has valid value
        if (FIRST_OPERAND && FIRST_OPERAND !== '+' && FIRST_OPERAND !== '-')
        OPERATOR = btnValue;
    }
    
    if ((btnValue === '=' || btnValue === 'Enter') && SECOND_OPERAND) {
        // Show the expression as a previous record
        PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;

        // Display error if user trys "num / 0"
        if (OPERATOR === '/' && (parseFloat(SECOND_OPERAND) === 0)) {
            DISPLAY.textContent = 'Error: Divide by zero';
            // Reset operands and operator
            FIRST_OPERAND = '';
            SECOND_OPERAND = '';
            OPERATOR = '';
            return;
        }

        // Calculate the answer then reset the operands and operator        
        QUOCIENT = operate(OPERATOR, parseFloat(FIRST_OPERAND), parseFloat(SECOND_OPERAND));
        FIRST_OPERAND = QUOCIENT;
        SECOND_OPERAND = '';
        OPERATOR = '';
    }

    // Reset operands and operator in quocient when reset-button is clicked
    if (btnValue === 'Reset') {
        PREVIOUS.textContent = '';
        FIRST_OPERAND = '';
        SECOND_OPERAND = '';
        OPERATOR = '';
        QUOCIENT = '';
    }

    // Delete the last user input
    if (btnValue === 'Delete') {
        if (SECOND_OPERAND) {
            SECOND_OPERAND = SECOND_OPERAND.slice(0, -1);
        } else if (OPERATOR) {
            OPERATOR = OPERATOR.slice(0, -1);
        } else if (FIRST_OPERAND) {
            FIRST_OPERAND = FIRST_OPERAND.slice(0, -1);
        }
    }

    // Update display text
    DISPLAY.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;
}


const DISPLAY = document.querySelector('#display-current');
const PREVIOUS = document.querySelector('#display-previous');
const BTNS = document.querySelectorAll('.btn-container button');
const RESET = document.querySelector('#reset');
const DELETE = document.querySelector('#delete');
let FIRST_OPERAND = '';
let SECOND_OPERAND = '';
let OPERATOR = '';
let QUOCIENT = '';
// Event listener for buttons
BTNS.forEach(btn => {btn.addEventListener('click', display);});

// Event listener for keys
document.addEventListener('keydown', display);

// Todo list and knowing Issues : 
    // CSS style 