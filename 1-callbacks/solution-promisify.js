const { promisify } = require("util");
const validateUser = require("./validate-user");

async function solution() {
  const users = ["Mary", "Daniel", "Stacy", "Gerardo", "Diego"];

  let successList = 'Success\n\n';
  let failureList = 'Failure\n\n';

  for (const user of users) {
    const validateUserPromisify = promisify(validateUser);

    try {
      const result = await validateUserPromisify(user);
      successList += `id: ${result.id} \nname: ${result.name}\n`;
    } catch (error) {
      failureList += `${error.message}\n`;
    }
  }

  console.log(successList);
  console.log(failureList);
}

solution();
