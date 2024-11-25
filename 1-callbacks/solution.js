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

const validateUser = require('./validate-user');
const { argv } = require('node:process');
const util = require('util')

const NAMES = ['John', 'Mary', 'Gabriel', 'Angie', 'Carlos'];

function solution(names = []) {
    // YOUR SOLUTION GOES HERE
    // you get your 5 names here
    if (names.length === 0) { names = NAMES };
    let counter = 0;
    const success = [];
    const failure = [];

    const hasFinished = () => {
        if (counter === names.length) {
            console.log('Success\n');
            success.forEach(succ => console.log(succ));

            console.log('\nFailure\n');
            failure.forEach(fail => console.log(fail));
        }
    }

    // iterate the names array and validate them with the method
    names.forEach(name => {
        validateUser(name, (err, data) => {
            if (err) {
                failure.push(err.message);
            } else {
                success.push(`id: ${data.id}\nname ${data.name}`);
            }
            counter++;
            // log the final result
            hasFinished()
        })
    });

}

function argvSolution() {
    const names = argv.slice(2);
    solution(names);
}

function promisifySolution(names = []) {
    if (names.length === 0) { names = NAMES };
    const success = [];
    const failure = [];

    const validateUserPromisified = util.promisify(validateUser);
    const promises = names.map(name => {
        return validateUserPromisified(name)
            .then(data => success.push(`id: ${data.id}\nname: ${data.name}`))
            .catch(err => failure.push(err.message));
    });

    Promise.all(promises).then(() => {
        console.log('Success\n');
        success.forEach(succ => console.log(succ));

        console.log('\nFailure\n');
        failure.forEach(fail => console.log(fail));
    });
}
solution()
// argvSolution()
// promisifySolution()
