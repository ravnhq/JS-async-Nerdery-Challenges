'use strict'

const allowedUsers = ['John', 'Mary', 'Richard', 'Stacy']

module.exports = (name) => {
    return new Promise((resolve, reject) => {
        if (!allowedUsers.includes(name)) {
            return reject(Error(`User ${name} not allowed`))
        }

        setTimeout(() => {
            const id = Math.floor(Math.random() * 101)
            return resolve({id, name})
        }, 300)
    })
}
