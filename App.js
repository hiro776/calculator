//
// All of the Calculator's functionality is implemented in this file
//
// Author: R Mehta 
//


// The point in DOM to display the result of recent operation
const resultDisplay = document.querySelector('.current-result');

// this shows the operation that resulted in resultDisplay or, the last result (as when user starts new operation(s))
const previousDisplay = document.querySelector('.previous-result');

// Assingns the key events to the calculator keys
// Called by: keys.forEach()
// Accepts the keys > button from the DOM
const assignKeys = (key) => {
    const keyVal = key.target.getAttribute('data-key');
    switch (keyVal) {
        case 'c':
            resultDisplay.textContent = '0';
            break;

        case 'sqrt':
            resultDisplay.innerHTML += '&Sqrt;';
            break;

        case 'square':
            resultDisplay.textContent += '^2';
            break;

        case 'plusminus':
            // probably change this number
            break;

        case 'del': // delete key
            resultDisplay.textContent = resultDisplay.textContent.slice(0, resultDisplay.textContent.length - 1);
            break;

        case 'eq': // equal key

            break;

        case '.':
            resultDisplay.textContent += keyVal;
            key.target.removeEventListener('click', assignKeys);
            break;

        default:
            console.log(keyVal);
            resultDisplay.textContent += keyVal;
            break;
    }
}

// get all the keys on the calculator
const keys = Array.from(document.querySelectorAll('button[type="button"'));
// console.table(keys);
keys.forEach(key => {
    key.addEventListener('click', assignKeys);
});