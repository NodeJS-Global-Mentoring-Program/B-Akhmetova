const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (input) => {
    const output = input.split('').reverse().join('');
    console.log(output);
});
