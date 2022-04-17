const price = require("./prices");
const products = require("./products");
/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. both methods expect a positive integer id
3. use Promise.all and Promise.allSettled to consume both methods in parallel
4. to generate the id do the following invoke Date.now(), and take the last two digits, this will be your id, cast it accordingly
5. present correct results with console.log(), the format is up to you, but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

6. both methods include some conditions to fail, manage errors accordingly, at the end you should console.log() the errors,
the format is up to you
7. add any necessary adjustments to solution()

8. as an extra challenge add Promise.race() and Promise.any(), and try to get the idea of what happens
*/

async function solution() {
  // YOUR SOLUTION GOES HERE
  // You generate your id value here
  const id = Number(Date.now().toString().slice(-2));
  // You use Promise.all here
  const data = Promise.all([products(id), price(id)])
    .then(
      (res) =>
        `{
    id: ${id},\n    product: ${res[0]},
    price: ${res[1]},\n}`
    )
    .catch((error) => {
      throw new Error(error.message);
    });

  try {
    const result = await data;
    console.log(result);
  } catch (error) {
    console.log("Error: " + error.message);
  }

  // You use Promise.allSettled here
  const status = await Promise.allSettled([products(id), price(id)]);
  const [
    { status: statusOne, value: valuePromiseOne, reason: reasonOne },
    { status: statusTwo, value: valuePromiseTwo, reason: reasonTwo },
  ] = status;

  // Log the results or errors here

  console.log(`
    Info Data Promises
    __Products:
    status: ${statusOne}
    ${valuePromiseOne ? "value: " + valuePromiseOne : reasonOne}
    __Prices:
    status: ${statusTwo}
    ${valuePromiseTwo ? "value: " + valuePromiseTwo : reasonTwo}`);
}

solution();
