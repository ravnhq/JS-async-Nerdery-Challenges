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

let allowedUsers = []
let deniedUsersErrors = []

function processValidationResult(error, data, isLastCallback) {
    error ? deniedUsersErrors.push(error.message) : allowedUsers.push(data);

    if (isLastCallback) {
        printAlowedAndDeniedUsers()
    }
}

function printAlowedAndDeniedUsers() {
    console.log("Success \n")
    allowedUsers.forEach(userWithId => {
        console.log(`id: ${userWithId.id}`)
        console.log(`name: ${userWithId.name} \n`)
    })
    console.log("Failure \n")
    deniedUsersErrors.forEach(errorMessage => {
        console.log(errorMessage)
    })
}

function solution() {
    // YOUR SOLUTION GOES HERE

    // you get your 5 names here
    let userNames = ["Juan", "Roberto", "Kevin", "Richard", "Mary"]

    let processedCount = 0;
    const totalUsers = userNames.length;

    // iterate the names array and validate them with the method
    userNames.forEach((name, index) => {
        validateUser(name, function (error, data) {
            const isLastCallback = ++processedCount === totalUsers;
            processValidationResult(error, data, isLastCallback)            
        })
    })

    // log the final result
    // defered to last callback
}

solution()


