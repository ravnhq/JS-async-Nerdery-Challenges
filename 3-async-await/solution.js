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
const getProduct = require('./products');

async function solution() {
  try {
    // You generate your id value here
    const id = generateId();
    // You use Promise.all() here
    const [productPrice, productName] = await Promise.all([
      getPrices(id),
      getProduct(id),
    ]);

    const product = { id, product: productName, price: productPrice };

    console.log(`\nResolving with Promise.all:\n`, product);
  } catch (error) {
    // Log the results, or errors, heres
    console.log(`\nError in Promise.all: ${error.message}`);
  }
}
async function solutionAllSettled() {
  const id = generateId();
  const [priceResponse, productResponse] = await Promise.allSettled([
    getPrices(id),
    getProduct(id),
  ]);
  // Check if there is any error in the promises
  if (
    priceResponse.status === 'rejected' ||
    productResponse.status === 'rejected'
  ) {
    // Print the error message
    console.log(`\nError in Promise.allSettled:`);

    if (priceResponse.status === 'rejected') {
      console.log(`\tPrice Error: ${priceResponse.reason.message}`);
    }

    if (productResponse.status === 'rejected') {
      console.log(`\tProduct Error: ${productResponse.reason.message}`);
    }

    return;
  }
  // If all promise are resolved assign values
  const product = {
    id,
    product: productResponse.value,
    price: priceResponse.value,
  };
  //Print result
  console.log('\nResolve in Promise.allSettled\n', product);
}
// Helper function to generate an ID
function generateId() {
  return parseInt(Date.now().toString().slice(-2));
}

solution();
solutionAllSettled();
