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
const prices = require('./prices');
const products = require('./products');

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const id = randomId();
    console.log(`The ID generated for this run is ${id}\n`);
    


    // You use Promise.all() here
    console.log('\tUsing Promise.all\n');
    try {
        const allPromises = await Promise.all([
            prices(id),
            products(id),
        ]);
        
        if (!allPromises) throw Error({ cause: allPromises });
        
        // Log the results, or errors, here
        console.log({ id, product: allPromises[1], price: allPromises[0] });

    } catch (error) {
        console.log('Entered Promise.all catch block');
        console.error(error.message);
    }
    


    // You use Promise.allSettled() here
    console.log('\n\tUsing Promise.allSettled\n');
    try {
        const promisesSettled = await Promise.allSettled([
            prices(id),
            products(id),
        ]);
        
        const promisesFulfilled = promisesSettled.filter(promise => promise.status === 'fulfilled').map(result => result.value);
        const promisesRejected = promisesSettled.filter(promise => promise.status === 'rejected').map(result => result.reason.message);
        
        if (promisesRejected.length > 0) throw new Error(promisesRejected);

        // Log the results, or errors, here
        console.log({ id, product: promisesFulfilled[1], price: promisesFulfilled[0] });

    } catch (error) {
        console.log('Entered Promise.allSettled catch block');
        console.error(error.message);
    }




    // You use Promise.any() here
    console.log('\n\tUsing Promise.any\n');
    try {
        const anyPromise = await Promise.any([
            prices(id),
            products(id),
        ]);
        
        if (!anyPromise) throw new Error({ cause: anyPromise });

        // Log the results, or errors, here
        if (typeof anyPromise === 'string')
            console.log({ id, product: anyPromise, price: 'Not determined by any' });
        else if (typeof anyPromise === 'number')
            console.log({ id, product: 'Not determined by any', price: anyPromise });
        else 
            console.log({ id, anyPromise });

    } catch (error) {
        console.log('Entered Promise.race catch block');
        console.error(error.message);
    }
    



    // You use Promise.race() here
    console.log('\n\tUsing Promise.race\n');
    try {
        const promiseRace = await Promise.race([
            prices(id),
            products(id),
        ]);
        
        
        if (!promiseRace) throw new Error({ cause: promiseRace });
  
        // Log the results, or errors, here
        if (typeof promiseRace === 'string')
            console.log({ id, product: promiseRace, price: 'Not determined by race' });
        else if (typeof promiseRace === 'number')
            console.log({ id, product: 'Not determined by race', price: promiseRace });
        else 
            console.log({ id, promiseRace })

    } catch (error) {
        console.log('Entered Promise.race catch block');
        console.error(error.message);
    }



    function randomId() {
        return Number(String(Date.now()).slice(-2, this.lenght));
    }
}

solution()
