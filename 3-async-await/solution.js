const prices = require("./prices");
const products = require("./products");
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

function solution() {
  // YOUR SOLUTION GOES HERE

  // You generate your id value here
  let id = Date.now().toString().slice(-2);
  // You use Promise.all() here
  const promiseAll = async () => {
    try {
      const result = await Promise.all([products(id), prices(id)]);
      let resultObject = { id: id, product: result[0], price: result[1] };
      console.log(resultObject);
    } catch (error) {
      console.log(error.message);
    }
  };
  //promiseAll();
  // You use Promise.allSettled() here
  const promiseAllSettled = async () => {
    const result = await Promise.allSettled([products(id), prices(id)]);
    if (result[0].status === "fulfilled" && result[1].status === "fulfilled") {
      let resultObject = { id: id, product: result[0], price: result[1] };
      console.log(resultObject);
      return;
    }
    result.forEach((promise) => {
      if (promise.status === "rejected") {
        console.log(promise.reason);
        return;
      }
    });
  };
  //promiseAllSettled();
  const promiseRace = async () => {
    try {
      let result = await Promise.race([products(id), prices(id)]);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  //promiseAny();
  const promiseAny = async () => {
    try {
      let result = await Promise.any([products(id), prices(id)]);
      console.log(result);
    } catch (error) {
      console.log("None of the promises were resolved", error.message);
    }
  };
  promiseAny();
  // Log the results, or errors, here
}

solution();
