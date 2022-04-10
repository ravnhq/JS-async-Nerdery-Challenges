const {setTimeout} = require('timers/promises')

const prices = [5, 0.50, 2, 7, 1.5]

module.exports = async (id) => {
    await setTimeout(Math.floor(Math.random() * 3000))

    if (!(id % 4)) {
        throw Error('This is a forced internal error')
    }

    return prices[id % 5]
}
