'use strict'

const allowedUsers = ['John', 'Mary', 'Richard', 'Stacy']

module.exports = (name, cb) => {
    if (!allowedUsers.includes(name)) {
        cb(Error('User not allowed'))
        return
    }

    setTimeout(() => {
        // const id = Math.random().toString(36).split('.')[1].slice(0, 4)
        const id = Math.floor(Math.random() * 101)
        cb(null, {id, name})
    }, 300)
}
