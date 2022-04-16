const validateUser = require('./validate-user');

function solution() {
    let users = [];

    const validationResult = {
        success: [],
        failure: [],
    }

    if (process.argv.slice(2).length > 0) {
        users = process.argv.slice(2);
        for (const user of users) {
            validateUser(user, formatValidation);
        }
    } else {
        console.log('Please enter at least one username to validate');
    }

    function formatValidation(err, value){
        if (err) {
            validationResult.failure.push(err.message);
        } else {
            validationResult.success.push(`id: ${value.id} name: ${value.name}`);
        }
        if (validationResult.success.length + validationResult.failure.length === users.length) {
            console.log(validationResult)
        }
    }
}

solution()
