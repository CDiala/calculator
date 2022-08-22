let objCalculator = {
  buttons: document.querySelectorAll(".btn"),
  input: document.querySelector(".calculator-display-input"),
  output: document.querySelector(".calculator-display-output"),
  error: document.querySelector(".error-display"),
  num1: "0",
  num2: "0",
  tempNum: "",
  sign: "",
  tempSign: "",
  lowSign: ["+", "−"],
  highSign: ["÷", "×"],
  allSign: ["÷", "×", "+", "−"],
};

objCalculator.buttons.forEach((button) => {
  let text = button.textContent;
  button.addEventListener("click", (e) => {
    if (!button.dataset.action) {
      if (objCalculator.tempSign) {
        let newTempNum = appendString(objCalculator.tempNum, text);
        updateNumber(objCalculator, "tempNum", newTempNum);
      } else if (text === "0") {
        if (
          (!objCalculator.sign && objCalculator.num1 === "0") ||
          (objCalculator.sign && objCalculator.num2 === "0")
        ) {
        } else {
          // let isFirstNum = isFirstNum();
          // let isFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
          let str = isFirstNum() ? objCalculator.num1 : objCalculator.num2;
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
        isFirstNum() ||
        // (objCalculator.num1 !== "0" && !objCalculator.sign) ||
        (objCalculator.num2 !== "0" && objCalculator.sign)
      ) {
        // let appendFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
        // let appendFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
        let str = isFirstNum() ? objCalculator.num1 : objCalculator.num2;
        str = appendString(str, text);
        updateNumber(objCalculator, isFirstNum() ? "num1" : "num2", str);
      }
    } else if (text === ".") {
      if (!isMember(objCalculator.input.value, ".")) {
        // if (!objCalculator.input.value.includes(".")) {
        let str = !objCalculator.sign ? objCalculator.num1 : objCalculator.num2;
        str = appendString(str, text);
        updateNumber(objCalculator, !objCalculator.sign ? "num1" : "num2", str);
      }
    } else if (text === "←") {
      deleteNumber(objCalculator, "input");
      // } else if (objCalculator.allSign.includes(text)) {
    } else if (isMember(objCalculator.allSign, text)) {
      if (!objCalculator.sign) {
        updateNumber(objCalculator, "sign", text);
      } else if (
        (isMember(objCalculator.lowSign, text) ||
          isMember(objCalculator.highSign, objCalculator.sign)) &&
        // (objCalculator.lowSign.includes(text) ||
        //   objCalculator.highSign.includes(objCalculator.sign)) &&
        !objCalculator.tempSign
      ) {
        let answer = operate(
          objCalculator.sign,
          objCalculator.num1,
          objCalculator.num2
        );
        updateNumber(objCalculator, "num1", answer);
        displayNumber(objCalculator.output, answer);
        updateNumber(objCalculator, "sign", text);
        updateNumber(objCalculator, "num2", "0");
      } else if (
        // objCalculator.highSign.includes(text) &&
        // objCalculator.lowSign.includes(objCalculator.sign) &&
        isMember(objCalculator.highSign, text) &&
        isMember(objCalculator.lowSign, objCalculator.sign) &&
        !objCalculator.tempSign
      ) {
        updateNumber(objCalculator, "tempSign", text);
      } else if (
        objCalculator.tempNum &&
        // objCalculator.highSign.includes(text)
        isMember(objCalculator.highSign, text)
      ) {
        runSimpleCalculation(
          objCalculator.tempSign,
          objCalculator.num2,
          objCalculator.tempNum,
          text
        );
      } else if (
        isMember(objCalculator.highSign, objCalculator.tempSign) &&
        isMember(objCalculator.lowSign, text)
        // objCalculator.highSign.includes(objCalculator.tempSign) &&
        // objCalculator.lowSign.includes(text)
      ) {
        runComplexCalculation(
          objCalculator.tempSign,
          objCalculator.num2,
          objCalculator.tempNum,
          text
        );
      }
    } else if (text.includes("±")) {
      handleNegativeNums();
    } else if (text === "=") {
      if (objCalculator.sign) {
        if (objCalculator.tempNum) {
          runComplexCalculation(
            objCalculator.tempSign,
            objCalculator.num2,
            objCalculator.tempNum
          );
        } else {
          runSimpleCalculation(
            objCalculator.sign,
            objCalculator.num1,
            objCalculator.num2
          );
        }
      } else {
        displayNumber(objCalculator.output, "0");
      }
      resetInputs(objCalculator);
    } else if (text.includes("C")) {
      let savedNum =
        objCalculator.tempNum === objCalculator.input.value
          ? "tempNum"
          : objCalculator.num2 === objCalculator.input.value
          ? "num2"
          : "num1";

      displayNumber(objCalculator.input, "");
      updateNumber(objCalculator, savedNum, "0");
    }
    displayNumber(
      objCalculator.input,
      objCalculator.tempSign
        ? objCalculator.tempNum || "0"
        : !objCalculator.sign
        ? objCalculator.num1
        : objCalculator.num2
    );
  });
});

function isFirstNum() {
  return objCalculator.num1 !== "0" && !objCalculator.sign;
}

function isMember(container, item) {
  return container.toString().includes(item);
}

function runSimpleCalculation(sign, num1, num2, text = "") {
  let tempAns = operate(sign, num1, num2);

  updateNumber(objCalculator, "num2", tempAns);
  updateNumber(objCalculator, "tempSign", text);
  updateNumber(objCalculator, "tempNum", "");
  displayNumber(objCalculator.output, tempAns);
}

function runComplexCalculation(sign, num1, num2, text) {
  let tempAns = operate(sign, num1, num2);
  tempAns = operate(objCalculator.sign, objCalculator.num1, tempAns);

  updateNumber(objCalculator, "num1", tempAns);
  updateNumber(objCalculator, "sign", text);
  updateNumber(objCalculator, "num2", "0");
  updateNumber(objCalculator, "tempSign", "");
  updateNumber(objCalculator, "tempNum", "");
  displayNumber(objCalculator.output, tempAns);
}

function resetInputs(obj) {
  for (let key in obj) {
    if (key.includes("num")) {
      obj[key] = "0";
    } else if (
      key.includes("sign") |
      key.includes("temp") |
      key.includes("error")
    ) {
      obj[key] = "";
    }
  }
}

function updateNumber(obj, prop, value) {
  obj[prop] = value;
}

function appendString(oldVal, str) {
  if (oldVal === "-0") {
    return oldVal.replace("0", str);
  } else {
    return oldVal + str;
  }
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

function addNums(num1, num2) {
  return roundNumber(+num1 + +num2).toString();
}

function subtractNums(num1, num2) {
  return roundNumber(+num1 - +num2).toString();
}

function multiplyNums(num1, num2) {
  return roundNumber(+num1 * +num2).toString();
}

function divideNums(a, b) {
  if (b === "0") {
    displayError();
    return 0;
  } else {
    return roundNumber(+a / +b).toString();
  }
}

function displayError() {
  objCalculator.error.textContent = "Yeah right! Try harder next time... 😡";
  setTimeout(() => {
    objCalculator.error.textContent = "";
  }, 2000);
}

function roundNumber(num) {
  if (num.toString().includes(".") & (num.toString().length > 5)) {
    return num.toFixed(5);
  } else {
    return num;
  }
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
    default:
      return "this was just a test";
  }
}
