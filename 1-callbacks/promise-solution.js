const validate = require('./promise-validate-user');

function solution() {
    const users = ['Charly', 'Michelle', 'John', 'Richard', 'Marcus'];
    const promises = [];
    const validationResult = {
        success: [],
        failure: [],
    }

    for (const user of users){
        promises.push(validate(user))
    }

    Promise.allSettled(promises)
        .then((values) => {
            let results = values;
            results.map((result) => {
                if (result.status === 'fulfilled') {
                    validationResult.success.push(`id: ${result.value.id} name: ${result.value.name}`);
                } else {
                    validationResult.failure.push(result.reason.message);
                }
            })
            console.log(validationResult);
        }) 
        .catch((err) => errorMsg = err.message);
}

solution()
