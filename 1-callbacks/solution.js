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
    const validateUser = require('./validate-user');
    let TestUsers=[];
    const AllowedUsers = [];
    const NotAllowedUsers = [];

    // Include process module to support arguments from the console
    const process = require('process');
    var args = process.argv;
    if(args.length === 2){ //If there are no arguments coming , we setup a couple of test names
        TestUsers=['Sam', 'Mary', 'Juan', 'Stacy','Jimmy'];
    }
    else{
        args.forEach((val, index) => {
            if(index>1)
                TestUsers.push(val);
        });
    }

    const cbFn=(error,data) => {
        if(error){
            NotAllowedUsers.push(error.message)
        }
        else{
            AllowedUsers.push(`id: ${data.id}\nname: ${data.name}`);
        }

        if(AllowedUsers.length+NotAllowedUsers.length === TestUsers.length){ //Once all names have been processed we print the result
            console.log('Success\n\n',AllowedUsers.join('\n\n'));
            console.log('\nFailure\n\n',NotAllowedUsers.join('\n'));
        }
      };
    TestUsers.forEach(function(user){
        validateUser(user,cbFn)
    })
}

solution()


