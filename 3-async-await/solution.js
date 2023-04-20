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

const { Console } = require("console");

async function solution() {
  // YOUR SOLUTION GOES HERE
  const products = require("./products");
  const prices = require("./prices");

  // You generate your id value here
  const id = String(Date.now()).slice(-2);

  // You use Promise.all() here
  let resultAll, errorAll;
  try {
    resultAll = await Promise.all([products(id), prices(id)]);
  } catch (error) {
    errorAll = error.message;
  }

  // You use Promise.allSettled() here
  const resultAllSettled = await Promise.allSettled([products(id), prices(id)]);

  // Using Promise.any()
  let resultAny, errorAny;
  try {
    resultAny = await Promise.any([products(id), prices(id)]);
  } catch (error) {
    errorAny = error.message;
  }

  // Using Promise.race()
  let resultRace, errorRace;
  try {
    resultRace = await Promise.race([products(id), prices(id)]);
  } catch (error) {
    errorRace = error.message;
  }

  // Log the results, or errors, here
  console.log("\n---------- With Promise.all() ---------");
  if (errorAll) {
    console.log(`One of the promises was rejected: ${errorAll}`);
  } else {
    const data = { id, product: resultAll[0], price: resultAll[1] };
    console.log(data);
  }

  console.log("\n------ With Promise.allSettled() ------");
  if (resultAllSettled[0].status === "rejected") {
    console.log(
      `The first promise was rejected: ${resultAllSettled[0].reason.message}`
    );
  }
  if (resultAllSettled[1].status === "rejected") {
    console.log(
      `The second promise was rejected: ${resultAllSettled[1].reason.message}`
    );
  }
  const data = {
    id,
    product: resultAllSettled[0].value,
    price: resultAllSettled[1].value,
  };
  console.log(data);

  console.log("\n---------- With Promise.any() ---------");
  if (errorAny) {
    console.log(errorAny);
  } else {
    console.log(`The first fulfilled value is ${resultAny}`);
  }

  console.log("\n--------- With Promise.race() ---------");
  if (errorRace) {
    console.log(`The first settled value is an error: ${errorRace}`);
  } else {
    console.log(`The first settled value is ${resultRace}`);
  }
}

solution();
