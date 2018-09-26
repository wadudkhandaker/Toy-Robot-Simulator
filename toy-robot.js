#!/usr/bin/env node
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const recursiveAsyncReadLine = function () {
    rl.question('Enter Command: ', function (answer) {
        console.log(answer);
    });
};

recursiveAsyncReadLine();