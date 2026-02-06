'use strict';

const elementSelect = document.getElementById("calcType");
const elementNum1 = document.getElementById("num1");
const elementNum2 = document.getElementById("num2");
const elementResult = document.getElementById("result");
const elementbtnEqual = document.getElementById("btnEqual");

elementSelect.addEventListener("change", clearResult);
elementNum1.addEventListener("change", clearResult);
elementNum2.addEventListener("change", clearResult);
elementbtnEqual.addEventListener("click", update);

function update() {
  const num1 = Number(elementNum1.value);
  const num2 = Number(elementNum2.value);

  if (elementNum1.value === "" || elementNum2.value === "") {
    elementResult.textContent = "";
    return;
  }

  elementResult.textContent = calculate(num1, num2, elementSelect.value);
}

function calculate(num1, num2, type) {
  switch (type) {
    case "type-add":
      return num1 + num2;
    case "type-substract":
      return num1 - num2;
    case "type-multiply":
      return num1 * num2;
    case "type-divide":
      return num2 === 0 ? "ERR" : num1 / num2;
    default:
      return "";
  }
}

function clearResult() {
  elementResult.textContent = "";
}
