let displayValue = [];
let display = document.querySelector("#display");

function addToDisplay(keyText, setting) {
  if (keyText !== "") {
    if (keyText.toString().length > 5) {
      keyText = roundUpToFive(keyText);
    }
    displayValue.push(keyText.toString());
    display.textContent = displayValue.join("");
  }

  //   if (key === "" || key === undefined) {
  //     display.textContent = "";
  //     return;
  //   } else if (key === "refresh") {
  //     // displayValue.length === 0 ? displayValue.push("") : "";
  //     display.textContent = displayValue.join("");
  //     return;
  //   } else if (key === "divisionByZero") {
  //     display.textContent = "we don't do that here!";
  //     return;
  //   }

  //   //round up to 5th place
  //   if (key.toString().length > 5) {
  //     key = Math.round((parseFloat(key) + Number.EPSILON) * 100000) / 100000;
  //   }
}

function deleteFromDisplay(charsToDelete) {
  displayValue.splice(-1, charsToDelete);
  display.textContent = displayValue.join("");
}
function resetDisplay() {
  displayValue = [];
  display.textContent = displayValue;
}

function displayDivisionByZero(errorMessage) {
  console.error(errorMessage);
  display.textContent = "you fool";
}

function displayGetLastChar() {
  return getLastValue(displayValue);
}
