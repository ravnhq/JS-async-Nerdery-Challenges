const validateUser = require("./validate-user");
const { promisify } = require("util");

const validateUserAsync = promisify(validateUser);

const processResults = (succesUsers, failUsers) => {
  const successOutput = succesUsers
    .map(({ id, name }) => `id:${id}\nname: ${name}`)
    .join("\n\n");

  const failureOutput = failUsers.join("\n");

  console.log(`Success\n\n${successOutput}\n\nFailure\n\n${failureOutput}`);
};

async function solution() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(
      "No usernames provided. Usage: node solution.js name1 name2 name3"
    );
    return;
  }

  const successUsers = [];
  const failUsers = [];

  await Promise.all(
    args.map(async (user) => {
      try {
        const validUser = await validateUserAsync(user);
        successUsers.push(validUser);
      } catch (e) {
        failUsers.push(`User ${user} not allowed`);
      }
    })
  );

  processResults(successUsers, failUsers);
}

solution();
