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
const getProduct = require('./products.js');
const getPrice = require('./prices.js');

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    let now = Date.now()
    console.log(now) 
    const id = now % 100;
    console.log(id) 

    try {
        const [product, price] = await Promise.all([getProduct(id), getPrice(id)]);
        console.log({
            id,
            product,
            price,
        });
    } catch (error) {
        console.error(`Promise.all Error for ID ${id}:`, error.message);
    }

    const results = await Promise.allSettled([getProduct(id), getPrice(id)]);

    // Log the results, or errors, here
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`allSettled Result ${index + 1}:`, result.value);
        } else {
            console.error(`allSettled Error ${index + 1}:`, result.reason.message);
        }
    });

    // Extra Challenge: Use Promise.race() and Promise.any()
    try {
        const firstResolved = await Promise.race([getProduct(id), getPrice(id)]);
        console.log(`Promise.race first resolved:`, firstResolved);
    } catch (error) {
        console.error(`Promise.race Error with ID ${id}:`, error.message);
    }


    try {
        const firstFulfilled = await Promise.any([getProduct(id), getPrice(id)]);
        console.log(`Promise.any first fulfilled:`, firstFulfilled);
    } catch (error) {
        console.error(`Promise.any Error with ID ${id}:`, error.message);
    }
}

solution()
