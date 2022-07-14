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

const getPrices = require('./prices');
const getProducts = require('./products');

async function solution() {
  // YOUR SOLUTION GOES HERE
  const productObject = {};
  // You generate your id value here
  const dateID = Date.now();
  const dateIdArray = dateID.toString().split('');
  const id = dateIdArray
    .slice(dateIdArray.length - 2, dateIdArray.length)
    .join('');
  productObject.id = id;
  // You use Promise.all() here
  const productPromise = new Promise((resolve) => {
    resolve(getProducts(Number(id)));
  });
  const pricePromise = new Promise((resolve) => {
    resolve(getPrices(Number(id)));
  });
  const allProductPromise = Promise.all([productPromise, pricePromise]);
  // You use Promise.allSettled() here
  const getProductPromises = await allProductPromise;

  getProductPromises.forEach((value) => {
    if (typeof value != typeof 0) {
      productObject.product = value;
    } else {
      productObject.price = value;
    }
  });
  // Log the results, or errors, here
  console.log(productObject);
}

solution();
