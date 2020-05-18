let displayValue = [];
let operators = [];
let currentNum = [];
let numbers = [];
let settings = {
  vibrations: document.querySelector("#vibrationsSetting"),
};

function buttonPressed(key) {
  if (settings.vibrations.checked) window.navigator.vibrate(5);

  const keyAttribute = key.getAttribute("type");
  const getLastValue = (array) => array[array.length - 1];
  const isLastIndexAnOperator =
    getLastValue(displayValue) !== 0 && !parseFloat(getLastValue(displayValue));

  //first input must be a number
  if (displayValue.length === 0 && keyAttribute !== "number") return;
  if (displayValue.length > 15) return;

  switch (keyAttribute) {
    case "clear": // C
      resetValues();
      addToDisplay("refresh");
      return;

    case "equals": // ===
      if (operators.length !== 0) {
        // if last index is an operator then delete it and evaluate
        if (isLastIndexAnOperator) operators.splice(getLastValue(operators), 1);
        numbers.push(currentNum.join(""));
        let result = evaluateOperation(numbers, operators);
        resetValues();
        result === "divisionByZero" ? "" : numbers.push(result);
        addToDisplay(result);
      }
      break;

    case "backspace":
      displayValue.pop();
      currentNum.pop();
      addToDisplay("refresh");
      return;

    case "operator": // (*, /, +, -)
      // if last index is not a number then dont add another operator
      if (isLastIndexAnOperator) return;
      operators.push(key.textContent);

      if (currentNum !== "") numbers.push(currentNum.join(""));
      currentNum = [];
      addToDisplay(key.textContent);
      return;

    // TODO
    case "percent":
      return;

    case "number":
      currentNum.push(key.textContent);
      addToDisplay(key.textContent);
  }
}

function addToDisplay(key) {
  const display = document.querySelector("#display");

  if (key === "refresh") {
    // displayValue.length === 0 ? displayValue.push("") : "";
    display.textContent = displayValue.join("");
    return;
  }

  if (key === "" || key === undefined) {
    display.textContent = "";
    return;
  }

  if (key === "divisionByZero") {
    display.textContent = "we don't do that here!";
    return;
  }

  //round up to 5th place
  if (key.toString().length > 5) {
    key = Math.round((parseFloat(key) + Number.EPSILON) * 100000) / 100000;
  }

  displayValue.push(key);
  display.textContent = displayValue.join("");
}

function resetValues() {
  currentNum = [];
  numbers = [];
  operators = [];
  displayValue = [];
}

/**
 * Look for the nearest index of the most important operator (*, / then + and -).
 * Replace two numbers bordering that operator with a result of respective operation.
 * Delete used operator from array and look for next most important.
 * Return the only array item after no operators left
 * [4, 5, 7], [+, *] => [4, 35], [+] => [39], []
 */
function evaluateOperation(numbersArr, operatorsArr) {
  function removeUsedOperator(index) {
    operatorsArr.splice(index, 1);
  }

  for (let i = 0; i < operatorsArr.length; ) {
    if (operatorsArr.includes("*")) {
      let multiplicationIndex = operatorsArr.indexOf("*");
      numbersArr.splice(
        multiplicationIndex,
        2,
        numbersArr[multiplicationIndex] * numbersArr[multiplicationIndex + 1]
      );
      removeUsedOperator(multiplicationIndex);
    }

    if (operatorsArr.includes("/")) {
      let divisionIndex = operatorsArr.indexOf("/");
      if (numbersArr[divisionIndex + 1] === 0) return "divisionByZero";
      numbersArr.splice(
        divisionIndex,
        2,
        numbersArr[divisionIndex] / numbersArr[divisionIndex + 1]
      );
      removeUsedOperator(divisionIndex);
    }

    if (operatorsArr.includes("+")) {
      let additionIndex = operatorsArr.indexOf("+");
      numbersArr.splice(
        additionIndex,
        2,
        parseFloat(numbersArr[additionIndex]) +
          parseFloat(numbersArr[additionIndex + 1])
      );
      removeUsedOperator(additionIndex);
    }

    if (operatorsArr.includes("-")) {
      let subtractionIndex = operatorsArr.indexOf("-");
      numbersArr.splice(
        subtractionIndex,
        2,
        numbersArr[subtractionIndex] - numbersArr[subtractionIndex + 1]
      );
      removeUsedOperator(subtractionIndex);
    }
  }
  return numbersArr[0];
}

function addEventListeners() {
  const keys = document.querySelectorAll(".key");

  keys.forEach((key) => {
    key.addEventListener("click", (e) => {
      buttonPressed(e.target);
    });
  });
}

addEventListeners();

// don't run the code in the browser where the 'module' does not exist
if (typeof module != "undefined") module.exports = evaluateOperation;
