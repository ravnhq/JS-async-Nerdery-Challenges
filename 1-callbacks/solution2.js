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

const { validateUser, printResults } = require("./validate-user");
const util = require("util");

function solution() {
  // YOUR SOLUTION GOES HERE
  const successUser = [];
  const failureUser = [];

  // you get your 5 names here
  let sampleUsers = ["Ronald", "Mary", "Ris", "Stacy", "Ashley"];

  //Reading from console: node solution2.js Ronald Kai Jonh John Mary Richard Stacy
  if (process.argv.length > 2) {
    sampleUsers = process.argv.slice(2);
  }

  const validateUserAsync = util.promisify(validateUser);

  // iterate the names array and validate them with the method
  const promises = sampleUsers.map((name) => validateUserAsync(name));
  Promise.allSettled(promises)
    .then((results) => {
      results.forEach((r) => {
        if (r.status === "rejected") {
          failureUser.push(r.reason.message);
          return;
        }
        successUser.push(r.value);
      });
    })
    .finally(() => {
      printResults(successUser, failureUser);
    });
}

solution();
