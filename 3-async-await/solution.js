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

function solution() {
    // YOUR SOLUTION GOES HERE
    const products = require('./products');
    const prices = require('./prices');

    // You generate your id value here
    const id = Number((Date.now()+'').slice(-2));
    const result = {id};

    (async () => {
        // You use Promise.all() here
        console.log('Promise.all:\n')

        try {
            [result.product, result.price] = await Promise.all([products(id), prices(id)]);
            console.log(
                `  id: ${result.id}\
                \n  product: ${result.product}\
                \n  price: ${result.price}`);
        } catch(reason) {
            console.log(`   error: ${reason.message}`);
        }

        // You use Promise.allSettled() here

        console.log('\nPromise.allSettled:\n')

        const settled = await Promise.allSettled([products(id), prices(id)]);

        const print = response => 
            response.status === 'fulfilled' ? response.value : response.reason.message;      

        console.log(
            `  id: ${id}\
            \n  product: ${print(settled[0])}\
            \n  price: ${print(settled[1])}\n`
        );

        //Promise.race

        console.log('\nPromise.race:\n');
        try {
            const value = await Promise.race([products(id), prices(id)]);
            console.log(`   Is it a product or a price?: ${value}`);
        } catch (reason) {
            console.log(`   error: ${reason.message}`);
        }

        //Promise.any

        console.log('\nPromise.any:\n');
        try {
            const value = await Promise.any([products(id), prices(id)]);
            console.log(`   Is it a product or a price?: ${value}`);
        } catch (reason) {
            console.log(`   error: ${reason.message}`);
        }
    })();
}

solution()
