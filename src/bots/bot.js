const robot = require('robotjs');
const helper = require('../utility/helper.js')


function parseMovement(data) {
    
    for(let i = 0; i < data.length; i++) {
        console.log("Step " + i + ": " + JSON.stringify(data[i]))
        helper.characterMovement( data[i].x, data[i].y,data[i].mouseButton,parseFloat(data[i].waitTime),data[i].button,"",null)
    }
}


function startBot(movementFile) {

    let movement = helper.readCharacterMovement(movementFile)

    console.log(movement)
    while(true){
        parseMovement(movement.movement[0])
    }
}

module.exports = {
    startBot
  };