const promisify = require('util').promisify;
const validator = require('./validate-user');

function solution() {
    // YOUR SOLUTION GOES HERE
    const vars = process.argv.slice(2).length ? [...process.argv.slice(2)] : ['John', 'Diana', 'Jose', 'Stacy', 'Mary'];
    let splitNames = [];
    if (vars[0]?.includes(',')) {
      splitNames = vars[0].split(',');
    }
    const names = splitNames.length ? [...splitNames] : [...vars];

    const failures = [];
    const success = [];

    let counter = 0;
}

solution();