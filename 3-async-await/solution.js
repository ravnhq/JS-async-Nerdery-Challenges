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
const validatePrices = require('./prices');
const validateProduct = require('./products');

function solution() {
  // YOUR SOLUTION GOES HERE

  // You generate your id value here
  const randomNumber = () => {
    const number = (Date.now()).toString().slice(-2);
    return Number(number);
  };

  // You use Promise.all() here
  const promiseAll = async () => {

    const id = randomNumber();
    let price;
    let product;

    try {
      // You use Promise.all() here
      const response = await Promise.all([validatePrices(id), validateProduct(id)]);
      price = response[0];
      product = response[1];
      console.log(`\nAnswer of Promise all: \n\tId: ${id} \n\tProduct: ${product} \n\tPrice: $${price.toFixed(2)}`);

    } catch(error) {
      console.log(`\nError from Promise all: ${error.message}\n`);
    } 
  }

  const promiseAllSettled = async () => {

    const id = randomNumber();
    let price;
    let product;

    try {           
      // You use Promise.allSettled() here
      const response = await Promise.allSettled([validatePrices(id), validateProduct(id)]);
      price = response[0]?.value;
      product = response[1]?.value;
      console.log(`\nAnswer of Promise allSettled: \n\tId: ${id} \n\tProduct: ${product ? product : 'not available'} \n\tPrice: ${price ? `$${price?.toFixed(2)}` : 'not available'}\n`);

        if (!price || !product) {
          if (response[0].status === 'rejected') {
            console.log(`Error getting price in Promise allSettled: ${response[0].reason.message}\n`);
          }
          if (response[1].status === 'rejected') {
            console.log(`Error getting product in Promise allSettled: ${response[1].reason.message}\n`);
          }
        }
    } catch(error) {
      console.log(`Error from Promise allSettled: ${error.message}`);
    }       
  }

  const promiseAny = async () => {
    const id = randomNumber();

    try {           
      // You use Promise.any() here
      const response = await Promise.any([validatePrices(id), validateProduct(id)]);
      console.log(`\nAnswer of Promise any: \n\tId: ${id} \n\tProduct: ${isNaN(Number(response)) ? response : 'not available'} \n\tPrice: ${isNaN(Number(response)) ? 'not available' : `$${response.toFixed(2)}`}\n`);

    } catch(error) {
      console.log(`\nError from Promise any: ${error.message}\n`);
    }       
  }

  const promiseRace = async () => {
    const id = randomNumber();

    try {           
      // You use Promise.race() here
      const response = await Promise.race([validatePrices(id), validateProduct(id)]);
      console.log(`\nAnswer of Promise race: \n\tId: ${id} \n\tProduct: ${isNaN(Number(response)) ? response : 'not available'} \n\tPrice: ${isNaN(Number(response)) ? 'not available' : `$${response.toFixed(2)}`}\n`);

    } catch(error) {
      console.log(`\nError from Promise race: ${error.message}`);
    }       
  }

  promiseAll();
  promiseAllSettled();
  promiseAny();
  promiseRace();
}

solution();
