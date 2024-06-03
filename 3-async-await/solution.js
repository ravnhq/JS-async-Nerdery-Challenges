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

const products = require("./products")
const prices = require("./prices")

async function getProductAndPriceOrError(id) {
    try {
        const [product, price] = await Promise.all([products(id), prices(id)]);
        return { id, product, price };
    } catch (error) {
        throw error
    }
}

async function getProductOrPriceOrError(id) {
    const [productWithStatus, priceWithStatus] = await Promise.allSettled([products(id), prices(id)]);

    let productOrError, priceOrError;

    // Handle different conditions for product and price
    if (productWithStatus.status === "fulfilled" && priceWithStatus.status === "fulfilled") {
        productOrError = productWithStatus.value;
        priceOrError = priceWithStatus.value;
    } else {
        if (productWithStatus.status === "rejected" && priceWithStatus.status === "fulfilled") {
            productOrError = `Product not found for ID: ${id}, should have price: ${priceWithStatus.value}`;
            priceOrError = priceWithStatus.value;
        } else if (priceWithStatus.status === "rejected" && productWithStatus.status === "fulfilled") {
            productOrError = productWithStatus.value;
            priceOrError = `Price not found for product: ${productWithStatus.value} with ID: ${id}`;
        } else if (productWithStatus.status === "rejected" && priceWithStatus.status === "rejected") {
            throw new Error(`No Product or Price found for ID: ${id}`);
        }
    }

    return { id, productOrError, priceOrError };
}

function printProductInformationResult(id, product, price) {
    console.log(`ID: ${id}, PRODUCT: ${product}, PRICE: ${price}`);
}

async function solution() {
    // YOUR SOLUTION GOES HERE

    // You generate your id value here
    let firstId = Date.now() % 100;

    // You use Promise.all() here
    try {
        result = await getProductAndPriceOrError(firstId);
        printProductInformationResult(result.id, result.product, result.price);
    } catch (error) {
        console.log(error.message);
    }        

    // You use Promise.allSettled() here
    let secondId = Date.now() % 100;
    try {
        result = await getProductOrPriceOrError(secondId);
        printProductInformationResult(result.id, result.productOrError, result.priceOrError);
    } catch (error) {
        console.log(error.message);
    }
    // Log the results, or errors, here
}

solution()
