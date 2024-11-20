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
const validateUser = require("./validate-user");

const processResults = (succesUsers, failUsers) => {
  const successOutput = succesUsers
    .map(({ id, name }) => `id:${id}\nname: ${name}`)
    .join("\n\n");

  const failureOutput = failUsers.join("\n");

  console.log(`Success\n\n${successOutput}\n\nFailure\n\n${failureOutput}`);
};

function solution() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      "No usernames provided. Usage: node solution.js name1 name2 name3"
    );
    return;
  }

  const succesUsers = [];
  const failUsers = [];

  let counter = 0;

  const callbackValidate = (err, user) => {
    if (err) {
      failUsers.push(err.message);
    }

    if (user) {
      succesUsers.push(user);
    }

    counter++;

    if (counter === args.length) {
      processResults(succesUsers, failUsers);
    }
  };

  args.forEach((user) => {
    validateUser(user, callbackValidate);
  });
}

solution();
