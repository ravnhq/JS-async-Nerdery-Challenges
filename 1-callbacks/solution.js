const validate = require('./validate-user.js')
const { argv } = require('node:process')
const util = require('util')

const promisiedValidate = util.promisify(validate)

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

function solution() {
    const inputUsers = argv.slice(2)
    let testUsers = ["John", "Mary", "Richard", "Javier", "Fernando"]
    const succesUsers = []
    const errorUsers = []

    if(inputUsers.length === 1 && inputUsers[0].includes(',')){
        testUsers = inputUsers[0].split(',')
    }else if(inputUsers.length > 1){
        testUsers = inputUsers
    }

    const printResults = () => {
        console.log('\nSuccess')
        console.group()
        succesUsers.forEach(user => {
            console.log(`\nid: ${user.id}\nname: ${user.name}`)
        })
        console.groupEnd()

        console.log('\nFailure')
        console.group()
        errorUsers.forEach(error => {
            console.log(error)
        })
        console.groupEnd()
    }

    for (const user of testUsers) {
        const a = promisiedValidate(user).then((data)=>{
            succesUsers.push(data)
        }).catch((error)=>{
            errorUsers.push(error.message)
        }).finally(()=>{
            if(succesUsers.length + errorUsers.length === testUsers.length){
                printResults()
            }
        })
    }
}

solution()


