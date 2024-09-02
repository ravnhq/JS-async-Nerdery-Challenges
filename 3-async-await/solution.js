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

const getProduct = require('./products');
const getPrice = require('./prices');

async function solution() {
	// YOUR SOLUTION GOES HERE
	let text = { id, product: null, price: null };

	// You generate your id value here
	let id = Date.now().toString().slice(-2);

	// You use Promise.all() here
	console.log('----segment of Promise.all():');
	try {
		await Promise.all([
			(async () => {
				const product = await getProduct(+id);
				text.product = product;
			})(),
			(async () => {
				const price = await getPrice(+id);
				text.price = price;
			})(),
		]);

		console.log(text);
	} catch (error) {
		console.log(`without data for the id: ${id}`);
	}

	// You use Promise.allSettled() here
	console.log('\n----segment of Promise.allSettled():');
	const promiseSettled = await Promise.allSettled([
		getPrice(+id),
		getProduct(+id),
	]);

	let result = promiseSettled.map((v) => {
		if (v.status === 'fulfilled') {
			return v.value;
		}

		return 'not found';
	});

	text.price = result[0];
	text.product = result[1];

	// Log the results, or errors, here
	console.log(text);

	// You use Promise.any() here
	console.log('\n----segment of Promise.any():');

	try {
		const promiseRaced = await Promise.any([getPrice(+id), getProduct(+id)]);

		if (!isNaN(Number(promiseRaced))) {
			text.price = promiseRaced;
			delete text.product;
		} else {
			text.product = promiseRaced;
			delete text.price;
		}

		// Log the results, or errors, here
		console.log(text);
	} catch (error) {
		console.log(`without data for the id: ${id}`);
	}

	// You use Promise.race() here
	console.log('\n----segment of Promise.race():');

	try {
		const promiseRaced = await Promise.race([getPrice(+id), getProduct(+id)]);

		if (!isNaN(Number(promiseRaced))) {
			text.price = promiseRaced;
			delete text.product;
		} else {
			text.product = promiseRaced;
			delete text.price;
		}

		// Log the results, or errors, here
		console.log(text);
	} catch (error) {
		console.log(`without data for the id: ${id}`);
	}
}

solution();
