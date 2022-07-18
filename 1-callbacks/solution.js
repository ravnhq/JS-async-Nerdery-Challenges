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

function solution() {
  //node 1-callbacks/solution.js John Mary José Alonso Javier Richard Gustavo
  //Next line will make the command above work as $users array
  const args = require("node:process").argv.slice(2);

  const validateUser = require("./validate-user.js");
  // success and failure arrays will store the result of callbacks
  const success = [];
  const failure = [];

  const defaultUsers = ["José", "Mary", "Angie", "John", "Quentin"];
  // if there's not args in the command => use default call
  if (args.length === 0) {
    users = defaultUsers;
  } else {
    users = args;
  }
  try {
    users.forEach((user) => validateUser(user, callBackHandler));
  } catch (error) {
    console.error(error.message);
  }

  function callBackHandler(error, usr) {
    if (error === null) {
      success.push(usr);
    } else {
      failure.push(error.message);
    }
    //if done iterating the array => call print function
    if (success.length + failure.length === users.length) {
      printResults();
    }
  }
  function printResults() {
    if (success.length) {
      console.log("\nSuccess\n");
      for (let i = 0; i < success.length; i++) {
        console.log(`id: ${success[i].id}`);
        console.log(`name: ${success[i].name}\n`);
      }
    } else console.log("\nNo user was allowed.");
    if (failure.length) {
      console.log("\nFailure\n");
      for (let i = 0; i < failure.length; i++) {
        console.log(`${failure[i]}\n`);
      }
    } else console.log("\nEvery user was allowed.");
  }
}

solution();
