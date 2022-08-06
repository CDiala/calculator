let objCalculator = {
  buttons: document.querySelectorAll(".btn"),
  input: document.querySelector(".calculator-display-input"),
  output: document.querySelector(".calculator-display-output"),
  error: document.querySelector(".error-display"),
  num1: "0",
  num2: "0",
  sign: "",
};

objCalculator.buttons.forEach((button) => {
  let text = button.textContent;
  button.addEventListener("click", (e) => {
    // console.log(e);
    if (!button.dataset.action) {
      if (text === "0") {
        if (
          (!objCalculator.sign && objCalculator.num1 === "0") ||
          (objCalculator.sign && objCalculator.num2 === "0")
        ) {
        } else if (objCalculator.num1 === "0" && !objCalculator.sign) {
          updateNumber(objCalculator, "num1", text);
        } else if (objCalculator.num1 !== "0" && !objCalculator.sign) {
          let str = convertToString(objCalculator.num1);
          str = appendString(str, text);
          updateNumber(objCalculator, "num1", str);
        }
      } else if (objCalculator.num1 === "0" && !objCalculator.sign) {
        updateNumber(objCalculator, "num1", text);
      } else if (objCalculator.num1 !== "0" && !objCalculator.sign) {
        let str = convertToString(objCalculator.num1);
        str = appendString(str, text);
        updateNumber(objCalculator, "num1", str);
      }
    } else if (text === ".") {
      if (!objCalculator.input.value.includes(".")) {
        let str = convertToString(
          !objCalculator.sign ? objCalculator.num1 : objCalculator.num2
        );
        str = appendString(str, text);
        updateNumber(objCalculator, !objCalculator.sign ? "num1" : "num2", str);
      }
      // displayNumber(objCalculator.input, objCalculator.num1);
    } else if (text === "←") {
      deleteNumber(objCalculator, "input");
    } else if (text === "÷" || text === "×" || text === "−" || text === "+") {
      if (objCalculator.num2 === "0") {
        console.log("special char detected:", text);
        updateNumber(objCalculator, "sign", text);
      } else {
        console.log("perform operation");
      }
    }
    displayNumber(objCalculator.input, objCalculator.num1);
    // console.log(objCalculator);
  });
});

function updateNumber(obj, prop, value) {
  obj[prop] = value;
}

function convertToString(num) {
  return num.toString();
}

function appendString(oldVal, str) {
  return oldVal + str;
}

function displayNumber(field, value) {
  field.value = value;
}

function deleteNumber(obj, prop) {
  let charLength;
  let newStr;
  charLength = obj[prop].value.length;
  newStr = obj[prop].value.substring(0, charLength - 1);
  updateNumber(
    obj,
    obj.sign ? "num2" : "num1",
    obj[prop].value.length === 1 ? "0" : newStr
  );
  displayNumber(obj[prop], newStr);
}
