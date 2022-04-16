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

5. another challenge is: after you solve the challenge using callback style, in another file promisify the callback and solve it again
*/

const validate = require('./validate-user');

function solution() {
    const users = ['Charly', 'Michelle', 'John', 'Richard', 'Marcus'];
    const validationResult = {
        success: [],
        failure: [],
    }

    for (const user of users) {
        validate(user, formatValidation);
    } 

    function formatValidation(err, value){
        if (err) {
            validationResult.failure.push(err.message);
        } else {
            validationResult.success.push(`id: ${value.id} name: ${value.name}`);
        }
        if (validationResult.success.length + validationResult.failure.length === users.length) {
            console.log(validationResult)
        }
    }
}

solution()
