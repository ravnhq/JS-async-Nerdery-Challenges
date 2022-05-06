/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. both methods expect a positive integer id
3. use Promise.all and Promise.allSettled to consume both methods in parallel
4. to generate the id do the following invoke Date.now(), and take the last two digits, this will be your id, cast it accordingly
5. present correct results with console.log(), the format is up to you, but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

6. both methods include some conditions to fail, manage errors accordingly, at the end you should console.log() the errors,
the format is up to you
7. add any necessary adjustments to solution()

8. as an extra challenge add Promise.race() and Promise.any(), and try to get the idea of what happens
*/

const prices = require("./prices");
const products = require("./products");

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const num = Date.now();
    const lastTwoDigits = String(num).slice(-2);
    const digits = Number(lastTwoDigits);

    // You use Promise.all here

    const result = await Promise.all([products(digits),prices(digits)]).then((response) => {
        return `id:${digits}\nproduct:${response[0]}\nprice:${response[1]}`
    }).catch((err) => err.message)

    // You use Promise.allSettled here

    // Log the results or errors here
    console.log(result)

}

solution()
