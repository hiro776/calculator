//
// All of the Calculator's functionality is implemented in this file
//
// Author: R Mehta 
//


let numberBuffer = '';  // string that stores the numeric input of user per operation (visible on display)
let result = 0; // only visible on display when user presses equalKey
const decimalPrecision = 100000000;

const displayBuffer = function () {
    const display = document.querySelector('.current-result');

    display.textContent = numberBuffer.length === 0 ? '0' : numberBuffer;
}


const numKeys = Array.from(document.querySelectorAll('button.num'));
// console.log(numKeys);

// these are binary operators
const opKeys = Array.from(document.querySelectorAll('button.op'));
// console.log(opKeys);

// these are the uninary operators
const spKeys = Array.from(document.querySelectorAll('button.sp'));
// console.log(spKeys);

const clearKey = document.querySelector('button.c');
// console.log(clearKey);
// clear display, reset all buffers and result on clearKey
clearKey.onclick = function () {
    numberBuffer = '';
    result = 0;

    displayBuffer();
    console.log('Cleared');
}

const equalKey = document.querySelector('button.eq');
// console.log(equalKey);


numKeys.forEach(key => {
    key.addEventListener('click', e => {
        // console.log(e.target);
        const keyVal = e.target.getAttribute('data-key');

        if (numberBuffer === result.toString()) {
            // remove previous operations residue
            numberBuffer = '';
        }

        if (keyVal !== 'del' && keyVal !== '.') {
            numberBuffer += keyVal;
        }

        if (keyVal === 'del') {
            numberBuffer = numberBuffer.slice(0, numberBuffer.length - 1);
        }

        if (keyVal === '.') {
            if (numberBuffer.indexOf('.') === -1) {
                numberBuffer += '.';
            }
        }

        console.log({ numberBuffer });
        displayBuffer();

    });
});


spKeys.forEach(key => {
    key.addEventListener('click', (e) => {
        const keyVal = e.target.getAttribute('data-key');
        // console.log('Uninary Operation: ', keyVal);

        if (numberBuffer.length === 0) {
            numberBuffer = '0';
        }

        switch (keyVal) {
            case 'cube':
                result = parseFloat(numberBuffer) ** 3;
                break;

            case '!':
                // NEED to handle -ve and fractions
                result = 1;
                for (let i = parseFloat(numberBuffer); i >= 1; i--) {
                    result *= i;
                }
                break;

            case 'sqrt':
                // NEED to Handle negative numbers
                result = Math.sqrt(parseFloat(numberBuffer));
                break;

            case 'sq':
                result = parseFloat(numberBuffer) ** 2;
                break;

            case 'reci':
                // NEED TO handle divide by 0
                result = 1 / parseFloat(numberBuffer);
                break;

            default:
                console.log('ERROR! Invalid Uninary operator found:', keyVal);
                break;
        }

        // upto 8 decimal places only
        result = Math.round(result * decimalPrecision) / decimalPrecision;

        console.log('result: ', result);
        console.log('numberBuffer', numberBuffer);

        // display the result implicitly on to the screen
        numberBuffer = result.toString();
        displayBuffer();


    });
});

