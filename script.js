const monitorPart = document.querySelector(".monitor");
const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".op");
const clearKey = document.querySelector(".clear");
const deleteKey = document.querySelector(".delete");
const equalKey = document.querySelector(".equal");

let currentInput = "";
let previousInput = "";
let operator = "";
let shouldResetInput = false;

function onMonitor(event) {
    const value = event.target.innerText;
    if (value === "." && currentInput.includes(".")) return;
    if (shouldResetInput) {
        currentInput = value;
        shouldResetInput = false;
    } else {
        currentInput = currentInput === "0" ? value : currentInput + value;
    }
    monitorPart.innerHTML = currentInput;
}

function onDelete() {
    currentInput = "";
    previousInput = "";
    operator = "";
    monitorPart.innerHTML = "0";
}

function onClear() {
    currentInput = currentInput.slice(0, -1) || "0";
    monitorPart.innerHTML = currentInput;
}

function onOperator(event) {
    if (currentInput === "" && previousInput === "") return;
    if (currentInput === "") {
        currentInput = previousInput;
    }
    if (previousInput !== "" && operator) {
        calculate();
    } else {
        previousInput = currentInput;
    }
    operator = event.target.innerHTML;
    shouldResetInput = true;
}

function calculate() {
    if (previousInput === "" || currentInput === "") return;
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    switch (operator) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "*": result = num1 * num2; break;
        case "/": result = num2 !== 0 ? num1 / num2 : "Error"; break;
        case "%": result = num1 * (num2 / 100); break;
        default: return;
    }
    previousInput = result.toString();
    currentInput = "";
    monitorPart.innerHTML = previousInput;
    shouldResetInput = true;
}

function onEqual() {
    if (!operator || previousInput === "") return;
    if (currentInput === "") currentInput = previousInput;
    calculate();
    operator = "";
}

numberKeys.forEach(key => key.addEventListener("click", onMonitor));
operatorKeys.forEach(op => op.addEventListener("click", onOperator));
deleteKey.addEventListener("click", onDelete);
clearKey.addEventListener("click", onClear);
equalKey.addEventListener("click", onEqual);
