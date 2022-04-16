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

function solution() {
    const getProduct = require('./products');
    const getPrice = require('./prices');
    
    // You generate your id value here
    const id = Date.now().toString().slice(-2);
    const detail = { id };
    let errorMsg = '';

    // You use Promise.all here
    const promiseAll = Promise.all([getProduct(id), getPrice(id)])
        .then((data) => {
            detail.product = data[0];
            detail.price = data[1];
        })
        .catch((err) => {
            errorMsg = err.message;
        });

    // You use Promise.allSettled here
    const promiseAllSettled = Promise.allSettled([getProduct(id), getPrice(id)])
        .then((values) => {
            let results = values; // CR: Is this variable necessary?
            results.map((result) => {
                if (result.status === 'fulfilled' && typeof result.value === 'string') {
                    detail.product = result.value;
                }
                if (result.status === 'fulfilled' && typeof result.value === 'number') {
                    detail.price = result.value;
                }
                if (result.status === 'rejected') {
                    errorMsg = result.reason.message;
                }
            })
        }) 
        .catch((err) => errorMsg = err.message);

    // Log the results or errors here
    async function asyncPromAll() {
        try {
            await promiseAll;
            if (detail.hasOwnProperty('product') && detail.hasOwnProperty('price')) {
                console.log('I come from asyncPromAll:', detail);
            } else {
                console.log('I come from asyncPromAll:', errorMsg);
            }
        } catch (error) {
            console.log(error.message);
        }   
    }

    async function asyncPromAllSettled() {
        try {
            await promiseAllSettled;
            if (detail.hasOwnProperty('product') && detail.hasOwnProperty('price')) {
                console.log('I come from asyncPromAllSettled:', detail);
            } else {
                console.log('I come from asyncPromAllSettled:', errorMsg);
            }
        } catch (error) {
            console.log(error.message);
        }   
    }

    //asyncPromAll();
    //asyncPromAllSettled();
    
    // as an extra challenge add Promise.race() and Promise.any(), and try to get the idea of what happens

    Promise.race([getProduct(id), getPrice(id)])
        // will return the first promise settled, either fulfilled or rejected
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message))


    Promise.any([getProduct(id), getPrice(id)])
        // will return the first promise to be fulfilled or error if all reject
        .then((data) => console.log(data))
        .catch((err) => console.log(err.message))
}

solution()
