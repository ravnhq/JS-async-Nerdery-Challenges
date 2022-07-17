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
  // const productObject = {};
  // You generate your id value here
  const dateID = Date.now();
  const dateIdArray = dateID.toString().split('');
  const idProduct = dateIdArray
    .slice(dateIdArray.length - 2, dateIdArray.length)
    .join('');
  //function to create a obj
  const objectCreatorHandler = (productResponse, description) => {
    productObject = {
      productId: idProduct,
      productName: '',
      productPrice: 0,
      productDescription: description,
    };
    productResponse.forEach((result) => {
      if (typeof result != typeof 0 && typeof result.value != typeof 0) {
        productObject.productName = result.value ? result.value : result;
      } else {
        productObject.productPrice = result.value ? result.value : result;
      }
    });

    return productObject;
  };
  //Creating the promises
  const productPromise = new Promise((resolve, reject) => {
    try {
      resolve(getProducts(Number(idProduct)));
    } catch (err) {
      console.log(reject(err.message));
    }
  });
  const pricePromise = new Promise((resolve, reject) => {
    try {
      resolve(getPrices(Number(idProduct)));
    } catch (err) {
      console.log(reject(err.message));
    }
  });
  // You use Promise.all() here
  const allProductPromiseall = Promise.all([productPromise, pricePromise]);
  // You use Promise.allSettled() here
  const allProductPromiseAllSettled = Promise.allSettled([
    productPromise,
    pricePromise,
  ]);
  const getProductResponse = await allProductPromiseall;
  const getProductResponseAllSettled = await allProductPromiseAllSettled;
  console.log(getProductResponseAllSettled);

  const objectProductAll = objectCreatorHandler(
    getProductResponse,
    'Promise.All'
  );
  const objectProductAllSettled = objectCreatorHandler(
    getProductResponseAllSettled,
    'Promise.AllSettled'
  );

  // Log the results, or errors, here
  console.log(objectProductAll);
  console.log(objectProductAllSettled);
}

solution();
