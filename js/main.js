let objCalculator = {
  buttons: document.querySelectorAll(".btn"),
  input: document.querySelector(".calculator-display-input"),
  output: document.querySelector(".calculator-display-output"),
  error: document.querySelector(".error-display"),
  num1: "0",
  num2: "0",
  sign: "",
  lowSign: ["+", "−"],
  highSign: ["÷", "×"],
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
        /*
        if (<text> is + or - && obj.sign is + or -)
        OR
        if (<text> is / or * && obj.sign is /, *, +, or -)
          1. execute operation
          2. save the returned answer in objCalculator.num1
          3. display the returned answer in objCalculator.output
          4. replace objCalculator.sign with <text>
        */
        if (
          objCalculator.lowSign.includes(text) ||
          objCalculator.highSign.includes(objCalculator.sign)
        ) {
          // execute operation
          console.log("matching signs found:", objCalculator.sign, text);
          let answer = operate(
            objCalculator.sign,
            objCalculator.num1,
            objCalculator.num2
          );

          // save the returned answer in objCalculator.num1
          updateNumber(objCalculator, "num1", answer);
          // display the returned answer in objCalculator.output
          displayNumber(objCalculator.output, answer);
          // replace objCalculator.sign with <text>
          updateNumber(objCalculator, "sign", text);
          // clear num2
          updateNumber(objCalculator, "num2", "0");
          console.log(objCalculator);
        }
        /*
        if (<text> is + or - && obj.sign is + or -)
        OR
        if (<text> is / or * && obj.sign is /, *, +, or -)
          1. execute operation
          2. save the returned answer in objCalculator.num1
          3. display the returned answer in objCalculator.output
          4. replace objCalculator.sign with <text>

        ELSE if (<text> is + or - && obj.sign is / or *):
          1. store new sign in a tempSign variable in objCalculator (to be created)
          2. save the next number in a tempNum variable in objCalculator (to be created)
          3a. if sign is * or /, calculate num2 * tempNum OR num2 / tempNum and save the ans in num2. then save sign in tempSign and save next num in tempNum.
          3b. if sign is + or - , 
            i) calculate num1 +or- num2 *or/ tempNum and save answer in num1.
            ii) update obj.sign to reflect the new sign from user.
            iii) clear num2
            iv) display answer in output
            v) reset input to 0 (code already implemented - kindly confirm)
          4. replace objCalculator.sign with <text>
        */
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

function addNums(num1, num2) {
  return roundNumber(+num1 + +num2);
}

function subtractNums(num1, num2) {
  return roundNumber(+num1 - +num2);
}

function multiplyNums(num1, num2) {
  return roundNumber(+num1 * +num2);
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

function roundNumber(num) {
  if (num.toString().includes(".") & (num.toString().length > 5)) {
    return num.toFixed(5);
  } else {
    return num;
  }
}

// console.log(divideNums("2", "5"));

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
