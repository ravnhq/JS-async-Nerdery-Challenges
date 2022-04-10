'use strict'

const {setTimeout} = require('timers/promises')

const products = ['towel', 'salt', 'soap', 'table cleaner', 'sugar']

module.exports = async (id) => {
    await setTimeout(Math.floor(Math.random() * 2000))

    if (!(id % 3)) {
        throw Error('This is a forced internal error')
    }

    return products[id % 5]
}
