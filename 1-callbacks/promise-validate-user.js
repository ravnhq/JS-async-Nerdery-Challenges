'use strict'

const allowedUsers = ['John', 'Mary', 'Richard', 'Stacy']

module.exports = (name) => {
    return new Promise((resolve, reject) => {
        if (!allowedUsers.includes(name)) {
            reject(Error(`User ${name} not allowed`))
        }

        setTimeout(() => {
            const id = Math.floor(Math.random() * 101)
            resolve({id, name})
        }, 300)
    })
}
