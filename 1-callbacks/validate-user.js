"use strict";

const allowedUsers = ["John", "Mary", "Richard", "Stacy"];

module.exports = (name, cb) =>
  new Promise(function (resolve) {
    if (!allowedUsers.includes(name)) {
      return resolve(cb(Error(`User ${name} not allowed`)));
    }

    setTimeout(() => {
      const id = Math.floor(Math.random() * 101);
      resolve(cb(null, { id, name }));
    }, 300);
  });
