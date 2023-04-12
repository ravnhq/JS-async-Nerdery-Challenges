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

const { CLIENT_RENEG_LIMIT } = require('tls');

async function solution() {
    const getProducts = require('./products');
    const getPrices = require('./prices');
    //Function to generate a random ID
    const getId = () =>{
        return Date.now().toString().slice(-2);
    }
    const id = getId();

    console.log(`Testing for ID: ${id}`);
    const handlePromiseAll = (res) =>{
        console.log('Processing Promise ALL');
        if(typeof res[0] ==='string' ){
            console.log({id:id,product: res[0],price:res[1]})
        }
        else{
            console.log({id:id,product: res[1],price:res[0]})
        }
    }

    const handleAllSettled = (res) =>{
        console.log('\nProcessing ALL settled');
        if(res[0].status && res[1].status === 'fulfilled'){
            if(typeof res[0].value ==='string' ){
                console.log({id:id,product: res[0].value,price:res[1].value})
            }
            else{
                console.log({id:id,product: res[1].value,price:res[0].value})
            }
        }   
        else{
            console.log('An error has ocurred when fetching the products or prices');
        }
    }

    try{
            //Creation of new promises for Products and Prices
        const products = new Promise((resolve) => {
            resolve(getProducts(Number(id)));
        });
        const prices = new Promise((resolve) => {
            resolve(getPrices(Number(id)));
        });

        //Preparing the arry of promises
        const productsAndPrices=[products,prices];

        //executing all promises at once with Promise.all and Promise.allSettled
        const results =await Promise.all(productsAndPrices);
        handlePromiseAll(results); 

        const settled=await Promise.allSettled(productsAndPrices);
        handleAllSettled(settled); 

        //Extra promise race and any
        console.log('\nResults for Promise Race')
        Promise.race(productsAndPrices).then((value) => {
            if(typeof value ==='string' )
                console.log(`Products (${value}) settled first!`)
            else 
                console.log(`Price (${value}) settled first!`)
        });

        Promise.any(productsAndPrices).then((value) => {
            if(typeof value ==='string' )
                console.log(`Products (${value}) fulfilled first!`)
            else 
                console.log(`Price (${value}) fulfilled first!`)
        });
    }
    catch(error){
        console.log('An error has ocurred while fetching the products or prices');
    }

    //Promise Race 


}

solution()
