const validateUser = require("./validate-user");

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

//Complementing challenge with optional part 4
//here you get the array of names entered by the console or not
const evaluateDataTerminal = () => {
  if (process.argv.length !== 2) {
    return process.argv.slice(2);
  } else {
    return ["Gabo", "Martha", "John", "Mary", "Juan"];
  }
};

//show results function
const showResults = (successArray, failureArray) => {
  console.log("Success");
  for (let person of successArray) {
    console.log(`\nid:${person.id}\nname: ${person.name}`);
  }
  console.log("\nFailure \n");
  for (let failure of failureArray) {
    console.log(failure);
  }
};

function solution() {
  // YOUR SOLUTION GOES HERE}
  // you get your 5 names here
  const namesAuxArray = evaluateDataTerminal();

  //here the first letter of the names is transformed to uppercase to be evaluated
  const namesArray = namesAuxArray.map(
    (element) => element.charAt(0).toUpperCase() + element.slice(1)
  );

  const failureArray = [];
  const successArray = [];
  //load Data
  const loadData = (error, person) => {
    if (error === null) {
      successArray.push(person);
    } else {
      failureArray.push(error.message);
    }

    if (successArray.length + failureArray.length === namesArray.length) {
      showResults(successArray, failureArray);
    }
  };

  // iterate the names array and validate them with the method
  for (let name of namesArray) {
    validateUser(name, loadData);
  }

  // log the final result
}

solution();
