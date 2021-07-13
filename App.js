//
// All of the Calculator's functionality is implemented in this file
//
// Author: R Mehta 
//


let result = 0;
let curOP = '';

// * and x both means multiply op
const opKeys = '+-x*/^';
const numKeys = '.0123456789';

const display = document.querySelector('.result');
let displayBuffer = '';
const showBuffer = (clean = false) => {
  if (clean)
    display.textContent = 0;
  else
    display.textContent = displayBuffer;
}


// raiseError(): string -> ...
// displays the given error message to the user
// and resets the calculations
// !!!
const raiseError = function (msg) {
  alert(msg);
  clear();
  return msg;
}

// operate(): char['+','-','x','/','^'] number number -> number
// perform the given operator (first argument) on the supplied two numbers and return the result
//    '/'  -- divide the first number by the second number supplied as argument
//    '^'  -- raise the first number to the power of the second number
const operate = function (op, num1, num2) {
  const decimalPoint = 100000000;
  let result = 0;

  switch (op) {
    case '+':
      result = num1 + num2;
      break;

    case '-':
      result = num1 - num2;
      break;

    case 'x':
    case '*':
      result = num1 * num2;
      break;

    case '/':
      if (num2 === 0) return raiseError('Error: Divide By Zero');
      else result = num1 / num2;
      break;

    case '^':
      result = Math.pow(num1, num2);
      break;

    default:
      raiseError('Invalid Operation !!!');
      console.log({ op, num1, num2, result });
      break;
  }

  return Math.round(result * decimalPoint) / decimalPoint;
}

const clear = function () {
  displayBuffer = '';
  result = 0;
  curOP = '';
  showBuffer(clean = true);
}

const handleKey = (key) => {
  console.log('key recieved: ', key);
  // Handling Number Keys (input of negative numbers not supported Yet)
  if (numKeys.indexOf(key) !== -1) {
    if (displayBuffer === '' && key !== '0') { // this is the first operand
      displayBuffer = key === '.' ? '0' + key.toString() : key.toString();
    }

    else if (displayBuffer === '' && key === '0') return;

    else {
      if (key === '.' && displayBuffer.indexOf('.') === -1) {
        displayBuffer += key;
      }
      else if (key !== '.') {
        displayBuffer += key;
      }
    }

    // Update the diplay with the displayBuffer
    showBuffer();
  }

  // operation keys
  else if (opKeys.indexOf(key) !== -1) {

    const tempNum = parseFloat(displayBuffer);
    if (isNaN(tempNum)) { // user pressed op twice in a row
      curOP = key;  // make new op as cur op
      return;
    }

    if (curOP === '') {   // first operand
      result = tempNum;
      curOP = key;
    }
    else {
      result = operate(curOP, result, tempNum);
      curOP = key;
      displayBuffer = result;

      // show the result
      showBuffer();

    }
    // if user first presses op keys result will become NaN
    if (isNaN(result)) { // reset it
      result = 0;
      curOP = '';
    }
    displayBuffer = '';
  }

  // delete key
  else if (key === 'Backspace') {
    if (displayBuffer !== '') {
      displayBuffer = displayBuffer.slice(0, displayBuffer.length - 1);

      if (displayBuffer === '') showBuffer(clean = true);
      else showBuffer();
    }
    else showBuffer(clean = true);
  }

  // equal to key
  else if (key === 'Enter') {
    if (curOP === '') return;

    result = operate(curOP, result, parseFloat(displayBuffer));
    curOP = '';
    displayBuffer = result;

    // show the result
    showBuffer();
    displayBuffer = '';
  }

  // clear key (on screen key only)
  else if (key === 'c') {
    clear();
  }

  else {
    console.log('Unknown Key is Detected !', { key });
    console.table({displayBuffer, result, curOP});
  }
}

// get the on screen keys
const keys = Array.from(document.querySelectorAll('button[type="button"]'));
keys.forEach(key => {
  key.addEventListener('click', e => handleKey(e.target.getAttribute('data-key')));
});

// support key board buttons
window.addEventListener('keyup', e => {
  const key = e.key;
  handleKey(key);
});