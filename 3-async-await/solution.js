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

const prices = require("./prices");
const products = require("./products");

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    const id = parseInt(Date.now().toString().slice(-2));

    // You use Promise.all() here

    try {
        const [product, price] = await Promise.all([products(id), prices(id)]);

        console.log({ id, product, price });
    } catch (error) {
        console.log(error.message);
    }

    // You use Promise.allSettled() here

    const results = await Promise.allSettled([
        products(id), // {status, value}
        prices(id), // {status, value}
    ]);

    const product = {
        id,
        product: "",
        price: 0,
    };

    results.forEach((result) => {
        result.status === "fulfilled" &&
            (typeof result.value === "string"
                ? (product.product = result.value)
                : (product.price = result.value)),
            result.status === "rejected" && console.error(result.error);
    });

    // Log the results, or errors, here
    console.log(product);
}

solution();
