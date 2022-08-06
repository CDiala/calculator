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
    if (!button.dataset.action) {
      if (text === "0") {
        if (
          (!objCalculator.sign && objCalculator.num1 === "0") ||
          (objCalculator.sign && objCalculator.num2 === "0")
        ) {
        } else {
          let isFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
          let str = convertToString(
            isFirstNum ? objCalculator.num1 : objCalculator.num2
          );
          str = appendString(str, text);
          updateNumber(objCalculator, isFirstNum ? "num1" : "num2", str);
        }
      } else if (
        (objCalculator.num1 === "0" && !objCalculator.sign) ||
        (objCalculator.num2 === "0" && objCalculator.sign)
      ) {
        let replaceFirstNum = objCalculator.num1 === "0" && !objCalculator.sign;
        updateNumber(objCalculator, replaceFirstNum ? "num1" : "num2", text);
      } else if (
        (objCalculator.num1 !== "0" && !objCalculator.sign) ||
        (objCalculator.num2 !== "0" && objCalculator.sign)
      ) {
        let appendFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
        let str = convertToString(
          appendFirstNum ? objCalculator.num1 : objCalculator.num2
        );
        str = appendString(str, text);
        updateNumber(objCalculator, appendFirstNum ? "num1" : "num2", str);
      }
    } else if (text === ".") {
      if (!objCalculator.input.value.includes(".")) {
        let str = convertToString(
          !objCalculator.sign ? objCalculator.num1 : objCalculator.num2
        );
        str = appendString(str, text);
        updateNumber(objCalculator, !objCalculator.sign ? "num1" : "num2", str);
      }
    } else if (text === "←") {
      deleteNumber(objCalculator, "input");
    } else if (text === "÷" || text === "×" || text === "−" || text === "+") {
      if (objCalculator.num2 === "0") {
        console.log("special char detected:", text);
        updateNumber(objCalculator, "sign", text);
      } else {
        console.log("perform operation");
      }
    } else if (button.textContent.includes("±")) {
      handleNegativeNums();
    }
    displayNumber(
      objCalculator.input,
      !objCalculator.sign ? objCalculator.num1 : objCalculator.num2
    );
    console.log(objCalculator);
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
    obj[prop].value.length === 1 ||
      (obj[prop].value.length === 2 && obj[prop].value.includes("-"))
      ? "0"
      : newStr
  );
  displayNumber(obj[prop], newStr);
}

function handleNegativeNums() {
  let tempArr;
  if (!objCalculator.input.value.toString().includes("-")) {
    tempArr = objCalculator.input.value.split("");
    tempArr.unshift("-");
    tempArr = tempArr.join("");
  } else {
    tempArr = objCalculator.input.value.substring(1);
  }
  displayNumber(objCalculator.input, tempArr);
  updateNumber(
    objCalculator,
    !objCalculator.sign ? "num1" : "num2",
    objCalculator.input.value
  );
}
