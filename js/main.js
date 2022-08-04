let objCalculator = {
  buttons: document.querySelectorAll(".btn"),
  input: document.querySelector(".calculator-display-input"),
  output: document.querySelector(".calculator-display-output"),
  error: document.querySelector(".error-display"),
  num1: 0,
  num2: 0,
  sign: "",
};

objCalculator.buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e);
    if (!button.dataset.action) {
      if (button.textContent === "0") {
        if (
          (!objCalculator.sign && objCalculator.num1 === 0) ||
          (objCalculator.sign && objCalculator.num2 === 0)
        ) {
        } else if (objCalculator.num1 === 0 && !objCalculator.sign) {
          updateNumber(objCalculator, "num1", button.textContent);
        } else if (objCalculator.num1 !== 0 && !objCalculator.sign) {
          let str = convertToString(objCalculator.num1);
          str = appendString(str, button.textContent);
          updateNumber(objCalculator, "num1", str);
        }
      } else if (objCalculator.num1 === 0 && !objCalculator.sign) {
        updateNumber(objCalculator, "num1", button.textContent);
      } else if (objCalculator.num1 !== 0 && !objCalculator.sign) {
        let str = convertToString(objCalculator.num1);
        str = appendString(str, button.textContent);
        updateNumber(objCalculator, "num1", str);
      }
      console.log(objCalculator);
    } else if (button.textContent === ".") {
      if (!objCalculator.input.value.includes(".")) {
        let str = convertToString(
          !objCalculator.sign ? objCalculator.num1 : objCalculator.num2
        );
        str = appendString(str, button.textContent);
        updateNumber(objCalculator, !objCalculator.sign ? "num1" : "num2", str);
      }
      displayNumber(objCalculator.input, objCalculator.num1);
    } else if (button.textContent === "←") {
      deleteNumber(objCalculator, "input");
    }
    displayNumber(objCalculator.input, objCalculator.num1);
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
  // doesn't work on decimal numbers. check
  console.log(obj[prop].value);
  let charLength = obj[prop].value.length;
  // obj[prop].value = obj[prop].value.slice(0, obj[prop].value[charLength - 1]);
  obj[prop].value = obj[prop].value.replace(
    obj[prop].value[charLength - 1],
    ""
  );
  console.log(obj[prop].value);
  updateNumber(obj, obj.sign ? "num2" : "num1", obj[prop].value);
  // console.log(obj);
}
