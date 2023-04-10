const prices = require('./prices')
const products = require('./products')
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

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const id = Date.now() % 100

    const promisesArray = [prices(id), products(id)]
    const allSettleResults = []
    const promiseAllResults = []
    const errors = []
    // You use Promise.all() here
    try {
        const promisesAll = await Promise.all(promisesArray)
        promisesAll.forEach(res => promiseAllResults.push(res))
    } catch (error) {
        errors.push(`Promise all error ${error.message}`);
    }

    // You use Promise.allSettled() here
    try {
        const promisesAllSettled = await Promise.allSettled(promisesArray)

        promisesAllSettled.forEach(({ value, status }) => {
            if (status === 'fulfilled') {
                allSettleResults.push(value)
            } else {
                throw new Error()
            }
        })

    } catch (error) {
        errors.push(`Promise settle all error ${error.message}`);
    }
    // Log the results, or errors, here
    if (errors.length > 0) {
        console.group('Errors')
        errors.forEach(err => console.log(err))
        console.groupEnd('Errors')
    }
    else {
        console.group('Promise All')
        console.log({
            id,
            product: promiseAllResults[1],
            price: promiseAllResults[0],
        });
        console.groupEnd('Promise All')
        console.log('\n');
        console.group('Promise All Settled')
        console.log({
            id,
            products: typeof allSettleResults[0] === 'string' ? allSettleResults[0] : allSettleResults[1],
            price: typeof allSettleResults[0] === 'number' ? allSettleResults[0] : allSettleResults[1],
        });
        console.groupEnd('Promise All Settled')
    }

}

solution()
