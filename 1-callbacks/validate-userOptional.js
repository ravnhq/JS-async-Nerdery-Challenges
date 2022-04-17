"use strict";

const allowedUsers = ["John", "Mary", "Richard", "Stacy"];

module.exports = (name, cb) => {
  return new Promise((resolve, reject) => {
    if (!allowedUsers.includes(name)) {
      reject(cb(new Error(`User ${name} not allowed`)));
    }

    setTimeout(() => {
      const id = Math.floor(Math.random() * 101);
      resolve(cb(null, { id, name }));
    }, 300);
  });
};
