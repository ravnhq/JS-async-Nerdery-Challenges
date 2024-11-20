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

const products = require("./products.js");
const prices = require("./prices.js");

const generateID = () => new Date().getTime().toString().slice(-2);

async function solution() {
  const ID = generateID();

  // Promises
  const promises = [products(ID), prices(ID)];

  // Promise.allSettled
  const resultsAllSettled = await Promise.allSettled(promises);

  // Errors validations
  const allFulfilled = resultsAllSettled.every(
    (result) => result.status === "fulfilled"
  );

  // Log results
  if (allFulfilled) {
    const productName = resultsAllSettled[0].value;
    const productPrice = resultsAllSettled[1].value;

    console.log(`(Promise.AllSettled):`, {
      id: ID,
      product: productName,
      price: productPrice,
    });
  }

  // Log errors
  if (!allFulfilled) {
    console.log(
      `Error (Promise.allSettled): ${
        resultsAllSettled[0].reason || "Unknown error"
      }`
    );
  }

  // Promise.all
  try {
    const [productName, productPrice] = await Promise.all(promises);
    console.log(`(Promise.All):`, {
      id: ID,
      product: productName,
      price: productPrice,
    });
  } catch (error) {
    console.log(`Error (Promise.All): ${error.message || "Unknown error"}`);
  }

  // Promise.race
  try {
    const firstResolved = await Promise.race(promises);
    console.log(`First resolved (Promise.race):`, {
      id: ID,
      data: firstResolved,
    });
  } catch (error) {
    console.log(`Error (Promise.race): ${error.message || "Unknown error"}`);
  }

  // Promise.any
  try {
    const firstFulfilled = await Promise.any(promises);
    console.log(`First fulfilled (Promise.any):`, {
      id: ID,
      data: firstFulfilled,
    });
  } catch (error) {
    console.log(`Error (Promise.any):`, error.errors || "Unknown error");
  }
}

solution();
