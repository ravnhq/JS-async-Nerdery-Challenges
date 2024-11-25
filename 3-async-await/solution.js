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

const products = require('./products');
const prices = require('./prices');

const calculateRandomId = () => parseInt(Date.now().toString().slice(-2))

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const id = calculateRandomId();
    // You use Promise.all() here
    // You use Promise.allSettled() here
    // Log the results, or errors, here
    try {
        const [product, price] = await Promise.all([products(id), prices(id)]);
        console.log('Promise.all():');
        console.log({
            id,
            product,
            price
        });
    } catch (error) {
        console.log(`Primse.all() error: ${error.message}`);
    }

    const [productSettled, priceSettled] = await Promise.allSettled([products(id), prices(id)]);
    console.log('Promise.allSettled():');
    console.log({
        id,
        product: productSettled.value,
        price: priceSettled.value
    }
    )

    const result = await Promise.any([products(id), prices(id)]);
    console.log('Promise.any():');
    if (typeof result === 'string') {
        console.log({
            id,
            product: result
        });
    } else {
        console.log({
            id,
            price: result
        });
    }

    const resultRace = await Promise.race([products(id), prices(id)]);
    console.log('Promise.race():');
    if (typeof resultRace === 'string') {
        console.log({
            id,
            product: resultRace
        });
    } else {
        console.log({
            id,
            price: resultRace
        });
    }

    /**
     * Conclusion
     * Promise.race() returns the first settled promise, either resolved or rejected. Otherwise,
     * Promise.any() returns the first resolved promise, if all promises are rejected, it throws an AggregateError
     */
}

solution()