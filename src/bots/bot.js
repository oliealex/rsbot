const robot = require('robotjs');
const helper = require('../utility/helper.js')


function parseMovement(data) {
    
    for(let i = 0; i < data.length; i++) {
        console.log("Step " + i + ": " + data[i])
        helper.characterMovement( data[i].x, data[i].y,data[i].button,parseFloat(data[i].waitTime),"","",null)
    }
}


function startBot(movementFile) {
    helper.openRS()

    let movement = helper.readCharacterMovement(movementFile)

    console.log(movement)
    while(true){
        parseMovement(movement.mouseMovements)
    }
}

module.exports = {
    startBot
  };