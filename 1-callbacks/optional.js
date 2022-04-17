"use strict";
const validateUser = require("./validate-userOptional");

const evaluateDataTerminal = () => {
  if (process.argv.length !== 2) {
    return process.argv.slice(2);
  } else {
    return ["Gabo", "Martha", "John", "Mary", "Juan"];
  }
};

function solution() {
  const successArray = [];
  const failureArray = [];
  const arrayDataUsers = [];
  const namesAuxArray = evaluateDataTerminal();

  //here the first letter of the names is transformed to uppercase to be evaluated
  const namesArray = namesAuxArray.map(
    (name) => name.charAt(0).toUpperCase() + name.slice(1)
  );

  const loadData = (error, person) => {
    if (error === null) {
      return person;
    } else {
      return error.message;
    }
  };

  for (let name of namesArray) {
    arrayDataUsers.push(validateUser(name, loadData));
  }

  Promise.allSettled(arrayDataUsers)
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "rejected") {
          failureArray.push(data[i]);
        } else {
          successArray.push(data[i]);
        }
      }
    })
    .finally(() => {
      console.log("Success");
      for (let element of successArray) {
        console.log(`\nid:${element.value.id}\nname: ${element.value.name}`);
      }
      console.log("\nFailure \n");
      for (let element of failureArray) {
        console.log(element.reason);
      }
    });
}

solution();
