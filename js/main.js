let objOperationData = {
  queryIntegerButtons: document.querySelectorAll(".btn"),
  input: document.querySelector(".calculator-display-input"),
  output: document.querySelector(".calculator-display-output"),
  error: document.querySelector(".error-display"),
  num1: 0,
  num2: 0,
  operatorSign: "",
  deleteIndex: -1,
};

function addNums(a, b) {
  return roundNumber(+a + +b);
}

function subtractNums(a, b) {
  return roundNumber(+a - +b);
}

function multiplyNums(a, b) {
  return roundNumber(+a * +b);
}

function divideNums(a, b) {
  if (b === "0") {
    displayError();
    return 0;
  } else {
    return roundNumber(+a / +b);
  }
}

function displayError() {
  objOperationData.error.textContent = "Yeah right! Try harder next time... 😡";
  setTimeout(() => {
    objOperationData.error.textContent = "";
  }, 2000);
}

function operate(sign, num1, num2) {
  switch (sign) {
    case "+":
      return addNums(num1, num2);
    case "−":
      return subtractNums(num1, num2);
    case "×":
      return multiplyNums(num1, num2);
    case "÷":
      return divideNums(num1, num2);
    case "=":
      return "I'm yet to get this right";
    default:
      return "this was just a test";
  }
}

function roundNumber(num) {
  if (num.toString().includes(".") & (num.toString().length > 5)) {
    return num.toFixed(5);
  } else {
    return num;
  }
}

function resetCalculator(objData) {
  Object.keys(objData).forEach((key, index) => {
    if (key.includes("num")) {
      objData[key] = 0;
    } else if (key.includes("Sign")) {
      objData[key] = "";
    } else if (key.includes("input")) {
      objData[key].value = 0;
    } else if (key.includes("output") | key.includes("error")) {
      objData[key].value = "";
    }
  });
}

function handlePeriod(button) {
  if (!objOperationData.input.value.toString().includes(".")) {
    objOperationData.input.value += button.textContent;
  }
  if (objOperationData.operatorSign === "") {
    objOperationData.num1 = objOperationData.input.value;
  } else {
    objOperationData.num2 = objOperationData.input.value;
  }
}

function handleZero(button) {
  if (objOperationData.input.value === "0") {
  }
}

function handleNums(button) {
  if (objOperationData.operatorSign === "") {
    if (objOperationData.num1 === 0) {
      objOperationData.input.value = button.textContent;
    } else {
      objOperationData.input.value += button.textContent;
    }
    objOperationData.num1 = objOperationData.input.value;
  } else if (objOperationData.num2 === 0) {
    objOperationData.input.value = button.textContent;
    objOperationData.num2 = objOperationData.input.value;
  } else if (objOperationData.num2 !== 0) {
    objOperationData.input.value += button.textContent;
    objOperationData.num2 = objOperationData.input.value;
  }
}

function handleNegativeNums() {
  if (!objOperationData.input.value.toString().includes("-")) {
    let tempArr = objOperationData.input.value.split("");
    tempArr.unshift("-");
    objOperationData.input.value = tempArr.join("");
  } else {
    objOperationData.input.value = objOperationData.input.value.substring(1);
  }
  if (objOperationData.operatorSign === "") {
    objOperationData.num1 = objOperationData.input.value;
  } else {
    objOperationData.num2 = objOperationData.input.value;
  }
}

function handleOperators(button) {
  if (objOperationData.num2 === 0) {
  } else {
    objOperationData.num1 = operate(
      objOperationData.operatorSign,
      objOperationData.num1,
      objOperationData.num2
    );
    objOperationData.num2 = 0;
    objOperationData.output.value = objOperationData.num1;
  }
  objOperationData.operatorSign = button.textContent;
  objOperationData.input.value = 0;
}

function handleEquals() {
  if (objOperationData.operatorSign === "") {
    objOperationData.output.value = objOperationData.num1 | 0;
  } else {
    objOperationData.output.value = operate(
      objOperationData.operatorSign,
      objOperationData.num1,
      objOperationData.num2 | 0
    );
  }
  objOperationData.input.value = 0;
}

function handleBackspace() {
  if (objOperationData.input.value) {
    objOperationData.input.value =
      objOperationData.input.value.substring(
        0,
        objOperationData.input.value.length - 1
      ) | 0;
    if (objOperationData.operatorSign) {
      objOperationData.num2 = objOperationData.input.value;
    } else {
      objOperationData.num1 = objOperationData.input.value;
    }
  }
}

objOperationData.queryIntegerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === ".") {
      handlePeriod(button);
    } else if (button.textContent / 1 >= 0) {
      if (button.textContent === "0") {
        handleZero(button);
      } else {
        handleNums(button);
      }
    } else if (button.textContent === "C") {
      if (confirm("are you sure you want to clear?")) {
        resetCalculator(objOperationData);
      }
    } else if (button.textContent === "±") {
      handleNegativeNums();
    } else if (
      (button.textContent === "÷") |
      (button.textContent === "×") |
      (button.textContent === "+") |
      (button.textContent === "−")
    ) {
      handleOperators(button);
    } else if (button.textContent === "=") {
      handleEquals();
    } else if (button.textContent === "←") {
      handleBackspace();
    }
  });
});
