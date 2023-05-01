"use strict";

const allowedUsers = ["John", "Mary", "Richard", "Stacy"];

module.exports = (name, cb) => {
    if (!allowedUsers.includes(name)) {
        cb(Error(`User ${name} not allowed`));
        return;
    }

    setTimeout(() => {
        const id = Math.floor(Math.random() * 101);
        cb(null, { id, name });
    }, 300);
};
