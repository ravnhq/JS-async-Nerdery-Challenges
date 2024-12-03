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
const itemProducts = require('./products');
const pricesProducts = require('./prices');

async function solution() {
    const id = Date.now() % 100

    try {
        const [product, price] = await Promise.all([
            itemProducts(id),
            pricesProducts(id)
        ]);

        console.log("promise.all:",{id: id},'\n',
            { product: product },'\n',
            { price: price });

    } catch (error) {
        console.error('Error Promise.all:', error.message);
    }

    const results = await Promise.allSettled([
        itemProducts(id),
        pricesProducts(id)
    ]);

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Result promise.allSettled: ${index + 1}:`, result.value);
        } else {
            console.error(`Error ${index + 1}:`, result.reason);
        }
    });



    

    // Extra challenge: Use Promise.race() and Promise.any()
    try {
        const raceResult = await Promise.race([
            itemProducts(id),
            pricesProducts(id)
        ]);
        console.log('Promise.race result:', raceResult);
    } catch (error) {
        console.error('Error Promise.race:', error);
    }

    try {
        const anyResult = await Promise.any([
            itemProducts(id),
            pricesProducts(id)
        ]);
        console.log('Promise.any result:', anyResult);
    } catch (error) {
        console.error('Error Promise.any:', error);
    }
}

solution();
