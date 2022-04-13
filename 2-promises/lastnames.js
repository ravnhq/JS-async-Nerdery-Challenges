'use strict'

const lastnames = ['Barlowe', 'Caddel', 'Hart', 'Katz', 'Laurier']

module.exports = async (id) => {
    if (typeof id !== 'number') {
        throw Error('ID type is incorrect')
    }

    if (id < 0 || !Number.isInteger(id)) {
        throw Error('ID type must be a positive integer')
    }

    if (id % 5 === 0) {
        return 'Franklin'
    }

    return lastnames[id % 5]
}
