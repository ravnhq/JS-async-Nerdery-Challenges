async function solution() {
  const users = ["Mary", "Daniel", "Stacy", "Gerardo", "Diego"];

  const validateUser = require("./validate-user");
  const { promisify } = require("util");

  const successList = [],
    failureList = [];
  for (const user of users) {
    const validateUserPromisify = promisify(validateUser);
    try {
      const result = await validateUserPromisify(user);
      successList.push(result);
    } catch (error) {
      failureList.push(error.message);
    }
  }

  console.log("Success\n");
  for (const user of successList) {
    console.log(`id: ${user.id} \nname: ${user.name}\n`);
  }
  console.log("Failure\n");
  for (const message of failureList) {
    console.log(message);
  }
}

solution();
