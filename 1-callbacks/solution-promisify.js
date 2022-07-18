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

    const callback = (error, data) => {
      if(error?.message){
        failures.push(error.message);

      } else if (data){
        success.push(data);
      }

      counter++;
      // log the final result
      if(counter === names.length){

        console.log(`\nArray: ${JSON.stringify(names)}\n`);

        if(success.length > 0){
          console.log("Success\n");
          success.forEach(s => {
            console.log(`id: ${s.id}`);
            console.log(`name: ${s.name}\n`);
          });
        }
    
        if(failures.length > 0){
          console.log("Failure\n");
          failures.forEach(f => console.log(f));
        }

        console.log('');
      }
    }
}

solution();