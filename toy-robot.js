#!/usr/bin/env node
const readline = require('readline');

let x, y, f;

const FACE = {
    north: 'NORTH',
    east: 'EAST',
    west: 'WEST',
    south: 'SOUTH'
};

let flag = false;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const validCommandMessage = ()=>{
  console.log('Please Enter a valid command');
}
const outOfGrid = (x, y) => {
    return !(x >= 0 && x <= 5) && (y >= 0 && y <= 5);
};

const invalidFace = (f) => {
    return !(f === FACE.north || f === FACE.east || f === FACE.south || f === FACE.west);
};

const isValidCommand = (command) => {
    if (!flag) {
        if (!(command.indexOf('PLACE') > -1))
            console.log('INITIAL PLACE COMMAND NOT FOUND!');
        return command.indexOf('PLACE') > -1;
    }
    return command === 'LEFT' || command === 'RIGHT' || command === 'MOVE' || command === 'REPORT' || (command.indexOf('PLACE') > -1);
};

const placeCommand = (mCommand) => {

    let cCommand = mCommand.split(" ");
    if (cCommand.length === 2) {
        let command = cCommand[1].split(',');
        if (command.length === 3) {
            x = Number(command[0]);
            y = Number(command[1]);
            f = command[2];
            if (outOfGrid(x, y)) {
                validCommandMessage();
                flag = false;
                return;
            }
            if (invalidFace(f)) {
                flag = false;
                validCommandMessage();
                return;
            }

            flag = true;
        }
    }
    else {
        flag = false;
        validCommandMessage();
    }
};

const leftCommand = () => {
    switch (f){
        case FACE.north:
            f = FACE.west;
            break;
        case FACE.west:
            f = FACE.south;
            break;
        case FACE.south:
            f = FACE.east;
            break;
        case FACE.east:
            f = FACE.north;
            break;
        default:
            break;
    }
};

const rightCommand = () => {
    switch (f){
        case FACE.north:
            f = FACE.east;
            break;
        case FACE.west:
            f = FACE.north;
            break;
        case FACE.south:
            f = FACE.west;
            break;
        case FACE.east:
            f = FACE.south;
            break;
        default:
            break;
    }
};

const fallingErrorMessage = () => {
    console.log('Falling out of Grid! Can\'t Move');
};

const moveCommand = () => {

    switch (f) {

        case FACE.east:
            if (outOfGrid(x + 1, y)) {
                fallingErrorMessage();
            } else {
                x++;
            }
            break;

        case  FACE.north:
            if (outOfGrid(x, y + 1)) {
                fallingErrorMessage();
            } else {
                y++;
            }
            break;

        case FACE.west:
            if (outOfGrid(x - 1, y)) {
                fallingErrorMessage();
            } else {
                x--;
            }
            break;

        case FACE.south:
            if (outOfGrid(x, y - 1)) {
                fallingErrorMessage();
            } else {
                y--;
            }
            break;

        default:
            break;
    }

};

const reportCommand = () => {
    console.log(x+','+y+','+f);
};

const commandExecutioner = (mCommand) => {

    if (mCommand.indexOf('PLACE') > -1) {
        placeCommand(mCommand);
        return;
    }

    switch (mCommand) {
        case 'LEFT':
            leftCommand();
            break;
        case 'RIGHT':
            rightCommand();
            break;
        case 'MOVE':
            moveCommand();
            break;
        case 'REPORT':
            reportCommand();
            break;
        default:
            break;
    }
};

const recursiveAsyncReadLine = function () {
    rl.question('Enter Command: ', function (answer) {
        if (isValidCommand(answer)) {
            commandExecutioner(answer);
        } else {
           validCommandMessage();
        }
        if (answer === 'REPORT' && flag) {
            process.exit();
        } else {
            recursiveAsyncReadLine();
        }
    });
};

recursiveAsyncReadLine();
