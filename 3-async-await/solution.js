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

const productsFile = require('./products');
const pricesFile = require('./prices');

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    let generatedId = generateId();

    // You use Promise.all here
    const allPromise = Promise.all([productsFile(generatedId), pricesFile(generatedId)]);
    
    try{
        const results = await allPromise;

        console.log(`{
            id:${generatedId}\n
            product:${results.slice(0,1)}\n
            price:${results.slice(1,2)
        }\n}`);

    }catch(error){
        console.log(error.message);
    }

    // You use Promise.allSettled here
    const settledPromise = Promise.allSettled([productsFile(generatedId), pricesFile(generatedId)]);

    // Log the results or errors here
    const results = await settledPromise;
    console.log(results);

}

function generateId(){
    let dateNow = Date.now();
    return dateNow % 100;
}

solution()
