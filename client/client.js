const socket = io();

let calculation = [];
// Odd-indexed array elements are numberStrings; even-index elements are operators.
const initialValue = '';
let prevResult = initialValue;
let currentValue = initialValue;

// Output elements
const currentValueEl = document.getElementById('current-value');
const currentCalcEl = document.getElementById('current-calc');
const calcReport = document.getElementById('calc-report');

const addDigit = digit => {
  currentValue = currentValue === '0' ? digit : currentValue + digit;
  console.log(currentValue);
};

const clearValue = () => {
  currentValue = initialValue;
};

const clearPrevResult = () => {
  prevResult = initialValue;
};

const addCalc = (value, operatorString) => {
  calculation.push(value, operatorString);
  clearPrevResult();
  clearValue();
};

const clearCalc = () => {
  calculation = [];
  clearPrevResult();
  clearValue();
};

const addOperator = operatorString => {
  if (currentValue.length === 0) {
    if (calculation.length === 0) {
      if (prevResult.length === 0) {
        // No first value entered. Use zero as first value. (Because that's
        // what my calculator at home does.)
        addCalc('0', operatorString);
      } else {
        // Use previous result as first value in new calculation.
        addCalc(prevResult, operatorString);
      }
    } else {
      // No next value entered yet. Replace terminal operator with new one.
      calculation[calculation.length - 1] = operatorString;
      clearValue();
    }
  } else {
    // Add calculation to array.
    addCalc(currentValue, operatorString);
  }
  console.log(calculation);
};

const parseCalcArray = () =>
  calculation
    .join(' ')
    .replace('add', '+')
    .replace('minus', '-')
    .replace('multiply', '&times;')
    .replace('divide', '&divide;');

// Simple button event handlers:
document.querySelectorAll('button.digit').forEach(element => {
  element.addEventListener('click', () => {
    addDigit(element.name);
  });
});
document.querySelectorAll('button.operator').forEach(element => {
  element.addEventListener('click', () => {
    addOperator(element.name);
  });
});
document.getElementById('clear-all').addEventListener('click', clearCalc);
document.getElementById('clear-display').addEventListener('click', clearValue);
document.getElementById('plus-minus').addEventListener('click', () => {
  if (currentValue.length > 0 && currentValue !== '0') {
    currentValue = currentValue.startsWith('-')
      ? currentValue.slice(1)
      : '-' + currentValue;
  } // else no value entered yet; ignore
});
document.getElementById('decimal-point').addEventListener('click', () => {
  if (!currentValue.includes('.')) {
    // No decimal point added yet
    if (currentValue.length === 0) {
      currentValue = '0.';
    } else {
      currentValue = currentValue + '.';
    }
  } // else decimal point has already been added; ignore
});

// Calculate function.
const calculate = () => {
  const calcString = parseCalcArray();
  for (let i = 0; i < calculation.length; i += 2) {
    calculation[i] = new Big(calculation[i]);
  }
  while (calculation.length > 1) {}
};

// Equals button triggers calculate().
document.getElementById('equals').addEventListener('click', () => {
  if (currentValue.length === 0) {
    if (calculation.length > 2) {
      // Remove final operator and calculate.
      calculate(calculation.slice(0, -1));
    } // Otherwise, nothing has been entered yet. Ignore.
  } else {
    calculation.push(currentValue);
    calculate(calculation);
  }
});

// Additional button handler to refresh display values
document.querySelectorAll('button.btn').forEach(element => {
  element.addEventListener('click', () => {
    currentValueEl.textContent = currentValue;
    currentCalcEl.innerHTML = parseCalcArray();
  });
});
