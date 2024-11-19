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

/**
 *
 * @param {*} id positive number
 * @returns returns either:
 *                    - a string with the error message or
 *                    - an object as follow: { id: 1, price: 0.5, product: "salt" }
 */

const promiseAllSolution = async (id) => {
  try {
    let [price, product] = await Promise.all([
      pricesAsync(id),
      productsAsync(id),
    ]);
    return {
      id,
      price,
      product,
    };
  } catch (error) {
    return "Error: " + error.message;
  }
};

const promiseAllSettledSolution = async (id) => {
  const [price, product] = await Promise.allSettled([
    pricesAsync(id),
    productsAsync(id),
  ]);

  //if no reason -> undefine on .reason property
  let errorReasons = price.reason ?? "";
  errorReasons += errorReasons ? " " : ""; //separation space
  errorReasons += product.reason ?? "";

  if (errorReasons) {
    return errorReasons;
  }

  return {
    id,
    price: price.value,
    product: product.value,
  };
};

const promiseRaceSolution = async (id) => {
  try {
    //promise race get first to be done (either resolve or rejected)
    let product = await Promise.race([productsAsync(id), productsAsync(id)]);
    let price = await Promise.race([pricesAsync(id), pricesAsync(id)]);

    return {
      id,
      price,
      product,
    };
  } catch (error) {
    return "Error: " + error.message;
  }
};

const promiseAnySolution = async (id) => {
  try {
    //promise any get first to be done successfully resolved!
    let product = await Promise.any([productsAsync(id), productsAsync(id)]);
    let price = await Promise.any([pricesAsync(id), pricesAsync(id)]);

    return {
      id,
      price,
      product,
    };
  } catch (error) {
    //Handle internal errors
    let additionalDetails = error?.errors?.map((e) => e.message).join(" | ");
    if (additionalDetails) {
      return "Error: " + error.message + " - DETAILS: " + additionalDetails;
    }
    return "Error: " + error.message + additionalDetails;
  }
};

module.exports = {
  promiseAllSolution,
  promiseAllSettledSolution,
  promiseRaceSolution,
  promiseAnySolution,
};
