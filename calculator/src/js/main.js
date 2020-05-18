let operators = [];
let currentNum = [];
let numbers = [];
let lastInput = [];
let lastAnswer = [];
let settings = {
  vibrations: document.querySelector("#vibrationsSetting"),
};

function keyPressed(keyText, keyType) {
  settings.vibrations.checked ? vibrate() : "";

  //first input must be a number
  if (displayValue.length === 0 && keyType !== "number" && keyType !== "answer")
    return;
  if (displayValue.length > 15 && keyType === "number") return;

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
      deleteFromDisplay(1);
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
      if (currentNum.length !== 0 && !currentNum.find((el) => el === ".")) {
        currentNum.push(keyText);
        addToDisplay(keyText);
      }
      break;

    case "answer":
      if (
        lastAnswer.length > 0 &&
        currentNum.length + numbers.length + lastAnswer[0].length <= 10
      ) {
        deleteFromDisplay(currentNum.length);
        currentNum = currentNum.concat(lastAnswer);
        console.log(lastAnswer);
        addToDisplay(lastAnswer);
      }
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
    ["lastAnswer", lastAnswer],
  ]);
}
// ================================================================

function handleClear() {
  resetValues();
  resetDisplay();
}

function handleNumber(keyText) {
  if (currentNum[0] == 0 && currentNum.length < 2) {
    currentNum = [];
    deleteFromDisplay(1);
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
    deleteFromDisplay(1);
  }

  saveCurrentNumber();
  let evaluationResult;
  try {
    evaluationResult = evaluateOperation(numbers, operators);
    evaluationResult[0] = evaluationResult[0].toString();
  } catch (errorMessage) {
    displayDivisionByZero(errorMessage);
    return;
  }
  resetValues();
  console.log(currentNum, evaluationResult);

  lastAnswer = lastAnswer.concat(evaluationResult);
  currentNum = currentNum.concat(evaluationResult);
  return evaluationResult.join("").toString();
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
  lastAnswer = [];
}

function addEventListeners() {
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    key.addEventListener("click", (event) => {
      keyPressed(key.textContent, key.getAttribute("type"));
    });
  });

  window.addEventListener("keydown", (event) => {
    let operators = ["*", "/", "+", "-"];
    let key = event.key;
    let keyType;

    if (key === "Escape" || key === "c" || key == "Delete") {
      keyType = "clear";
    } else if (key === "Enter") {
      keyType = "equals";
    } else if (key >= 0 && key <= 9) {
      keyType = "number";
    } else if (operators.includes(key)) {
      keyType = "operator";
    } else if (key === ".") {
      keyType = "period";
    } else if (key === "Backspace") {
      keyType = "backspace";
    } else if (key === "a" || key === "n") {
      keyType = "answer";
    }
    keyPressed(key, keyType);
  });
}

addEventListeners();
