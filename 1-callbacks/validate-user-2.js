//Additional file to do challenge Promisify the callback

"use strict";

const allowedUsers = ["John", "Mary", "Richard", "Stacy"];

module.exports = (name) => {
  if (!allowedUsers.includes(name)) {
    return new Promise(function(resolve, reject){
        reject(Error(`User ${name} not allowed`))
    });
  }

  return new Promise(function(resolve, reject){
    const id = Math.floor(Math.random() * 101);
    setTimeout(resolve({id, name}), 300);
  });
};