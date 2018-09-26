const socket = io();
const calculation = [];
const initialValue = {
  digitString: '',
  isPositive: true
};
let currentValue = initialValue;

const addDigit = digit => {
  currentValue.digitString = currentValue.digitString.concat(digit);
};

const addOperator = operatorString => {};

const digitElements = document.querySelectorAll('button.digit');
digitElements.forEach(element => {
  element.addEventListener('click', () => {
    addDigit(element.name);
  });
});

const operatorElements = document.querySelectorAll('button.operator');
operatorElements.forEach(element => {
  element.addEventListener('click', () => {
    addOperator(element.name);
  });
});
