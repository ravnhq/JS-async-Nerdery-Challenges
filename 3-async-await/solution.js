/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. don't use .then(), .catch() or .finally() here
3. both, products and prices methods expect a positive integer id
4. use Promise.all() and Promise.allSettled() to consume both methods
    in parallel
5. to generate the id do the following: invoke Date.now(),
    and take the last two digits, this will be your id
6. log the results with console.log(), the format is up to you,
    but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

7. both methods include some conditions to fail,
    at the end you should console.log() the errors,
    the format is up to you
8. add any needed adjustment to solution() function
9. as extra challenge: add Promise.race() and Promise.any(),
    and try to get the idea of what happens
*/

function solution() {
  // imports
  const getPrice = require("./prices.js");
  const getProduct = require("./products.js");
  //extract last 2 digit of Date.now string
  const createdId = Date.now().toString().slice(-2);

  const arrayOfPromises = [getProduct(createdId), getPrice(createdId)];
  const promiseAll = Promise.all(arrayOfPromises);
  const promiseAllSettled = Promise.allSettled(arrayOfPromises);

  // call to async function to resolve each case
  resolveAndPrintAsynchronously(promiseAll);
  resolveAndPrintAsynchronously(promiseAllSettled);

  async function resolveAndPrintAsynchronously(promise) {
    try {
      const [product, price] = await promise;
      // console.log(product);
      // console.log(price);

      //Promise.all returns the same array with resolved Promises
      if (typeof product === "string") {
        console.log("\n**Result of Promise.all():");
        console.log("Id: " + createdId);
        console.log("Product: " + product);
        console.log("Price: $" + price);
      }
      //Promise.allSettled returns an object with resolution of the promises
      if (typeof product === "object") {
        console.log("\n**Result of Promise.allSettled():");
        if (product.status === "rejected") {
          console.log("Unable to reach product name.");
          return;
        }
        if (price.status === "rejected") {
          console.log("Unable to reach price value.");
          return;
        }
        console.log("Id: " + createdId);
        console.log("Product: " + product.value);
        console.log("Price: $" + price.value);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
solution();
