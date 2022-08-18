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

// modify code to update sign if 2 sign btns  are clicked consecutively, instead of executing the operation

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
          let isFirstNum = objCalculator.num1 !== "0" && !objCalculator.sign;
          let str = isFirstNum ? objCalculator.num1 : objCalculator.num2;
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
        let str = appendFirstNum ? objCalculator.num1 : objCalculator.num2;
        str = appendString(str, text);
        updateNumber(objCalculator, appendFirstNum ? "num1" : "num2", str);
      }
    } else if (text === ".") {
      if (!objCalculator.input.value.includes(".")) {
        let str = !objCalculator.sign ? objCalculator.num1 : objCalculator.num2;
        str = appendString(str, text);
        updateNumber(objCalculator, !objCalculator.sign ? "num1" : "num2", str);
      }
    } else if (text === "←") {
      deleteNumber(objCalculator, "input");
    } else if (objCalculator.allSign.includes(text)) {
      // if (objCalculator.num2 === "0") { //temporarily commented
      if (!objCalculator.sign) {
        // this code might potentially break. look out for it
        updateNumber(objCalculator, "sign", text);
      } //{
      /*
        if (<text> is + or - && obj.sign is + or -)
        OR
        if (<text> is / or * && obj.sign is /, *, +, or -)
          1. execute operation
          2. save the returned answer in objCalculator.num1
          3. display the returned answer in objCalculator.output
          4. replace objCalculator.sign with <text>
          5. reset num2 to '0'
        */
      // num1, sign, num2, tempSign, tempNum
      else if (
        (objCalculator.lowSign.includes(text) ||
          objCalculator.highSign.includes(objCalculator.sign)) &&
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
        objCalculator.highSign.includes(text) &&
        objCalculator.lowSign.includes(objCalculator.sign) &&
        !objCalculator.tempSign
      ) {
        updateNumber(objCalculator, "tempSign", text); // consider modifying this to check if tempsign is null
        // console.log(objCalculator);
        // ELSE if (<text> is + or - && obj.sign is / or *): DONE
        //   1. store new sign in a tempSign variable in objCalculator (DONE)
        // updateNumber(objCalculator, "tempSign", text);
        //   2. save the next number in a tempNum variable in objCalculator (to be created)
        // updateNumber(objCalculator, "tempNum", text); DONE (line 21)
      } else if (
        objCalculator.tempNum &&
        objCalculator.highSign.includes(text)
      ) {
        // displayNumber(objCalculator.input, "0"); // testing
        /*
          if next sign is * or /
          [sample: 2 + 3 * 4 * 6] 
            // a. calculate num2 * tempNum and assign the answer to obj.num2; DONE
            // b. assign nextSign to obj.tempSign DONE
            // c. reset obj.tempNum to defalt value
            // d. display result in output
        */
        let tempAns = operate(
          objCalculator.tempSign,
          objCalculator.num2,
          objCalculator.tempNum
        );
        updateNumber(objCalculator, "num2", tempAns);
        updateNumber(objCalculator, "tempSign", text);
        updateNumber(objCalculator, "tempNum", "");
        displayNumber(objCalculator.output, tempAns);
        console.log("time to work");
      } else if (
        objCalculator.highSign.includes(objCalculator.tempSign) &&
        objCalculator.lowSign.includes(text)
      ) {
        // displayNumber(objCalculator.input, "0"); // testing
        /*
            if sign is + or - 
            [sample: 2 + 3 * 4 - 6]
              // a. calculate num2 * tempNum and save ans in a variable (to be created).
              // b. calc num1 + the ans stored in the variable above and save ans in num1.
              // c. reset obj.sign, obj.num2, obj.tempNum, obj.tempSign
              // d. save the next sign in obj.sign
              // e. display result in output
          */
        let tempAns = operate(
          objCalculator.tempSign,
          objCalculator.num2,
          objCalculator.tempNum
        );
        tempAns = operate(objCalculator.sign, objCalculator.num1, tempAns);
        updateNumber(objCalculator, "num1", tempAns);
        updateNumber(objCalculator, "sign", text);
        updateNumber(objCalculator, "num2", "0");
        updateNumber(objCalculator, "tempSign", "");
        updateNumber(objCalculator, "tempNum", "");
        displayNumber(objCalculator.output, tempAns);
        // displayNumber(objCalculator.input, "0");
        console.log("you garrit", tempAns);
      }
    } else if (button.textContent.includes("±")) {
      handleNegativeNums();
    }
    // displayNumber(
    //   objCalculator.input,
    //   !objCalculator.sign ? objCalculator.num1 : objCalculator.num2
    // );
    displayNumber(
      objCalculator.input,
      objCalculator.tempSign
        ? objCalculator.tempNum || "0"
        : !objCalculator.sign
        ? objCalculator.num1
        : objCalculator.num2
    );
    console.log(objCalculator);
  });
});

function updateNumber(obj, prop, value) {
  obj[prop] = value;
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
    case "=":
      return "I'm yet to get this right";
    default:
      return "this was just a test";
  }
}
