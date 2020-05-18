/**
 * Look for the nearest index of the most important operator (*, / then + and -).
 * Replace two numbers bordering that operator with a result of respective operation.
 * Delete used operator from array and look for next most important.
 * Return the only array item after no operators left
 * [4, 5, 7], [+, *] => [4, 35], [+] => [39], []
 */
function evaluateOperation(numbersArr, operatorsArr) {
  var operationTypesObject = {
    "*": function (index) {
      return parseFloat(numbersArr[index]) * parseFloat(numbersArr[index + 1]);
    },
    "/": function (index) {
      if (parseFloat(numbersArr[index + 1]) === 0) throw "divisionByZero";
      return parseFloat(numbersArr[index]) / parseFloat(numbersArr[index + 1]);
    },
    "+": function (index) {
      return parseFloat(numbersArr[index]) + parseFloat(numbersArr[index + 1]);
    },
    "-": function (index) {
      return parseFloat(numbersArr[index]) - parseFloat(numbersArr[index + 1]);
    },
  };

  function performOperationOnTwoNumbers(sign, index) {
    numbersArr.splice(index, 2, operationTypesObject[sign](index));
  }
  function removeUsedOperator(index) {
    operatorsArr.splice(index, 1);
  }

  let operationTypesArr = Object.keys(operationTypesObject);
  operationTypesArr.forEach((operationType) => {
    while (operatorsArr.indexOf(operationType) !== -1) {
      let operationTypeIndex = operatorsArr.indexOf(operationType);
      performOperationOnTwoNumbers(operationType, operationTypeIndex);
      removeUsedOperator(operationTypeIndex);
    }
  });

  return numbersArr;
}

// don't run the code in the browser where the 'module' does not exist
if (typeof module != "undefined") module.exports = evaluateOperation;