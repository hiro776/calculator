//
// All of the Calculator's functionality is implemented in this file
//
// Author: R Mehta 
//


/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * LOOK HERE. NOTE ---------------------------
 
  Your calculator should not evaluate more than a single 
  pair of numbers at a time. If you enter a number then an 
  operator and another number that calculation should be 
  displayed if your next input is an operator. The result 
  of the calculation should be used as the first number in
  your new calculation.
  
  *--------------------------------------------
  *<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/



let result = 0;
let curOP = '';

// * and x both means multiply op
const opKeys = ['+', '-', 'x', '*', '/', '^'];

const display = document.querySelector('.result');
let displayBuffer = '';
const showBuffer = () => {
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
      if (num2 === 0) return raiseError('Divide By Zero');
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
  displayBuffer = 0;
  showBuffer();
  displayBuffer = 0;
  result = 0;
  curOP = '';
}

const handleKey = (key) => {

  // Handling Number Keys (input of negative numbers not supported Yet)
  if (key >= '0' && key <= '9' || key === '.') {
    if (displayBuffer === '' && key !== '0') { // this is the first operand
      displayBuffer += key === '.' ? '0' + key.toString() : key.toString();
    }
    else {
      if (key === '.' && displayBuffer.indexOf('.') === -1) {
        displayBuffer += key;
      }
      else if (key !== '.') {
        displayBuffer += key.toString();
      }
    }

    // Update the diplay with the displayBuffer
    showBuffer();
  }

  // operation keys
  else if (opKeys.indexOf(key) !== -1) {
    console.log(key);

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
    if (displayBuffer === '') {
      displayBuffer = 0;
      showBuffer();
      displayBuffer = '';
    }
    else {
      displayBuffer = displayBuffer.slice(0, displayBuffer.length - 1);
      showBuffer();
    }
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
  else if (key === 'clear') {
    clear();
  }

  else {
    console.log('Unknown Key is Detected (most probably keyboard input)', { key, curOP, result, displayBuffer });
  }
}

// get the on screen keys
const keys = Array.from(document.querySelectorAll('button[type="button"]'));
keys.forEach(key => {
  key.addEventListener('click', e => handleKey(e.target.getAttribute('data-key')));
});


window.addEventListener('keyup', e => {
  const key = e.key;

  handleKey(key);

  // console.log(key);
  // console.log('result', result);
  // console.log('displayBuffer', displayBuffer);

});