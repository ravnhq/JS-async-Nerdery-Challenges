"use strict";

const allowedUsers = ["John", "Mary", "Richard", "Stacy"];

const validateUser = (name, cb) => {
  if (!allowedUsers.includes(name)) {
    cb(Error(`User ${name} not allowed`));
    return;
  }

  setTimeout(() => {
    const id = Math.floor(Math.random() * 101);
    cb(null, { id, name });
  }, 300);
};

const printResults = (successUser, failureUser) => {
  let total = successUser.length + failureUser.length;
  console.log(`Success ${successUser.length}/${total}\n`);
  successUser.forEach((u) => console.log(`id:${u.id}\nname:${u.name}`));

  console.log();
  console.log(`Failure ${failureUser.length}/${total}\n`);
  failureUser.forEach((u) => console.log(u));
};

module.exports = {
  validateUser,
  printResults,
};
