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
  // THIS FUNCTION IS NO LONGER BEING UPDATED
  const validateUser = require("./validate-user.js");
  const success = [];
  const failure = [];
  const users = ["José", "Mary", "Angie", "John", "Quentin"];
  try {
    users.forEach((user) => validateUser(user, callBackHell));
    // validateUser("John", callBackHell);
  } catch (error) {
    console.error(error.message);
  }
  function callBackHell(cb1, cb2) {
    if (cb1 === null) {
      success.push(cb2);
      // console.log(success);
    } else {
      failure.push(cb1.message);
      // console.log(failure);
    }
    //if done pushing call print function
    if (success.length + failure.length === users.length) {
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

  // const callback = (error, data) => {
  //   if (error) {
  //     failure.push(error.message);
  //   } else {
  //     success.push(data);
  //   }
  // };
  // const promArr = users.map((element) => {
  //   return new Promise((resolve) => {
  //     validateUser(element, (error, data) => {
  //       if (error) {
  //         failure.push(error.message);
  //         resolve(error.message);
  //       } else {
  //         success.push(data);
  //         resolve(data);
  //       }
  //     });
  //   });
  // });
  // Promise.all(promArr)
  //   .then((values) => {
  //     if (success.length) {
  //       console.log("\nSuccess\n");
  //       for (let i = 0; i < success.length; i++) {
  //         console.log(`id: ${success[i].id}`);
  //         console.log(`name: ${success[i].name}\n`);
  //       }
  //     } else console.log("\nNo user was allowed.");
  //     if (failure.length) {
  //       console.log("\nFailure\n");
  //       for (let i = 0; i < failure.length; i++) {
  //         console.log(`${failure[i]}\n`);
  //       }
  //     } else console.log("\nEvery user was allowed.");
  //   })
  //   .then((val) => console.log(success));
}

solution();
