/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. don't use .then(), .catch() or .finally() here
3. both, products and prices methods expect a positive integer id
4. use Promise.all() and Promise.allSettled() to consume both methods in parallel
5. to generate the id do the following: invoke Date.now(), and take the last two digits, this will be your id
6. log the results with console.log(), the format is up to you, but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

7. both methods include some conditions to fail, at the end you should console.log() the errors, the format is up to you
8. add any needed adjustment to solution() function
9. as extra challenge: add Promise.race() and Promise.any(), and try to get the idea of what happens
*/
const validatePrices = require('./prices');
const validateProduct = require('./products');

function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const randomNumber = () => {
        const number = (Date.now()).toString().slice(-2);
        return Number(number);
    };

    // You use Promise.all() here

    // You use Promise.allSettled() here

    // Log the results, or errors, here
}

solution()
