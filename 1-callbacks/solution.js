
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

let validateUser = require("./validate-user");

function solution() {
    // YOUR SOLUTION GOES HERE
    // you get your 5 names here
    const allowedUsers = ["John", "Mary", "Benjamin","Diego", "Stacy"];
    let success = [];
    let failed = [];

    // iterate the names array and validate them with the method;

    for (let i = 0; i < allowedUsers.length; i++) {
        validateUser(allowedUsers[i],function(err,data) {
            
            if(err !== null){
                failed.push(err.message);
            }

            if( data !== undefined){
                success.push(data)
            }
        });
    }


    // log the final result;
    setTimeout(() => {
        console.log("Success")
        success.map((item) => {
            console.log(`id:${item.id} \nname:${item.name}`)
        })

        console.log("\nFailed")
        failed.map((item) => console.log(item))
    },500)
}

solution()


