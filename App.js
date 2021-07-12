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

// raiseError(): string -> ...
// displays the given error message to the user
// and resets the calculations
// !!!
const raiseError = function (msg) {
  console.log(msg);
  return msg;
}

// operate(): char['+','-','x','/','^'] number number -> number
// perform the given operator (first argument) on the supplied two numbers and return the result
//    '/'  -- divide the first number by the second number supplied as argument
//    '^'  -- raise the first number to the power of the second number
const operate = function (op, num1, num2) {
  switch (op) {
    case '+':
      return num1 + num2;

    case '-':
      return num1 - num2;

    case 'x':
      return num1 * num2;

    case '/':
      if (num2 === 0) raiseError('Divide By Zero');
      else return num1 / num2;
      break;

    case '^':
      return Math.pow(num1, num2);
  
    default:
      raiseError('Invalid Operation !!!');
      break;
  }
}
