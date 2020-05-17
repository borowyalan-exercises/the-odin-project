let displayValue = [];
let operators = [];
let currentNum = "";
let numbers = [];

function buttonPressed(key) {
  const keyAttribute = key.getAttribute("type");

  //first input must be a number
  if (displayValue.length == 0 && keyAttribute != "number") return;

  switch (keyAttribute) {
    case "clear": // C
      resetValues();
      addToDisplay();
      return;

    case "equals": // ==
      // if last index is not a number then don't evaluate
      if (
        displayValue[displayValue.length - 1] != 0 &&
        !parseFloat(displayValue[displayValue.length - 1])
      )
        return;
      numbers.push(currentNum);
      let result = evaluateOperation(numbers, operators);
      resetValues();
      result == "divisionByZero" ? "" : numbers.push(result);
      addToDisplay(result);
      return;

    case "operator": // (*, /, +, -)
      // if last index is not a number then dont add another operator
      if (
        displayValue[displayValue.length - 1] != 0 &&
        !parseFloat(displayValue[displayValue.length - 1])
      )
        return;
      operators.push(key.textContent);
      if (currentNum != "") numbers.push(currentNum);
      currentNum = "";
      addToDisplay(key.textContent);
      return;

    default:
      // number
      currentNum = currentNum.concat(key.textContent);
      addToDisplay(key.textContent);
  }
}

function addToDisplay(key) {
  const display = document.querySelector("#display");

  if (!key || key == undefined) {
    display.textContent = "";
    return;
  }

  if (key == "divisionByZero") {
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
  currentNum = "";
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
      if (numbersArr[divisionIndex + 1] == 0) return "divisionByZero";
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
if(typeof module != "undefined") module.exports = evaluateOperation;
