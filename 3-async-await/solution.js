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

const fetchPrices = require('./prices.js');
const fetchProducts = require('./products.js');

async function solution() {
    // You generate your id value here
    const id = Date.now().toString().slice(-2);

    // You use Promise.all() here
    try {
        const [product, price] = await Promise.all([fetchProducts(id), fetchPrices(id)]);;

        const object = {
            id: id,
            product: product,
            price: price
        };

        console.log('Promise.all() fetched:');
        console.log(object);
    } catch(error) {
        console.log(`Promise.all() error: ${error}`);
    }

    // You use Promise.allSettled() here
    const results = await Promise.allSettled([fetchPrices(id), fetchProducts(id)]);

    let settledObject = { id };
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            settledObject = { ...settledObject, [keyName(index)]: result.value };
        } else if (result.status === 'rejected') {
            console.log(`Ecountered allSettled error: ${result.reason}`);
        }
    });

    console.log('Promise.allSettled() fetched:');
    console.log(settledObject);

    // Promise Race
    Promise.race([fetchPrices(id), fetchProducts(id)])
        .then((result) => {
            console.log('Promise.Race() result:');
            console.log(`The first promise to finish was: ${result}`);
        })
        .catch((error) => {
            console.log('Promise.Race() result:');
            console.log(`The first promise to error was: ${error}`);
        });

    // Promise Any
    Promise.any([fetchPrices(id), fetchProducts(id)])
        .then((result) => {
            console.log('Promise.Any() result:');
            console.log(`The first promise to succesfully complete was: ${result}`);
        })
        .catch((error) => {
            console.log('Promise.Any() result:');
            console.log(`All promises rejected: ${error}`);
        })
}

function keyName(index) {
    switch (+index) {
    case 0:
        return 'price';
    case 1:
        return 'product';
    default:
        return 'N/A';
    }
}

solution();
