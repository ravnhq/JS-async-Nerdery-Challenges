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

function solution() {
  // YOUR SOLUTION GOES HERE
  // You generate your id value here
  const idGenerator = () => {
    return Date.now().toString().slice(-2);
  };
  const id = idGenerator();

  // You use Promise.all() here
  const promiseAll = async () => {
    try {
      const [price, product] = await Promise.all([prices(id), products(id)]);
      return {
        way: "promiseAll",
        result: { id: id, product: product, price: price },
      };
    } catch (error) {
      throw error;
    }
  };

  // You use Promise.allSettled() here
  const promiseAllSettled = async () => {
    try {
      const [priceResponse, productResponse] = await Promise.allSettled([
        prices(id),
        products(id),
      ]);
      if (
        priceResponse.status == "fulfilled" &&
        productResponse.status == "fulfilled"
      ) {
        return {
          way: "promiseAllSettled",
          result: {
            id: id,
            product: priceResponse.value,
            price: priceResponse.value,
          },
        };
      } else {
        throw Error("This is a forced internal error");
      }
    } catch (error) {
      throw error;
    }
  };

  // Log the results, or errors, here
  const promiseRace = async () => {
    try {
      const { way, result } = await Promise.race([
        promiseAll(),
        promiseAllSettled(),
      ]);
      console.log(`${way} was faster`);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  promiseRace();
}

solution();
