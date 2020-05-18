let operators = [];
let currentNum = [];
let numbers = [];
let lastInput = [];
let settings = {
  vibrations: document.querySelector("#vibrationsSetting"),
};

function keyPressed(key) {
  settings.vibrations.checked ? vibrate() : "";

  const keyType = key.getAttribute("type");
  const keyText = key.textContent;

  //first input must be a number
  if (displayValue.length === 0 && keyType !== "number") return;
  if (displayValue.length > 15) return;

  switch (keyType) {
    case "clear": // C
      handleClear();
      break;

    case "equals": // ===
      if (operators.length > 0) {
        result = handleEquals();
        addToDisplay(result);
      }
      break;

    case "backspace":
      handleBackspace();
      deleteLastFromDisplay();
      break;

    case "operator": // (*, /, +, -)
      if (lastInput.type !== "operator") {
        handleOperator(keyText);
        addToDisplay(keyText);
      }
      break;

    case "number":
      handleNumber(keyText);
      addToDisplay(keyText);
      break;

    case "period":
      if (currentNum.length !== 0) {
        currentNum.push(keyText);
      }
      addToDisplay(keyText);
      break;
  }
  lastInput = {
    type: keyType,
    text: keyText,
  };
  console.table([
    ["numbers", numbers],
    ["operations", operators],
    ["currentNumber", currentNum],
    ["displayValue", displayValue],
  ]);
}

function handleClear() {
  resetValues();
  resetDisplay();
}

function handleNumber(keyText) {
  if (parseFloat(currentNum[0]) === 0) {
    currentNum = [];
    deleteLastFromDisplay();
  }
  currentNum.push(keyText);
}

function handleOperator(keyText) {
  operators.push(keyText);
  saveCurrentNumber();
}

function handleEquals() {
  if (lastInput.type === "operator") {
    operators.pop();
    deleteLastFromDisplay();
  }

  saveCurrentNumber();
  let evaluationResult;
  try {
    evaluationResult = evaluateOperation(numbers, operators);
  } catch (errorMessage) {
    displayDivisionByZero(errorMessage);
    return;
  }
  resetValues();
  currentNum.push(evaluationResult);
  return evaluationResult.toString();
}

function handleBackspace() {
  if (currentNum.length > 0) {
    currentNum.pop();
  } else if (displayGetLastChar() === getLastValue(operators)) {
    operators.pop();
  } else {
    lastNumber = getLastValue(numbers);
    lastNumberWoLastDigit = lastNumber.slice(0, -1);
    lastNumberWoLastDigit.length !== 0
      ? numbers.splice(-1, 1, lastNumberWoLastDigit)
      : numbers.splice(-1, 1);
    console.log(lastNumber);
  }
}

function saveCurrentNumber() {
  if (currentNum.length > 0) {
    numbers.push(currentNum.join(""));
    currentNum = [];
  }
}

function resetValues() {
  currentNum = [];
  numbers = [];
  operators = [];
  displayValue = [];
}

function addEventListeners() {
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    key.addEventListener("click", (event) => {
      keyPressed(event.target);
    });
  });
}

addEventListeners();
