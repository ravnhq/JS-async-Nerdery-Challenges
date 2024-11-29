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
const prices = require("./prices.js");
const products = require("./products.js");

async function solution() {
  // is this a bad practice? declaring but no initalization of variables that will eventually have a value in all logic branches?
  let allResult, settledResult, raceResult, anyResult;

  // You generate your id value here
  const random = parseInt(Date.now().toString().slice(-2));

  const promises = [products(random), prices(random)];

  // You use Promise.all() here
  let all = "";
  try {
    const [all_product, all_price] = await Promise.all(promises);
    all = `Product: ${all_product} Prices: ${all_price}`;
  } catch (error) {
    all = `Error: ${error.message}`;
  } finally {
    console.log(`All = Id: ${random} , ${all}`);
  }

  // You use Promise.allSettled() here
  settledResult = await Promise.allSettled(promises);

  console.log("Settled = ");
  console.table(
    settledResult.map(({ status, value, reason }, index) => {
      return {
        //index,
        status,
        name: index === 0 ? "Product" : "Price",
        value: status === "fulfilled" ? value : reason.message,
      };
    }),
  );

  // Promise.race
  let race = "";
  try {
    const race_promise = await Promise.race(promises);
    race =
      typeof raceResult === "number"
        ? `Prices: ${race_promise} `
        : `Product: ${race_promise} `;
  } catch (error) {
    race = `Error: ${error.message}`;
  } finally {
    console.log(`Race = Id: ${random} `, race);
  }

  // Promise.any
  let any = "";
  try {
    const any_promise = await Promise.any(promises);
    any =
      typeof anyResult === "number"
        ? `Prices: ${any_promise} `
        : `Product: ${any_promise} `;
  } catch (error) {
    any = `Error: ${error.message}`;
  } finally {
    console.log(`Any = Id: ${random} `, any);
  }
}

solution();
