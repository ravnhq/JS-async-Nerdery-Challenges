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

const products = require('./products');
const prices = require('./prices');

async function solution() {
  // YOUR SOLUTION GOES HERE

  const generateId = () => {
    return Date.now() % 100;
  };

  let id = generateId();
  let promises = [products(id), prices(id)];
  let result;

  // Promise.allSettled
  try {
    let promiseAllSettledResults = await Promise.allSettled(promises);

    promiseAllSettledResults.forEach((result) => {
      if (result.status === 'rejected') {
        throw Error(result.reason.message);
      }
    });
    result = {
      id: id,
      product: promiseAllSettledResults[0].value,
      price: promiseAllSettledResults[1].value,
    };
    console.log('Promise.allSettled Results: ', result);
  } catch (err) {
    console.log('Promise.allSettled Error: ', err.message);
  }

  // Promise.all

  try {
    let promiseAllResults = await Promise.all(promises);
    result = {
      id: id,
      product: promiseAllResults[0],
      price: promiseAllResults[1],
    };
    console.log('Promise.all Results:', result);
  } catch (err) {
    console.log("Promise.all Error: ", err.message);
  }

  // Promise.race (It only returns the first promise that resolves or rejects)
  try {
    let promiseRaceResults = await Promise.race(promises);
    result = {
      id: id,
      firstResult: promiseRaceResults,
    };
    console.log('Promise.race Results:', result);
  } catch (err) {
    console.log("Promise.race Error: ", err.message);
  }

  // Promise.any (It only returns the first promise that resolves)
  try {
    let promiseAnyResults = await Promise.race(promises);
    result = {
      id: id,
      firstResult: promiseAnyResults,
    };
    console.log('Promise.any Results:', result);
  } catch (err) {
    console.log("Promise.any Error: ", err.message);
  }
}

solution();
