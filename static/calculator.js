function add(num1, num2) {
    const result = num1 + num2;
    return result;
}

function subtract(num1, num2) {
    const result = num1 - num2;
    return result;
}

function multiply(num1, num2) {
    const result = num1 * num2;
    return result;
}

function divide(num1, num2) {
    const result = num1 / num2;
    return result;
}

function operate(operator, num1, num2) {
    if (operator === '+') return add(num1, num2);
    if (operator === '-') return subtract(num1, num2);
    if (operator === '*') return multiply(num1, num2);
    if (operator === '/') return divide(num1, num2);
}