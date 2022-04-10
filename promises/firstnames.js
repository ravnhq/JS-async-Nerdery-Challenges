'use strict'

const names = {
    'Barlowe': 'Joseph',
    'Caddel': 'Linda',
    'Hart': 'Jim',
    'Katz': 'Oleg',
    'Laurier': 'Spencer'
}

module.exports = async (lastname) => {
    if (!Object.keys(names).includes(lastname)) {
        throw Error(`${lastname} does not exist in our records`)
    }

    return names[lastname]
}
