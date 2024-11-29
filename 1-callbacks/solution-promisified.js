/*
INSTRUCTIONS

1. create an array that contains 5 names, include 1 or more of the allowed usernames located in validate-user.js
2. iterate the array, keep an eye on performance, and validate every username with the function exported in validate-user.js
3. process and format every result, so that the program console.log the success results in a group, and the failure results in a group

Example:

Success

id:1
name: John

id:2
name: Mary

Failure

User Michael not allowed
User Benjamin not allowed

4. if you want to challenge yourself, add the needed logic so the program can read the array of names from the terminal
** check about node.js process.argv **

Example:

node solution.js name1,name2,name3, or
node solution.js name1 name2 name3

5. another challenge is: after you solve the challenge using callback style, in another file promisify the callback and solve it again
** give a look to node.js util.promisify, avoid to alter the validate-user.file **
*/
const validateUser = require("./validate-user.js");
const util = require("node:util");

async function solution() {
  // you get your 5 names here
  const names = ["Carlos", "Andrea", "Miguel", "Juan", "Richard"];

  // extra challange #1 read from terminal arguments
  // eslint-disable-next-line no-undef
  if (process.argv.length > 2) {
    // eslint-disable-next-line no-undef
    names.push(...process.argv.slice(2));
  }

  // Extra challenge #2. Promisify the callback function.
  const promisifiedValidateUsed = util.promisify(validateUser);

  const validationPromises = [];
  // iterate the names array and validate them with the method
  for (const name of names) {
    validationPromises.push(promisifiedValidateUsed(name));
  }

  const data = await Promise.allSettled(validationPromises);

  showResults(data);

  // log the final result
  function showResults(data) {
    console.log(
      data.reduce(
        (accumulator, currentValue, currentIndex, array) => {
          if (currentValue.status === "fulfilled") {
            accumulator.success.push(currentValue.value);
          } else if (currentValue.status === "rejected") {
            accumulator.fail.push(currentValue.reason.message);
          }
          return accumulator;
        },
        { success: [], fail: [] },
      ),
    );
  }
}

solution();
