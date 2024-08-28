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

const nameValidator = require('./validate-user.js');

function solution() {
    let allowedUsers = [];
    let deniedUsers = [];
    let current = 0;

    const users = ["Michael", "Mary", "Richard", "Sadie", "Benjamin"];

    users.forEach((user) => {
        nameValidator(user, (error, result) => {
            if (error) {
                deniedUsers.push(user);
            } else {
                allowedUsers.push(result);
            }

            current++;

            if (current === users.length) {
                // log the final result
                console.log('---------- Callback Solution ----------')
                console.log('Allowed users:')
                console.log(allowedUsers)

                console.log('Denied users:')
                console.log(deniedUsers)
            }
        });
    });
}

solution();

// Promisify Solution

// Importing Utilities module 
const util = require('util');

const nameValidatorPromise = util.promisify(nameValidator);

function promisedSolution(users) {
    let allowedUsers = [];
    let deniedUsers = [];

    const promises = users.map(user => 
        nameValidatorPromise(user)
            .then(validUser => allowedUsers.push(validUser))
            .catch(error => deniedUsers.push(user))
    );

    Promise.allSettled(promises)
        .then(results => {
            // log the final result
            console.log('---------- Promise Solution ----------');
            console.log('Allowed users:');
            console.log(allowedUsers);

            console.log('Denied users:');
            console.log(deniedUsers);
        });
}

promisedSolution(["Michael", "Mary", "Richard", "Sadie", "Benjamin"]);

async function readliner() {
    const readline = require('readline/promises');
    const { stdin: input, stdout: output } = require('process');

    const consoleReader = readline.createInterface({ input, output });

    const answer = await consoleReader.question('Provide a list of Names, separated by spaces or commas: ');

    const names = answer.split(/[\s,]+/);

    promisedSolution(names);
}

readliner();
