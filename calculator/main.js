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

  if (!key) {
    display.textContent = "";
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
  for (let i = 0; i < operatorsArr.length; ) {
    let multiplicationIndex = operatorsArr.indexOf("*");
    let divisionIndex = operatorsArr.indexOf("/");
    let additionIndex = operatorsArr.indexOf("+");
    let substractionIndex = operatorsArr.indexOf("-");

    if (multiplicationIndex != -1) {
      numbersArr.splice(
        multiplicationIndex,
        2,
        numbersArr[multiplicationIndex] * numbersArr[multiplicationIndex + 1]
      );
      operatorsArr.splice(multiplicationIndex, 1);
    }

    if (divisionIndex != -1) {
      if (numbersArr[divisionIndex + 1] == 0) return "divisionByZero";
      numbersArr.splice(
        divisionIndex,
        2,
        numbersArr[divisionIndex] / numbersArr[divisionIndex + 1]
      );
      operatorsArr.splice(divisionIndex, 1);
    }

    if (additionIndex != -1) {
      numbersArr.splice(
        additionIndex,
        2,
        parseFloat(numbersArr[additionIndex]) +
          parseFloat(numbersArr[additionIndex + 1])
      );
      operatorsArr.splice(additionIndex, 1);
    }

    if (substractionIndex != -1) {
      numbersArr.splice(
        substractionIndex,
        2,
        numbersArr[substractionIndex] - numbersArr[substractionIndex + 1]
      );
      operatorsArr.splice(substractionIndex, 1);
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
