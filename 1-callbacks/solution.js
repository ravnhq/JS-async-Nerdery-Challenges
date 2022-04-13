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
*/

const validateUser = require('./validate-user.js');
const validatedNames = [];
const noValidatedNames = [];
var names = [];

function solution() {
    // YOUR SOLUTION GOES HERE

    // you get your 5 names here
    names = ["John", "Mary", "Delia", "Roberto", "Melissa"];

    // iterate the names array and validate them with the method
    for(let name of names){
        validateUser(name, sortUsers);
    }

    // log the final result
    // The log is within sortUsers callback

}

function sortUsers(error, success){

    if(error instanceof Error){
        noValidatedNames.push(error.message);
    }else{
        validatedNames.push(success);
    }
    if(validatedNames.length + noValidatedNames.length === names.length){
        printSortedUsers();
    }

}

function printSortedUsers(){
    
    console.log("Success\n");
    
    for(let user of validatedNames){
        console.log(`id:${user.id}`);
        console.log(`name:${user.name}\n`);
    }

    console.log("Failure\n");
    for(let user of noValidatedNames){
        console.log(user);
    }
}

solution()


