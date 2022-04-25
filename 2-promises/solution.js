/*
INSTRUCTIONS

1. using promise API, i.e. only .then .catch and .finally methods consume the methods in firstnames.js and lastnames.js
2. lastnames.js method expects a positive integer id, it returns a lastname, if the id is multiple of 5 it returns a nonexistent lastname
3. firstnames.js method expects a lastname generated by the method above, it returns a name
4. methods should be consumed sequentially, i.e. lastnames method first, and its results will serve as argument for firstnames method
5. implement a randomizing logic that provides you a value to be used as id for lastnames method,
this value type must be a positive integer between 0-100, or something that is not a positive integer
The point here is having correct and incorrect values to generate successful and failing promises results from lastnames method

Example:
const id = yourRandomMethod() //first run
 -- id gets a value of undefined, or you can get a null, boolean, string, whatever different to a positive integer

const id = yourRandomMethod() //second run
 -- id gets a value of 31

const id = yourRandomMethod() //third run
-- id gets a value of 10

6. use promise chaining accordingly to manage sequential process and error handling
7. log the resultant full name, or the error at the final
*/
const firstnames = require('./firstnames')
const lastnames = require('./lastnames')

const MIN = 0;
const MAX = 100;

const random = (min, max) =>{
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function solution() {

    const index = random(MIN,MAX)
    lastnames(index)
	.then( (firstNameResponse)=>{
        firstnames(firstNameResponse)
            .then((lastNameResponse)=>{
                console.log(lastNameResponse);
            }) 
            .catch((error)=>{       
                console.log(error.message);
           }) 
    })
    .catch((error)=>{       
        console.log(error.message);
   })  
}

solution()
