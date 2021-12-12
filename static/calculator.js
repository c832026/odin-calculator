function add(num1, num2) {
    const result = num1 + num2;
    return result.toString();
}

function subtract(num1, num2) {
    const result = num1 - num2;
    return result.toString();
}

function multiply(num1, num2) {
    const result = num1 * num2;
    return result.toString();
}

function divide(num1, num2) {
    const result = num1 / num2;
    return result.toString();
}

function operate(operator, num1, num2) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}

function display(event) {
    // Store the value of button pressed
    const btnValue = event.target.textContent;

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

    // Check if '.' button is pressed
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

    // Check if '+' or '-' button is pressed
    if (btnValue === '+' || btnValue === '-') {
        // Check if the two operands and operator already have value
        if (FIRST_OPERAND && OPERATOR) {
            if (!SECOND_OPERAND) {
                SECOND_OPERAND = FIRST_OPERAND;
            }
            // Show the expression as a previous record
            PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;

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

    // Check if '*' or '/' button is pressed
    if (btnValue === '*' || btnValue ==='/') {
        // Check if the two operands and operator already have value
        if (FIRST_OPERAND && OPERATOR) {
            if (!SECOND_OPERAND) {
                SECOND_OPERAND = FIRST_OPERAND;
            }
            // Show the expression as a previous record
            PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;

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
    
    // Check if '=' button is pressed
    if (btnValue === '=' && SECOND_OPERAND) {
        // Show the expression as a previous record
        PREVIOUS.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;

        // Calculate the answer then reset the operands and operator        
        QUOCIENT = operate(OPERATOR, parseFloat(FIRST_OPERAND), parseFloat(SECOND_OPERAND));
        FIRST_OPERAND = QUOCIENT;
        SECOND_OPERAND = '';
        OPERATOR = '';
    }

    // Update display text
    DISPLAY.textContent = `${FIRST_OPERAND} ${OPERATOR} ${SECOND_OPERAND}`;
}


const DISPLAY = document.querySelector('#display-current');
const PREVIOUS = document.querySelector('#display-previous');
const BTNS = document.querySelectorAll('.btn-container button');
let FIRST_OPERAND = '';
let SECOND_OPERAND = '';
let OPERATOR = '';
let QUOCIENT = '';
// Event Listener for buttons
BTNS.forEach(btn => {btn.addEventListener('click', display);});


// Todo list and knowing Issues : 
// 1. (num / 0 ) will result in infinity, try display in error message
// 2. Reset, Delete buttons functions haven't set
// 3. Precision problem
// 4. CSS style
// 5. Keyboard inputs support