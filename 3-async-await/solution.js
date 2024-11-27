const pricesFunction = require('./prices')
const productsFunction = require('./products')
const {setTimeout} = require('timers/promises')
/*
INSTRUCTIONS

1. using async/await API consume products and prices methods
2. don't use .then(), .catch() or .finally() here
3. both, products and prices methods expect a positive integer id
4. use Promise.all() and Promise.allSettled() to consume both methods in parallel
5. to generate the id do the following: invoke Date.now(), and take the last two digits, this will be your id
6. log the results with console.log(), the format is up to you, but it must include id, product and price

Example:
{
 id:100,
 product:'paper',
 price:1
}

7. both methods include some conditions to fail, at the end you should console.log() the errors, the format is up to you
8. add any needed adjustment to solution() function
9. as extra challenge: add Promise.race() and Promise.any(), and try to get the idea of what happens
*/

class Product {
    constructor(id, name, price){
        this.id = id
        this.name = name
        this.price = price
    }
    print(){
        console.log(`${'*'.repeat(30)}`)
        console.log(`ID: ${this.id} | product: ${this.name} | price: ${this.price.toFixed(2)} $`)
        console.log(`${'*'.repeat(30)}`)
    }
}

class CustomError extends Error{
    constructor(message, origin, id){
        super(message)
        this.origin = origin
        this.id = id
    }
    print(){
        console.error(`${'='.repeat(30)}`)
        console.error(`**ERROR OCCURRED`)
        console.error(`- ID: ${this.id}`)
        console.error(`- Origin: ${this.origin || 'unknown'}`)
        console.error(`- Error Message: ${this.message}`)
        console.error(`${'='.repeat(30)}`)
    }
}

class Result {
    constructor(product, error, timelapse){
        this.product = product
        this.error = error
        this.timelapse = timelapse
    }
    setProduct(product){
        this.product = product
    }
    setError(error){
        this.error = error
    }
    setTimelapse(timelapse){
        this.timelapse = timelapse
    }

    print(){
        console.log(`\nResult in: ${this.timelapse} miliseconds`)
        if(this.error){
            this.error.print()
        }else{
            this.product.print()
        }
    }
}

const generateId = async(delay) => {
    if(delay){
        await setTimeout(delay)
    }
    const currentTime = Date.now()
    return currentTime % 100
}

async function solutionAll(id){
    try {
        const [name, price] = await Promise.all([
            productsFunction(id),
            pricesFunction(id)
        ])
        const product = new Product(id, name, price)
        return product

    } catch (error) {
        throw new CustomError(error.message, null, id)
    }
}

async function solutionAllSettled(id){
    try {
        const [nameResponse, priceResponse] = await Promise.allSettled([
            productsFunction(id),
            pricesFunction(id)
        ])

        if(nameResponse.status === 'rejected'){
            throw new CustomError(nameResponse.reason.message, 'product', id)
        }
        if(priceResponse.status === 'rejected'){
            throw new CustomError(priceResponse.reason.message, 'price', id)
        }

        const {value:name} = nameResponse
        const {value:price} = priceResponse

        return product = new Product(id, name, price)
    } catch (error) {
        throw error
    }
}

async function solution(allId, allSettledId) {
    const promiseAll = solutionAll(allId)
    const promiseAllSettle = solutionAllSettled(allSettledId)
    const raceResult = new Result()
    const anyResult = new Result()
    const results = {raceResult, anyResult}

    let startTimer = Date.now()
    try {
        const raceResponse = await Promise.race([
            promiseAll, promiseAllSettle
        ])
        raceResult.setProduct(raceResponse)
    } catch (error) {
        raceResult.setError(error)
    } finally {
        raceResult.setTimelapse(Date.now()-startTimer)
    }

    startTimer = Date.now()
    try {
        const anyResponse = await Promise.any([
            promiseAll, promiseAllSettle
        ])
        anyResult.setProduct(anyResponse)
    } catch (error) {
        anyResult.setError(error)
    } finally {
        anyResult.setTimelapse(Date.now()-startTimer)
    }

    return results
} 


(
    async function(){
        const generatedAllId = await generateId()
        const generatedAllSettledId = await generateId(100)
        const {raceResult, anyResult} = await solution(generatedAllId, generatedAllSettledId)

        raceResult.print()
        anyResult.print()
    }
)()

