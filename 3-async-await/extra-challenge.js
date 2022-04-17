//Extra challenge: Add Promise.race() and Promise.any(), and try to get the idea of what happens

const productsFile = require('./products');
const pricesFile = require('./prices');

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    let generatedId = generateId();

    // You use Promise.all here
    const allPromise = Promise.all([productsFile(generatedId), pricesFile(generatedId)]);


    /**********************************************************

    Promise.race([productsFile(generatedId), pricesFile(generatedId)]);

    /*In Promise.race we get the fastest value as well as wether Promise is resolve or rejected
    and we need both results


    Promise.any([productsFile(generatedId), pricesFile(generatedId)]);

    /*In Promise.any we get the first resolved promise and we need both results to show the right 
    product

    /**********************************************************/
    
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
