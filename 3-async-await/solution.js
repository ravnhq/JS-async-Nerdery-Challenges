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

const pricesAsync = require("./prices");
const productsAsync = require("./products");

async function solution() {
  // YOUR SOLUTION GOES HERE
  const promiseAllSolution = async (id) => {
    try {
      let resultsAll = await Promise.all([pricesAsync(id), productsAsync(id)]);
      return {
        id,
        price: resultsAll[0],
        product: resultsAll[1],
      };
    } catch (error) {
      return "Error: " + error.message;
    }
  };

  const promiseAllSettledSolution = async (id) => {
    const resultsAllSettled = await Promise.allSettled([
      pricesAsync(id),
      productsAsync(id),
    ]);

    let errorReasons = resultsAllSettled.reduce(
      (errorMessage, result) =>
        errorMessage + (result.reason ? result.reason + " " : ""),
      ""
    );

    if (errorReasons) {
      return errorReasons;
    }

    return {
      id,
      price: resultsAllSettled[0].value,
      product: resultsAllSettled[1].value,
    };
  };

  const promiseRaceSolution = async (id) => {
    try {
      //promise race get first to be done (either resolve or rejected)
      let productResult = await Promise.race([
        productsAsync(id),
        productsAsync(id),
        productsAsync(id),
      ]);
      let priceResult = await Promise.race([
        pricesAsync(id),
        pricesAsync(id),
        pricesAsync(id),
      ]);

      return {
        id,
        price: priceResult,
        product: productResult,
      };
    } catch (error) {
      return "Error: " + error.message;
    }
  };

  const promiseAnySolution = async (id) => {
    try {
      //promise any get first to be done successfully resolved!
      let productResult = await Promise.any([
        productsAsync(id),
        productsAsync(id),
        productsAsync(id),
      ]);
      let priceResult = await Promise.any([
        pricesAsync(id),
        pricesAsync(id),
        pricesAsync(id),
      ]);

      return {
        id,
        price: priceResult,
        product: productResult,
      };
    } catch (error) {
      return "Error: " + error.message;
    }
  };

  // You generate your id value here
  const id = parseInt(Date.now().toString().slice(-2));
  const [
    productDataFromPromiseAll,
    productDataFromPromiseAllSettled,
    productDataFromPromiseRace,
    productDataFromPromiseAny,
  ] = await Promise.all([
    promiseAllSolution(id),
    promiseAllSettledSolution(id),
    promiseRaceSolution(id),
    promiseAnySolution(id),
  ]);

  // Log the results, or errors, here
  console.log(`\nid: ${id} `);
  console.log(`Promise.all`);
  console.log(productDataFromPromiseAll);
  console.log(`Promise.allSettled`);
  console.log(productDataFromPromiseAllSettled);
  console.log(`Promise.race`);
  console.log(productDataFromPromiseRace);
  console.log(`Promise.any`);
  console.log(productDataFromPromiseAny);
}

solution();
setTimeout(() => solution(), 100);
setTimeout(() => solution(), 200);
