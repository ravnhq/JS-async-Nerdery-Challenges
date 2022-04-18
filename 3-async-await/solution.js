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
const prices = require('./prices')
const products = require('./products')


const idGenerator = () => {
    const id = Date.now().toString();
    return parseInt(id.slice(id.length - 2));
}

const promiseAll = async (id)=> {
    try{
    const allPromise = Promise.all([
        products(id),
        prices(id),       
    ])
    
        const [price, product] = await allPromise;
        console.log({id,product,price});
    }
    catch(e){
        console.log(e.message);
    }

}

const promiseAllSettled = async (id) => {

    const [ product, price ]= await Promise.allSettled([

        products(id),
        prices(id),
    ])
    
    if (product.reason) {
        console.log( product.reason.message);
    }
    if (price.reason) {
        console.log( product.reason.message);
    }
    
    if (!(product.reason && price.reason)) {
        console.log({
            id,
            product,
            price,
        })
    }      
}
function solution() {

    const id = idGenerator();
    promiseAll(id);
    promiseAllSettled(id);
}

solution()