const validateUser = require('./validate-user');
    /*
    INSTRUCTIONS

    1. create an array that contains 5 names, include 1 or more of the allowed usernames located in validate-user.js
    2. iterate the array, keep an eye on performance, and validate every username with the function exported in validate-user.js
    3. process and format every result, so that the program console.log the success results in a group, and the failure results in a group

    Example:

    Success

    id:1
    name: John

    id:2
    name: Mary

    Failure

    User Michael not allowed
    User Benjamin not allowed

    4. if you want to challenge yourself, add the needed logic so the program can read the array of names from the terminal
    ** check about node.js process.argv **

    Example:

    node solution.js name1,name2,name3, or
    node solution.js name1 name2 name3

    5. another challenge is: after you solve the challenge using callback style, in another file promisify the callback and solve it again
    ** give a look to node.js util.promisify, avoid to alter the validate-user.file **
    
    */
       
    
    function solution(callback) {
        const defaultNames = ['John', 'Mary', 'Richard', 'alex', 'Michael', 'Benjamin'];
        const additionalNames = process.argv.slice(2); // get the names from the command line
        const names = additionalNames.length > 0 ? additionalNames : defaultNames;

        const success = [];
        const failure = [];
        
        names.forEach((name) => {
            const formatName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            validateUser(formatName, (err, user) => {
                if (err) {
                    failure.push(err.message);
                } else {
                    success.push(user);
                }
        
                if (success.length + failure.length === names.length) {
                    callback(success, failure);
                }
            });
        });
    };

    function processResults(successArray, failureArray) {
        console.log('*************\nSuccess');
        successArray.forEach((user) => {
            console.log(`id: ${user.id}\nname: ${user.name}\n`);
        });

        console.log('************\n' +
                    '---------\nFailure');
        failureArray.forEach((err) => {
            console.log(err);
        });
    }

    solution(processResults);
