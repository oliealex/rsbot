// litium_mining.js
// 
// Used to mine litium and store in bank.
//
// ================

const robot = require('robotjs');
const fs = require('fs');
const helper = require('../utility/helper.js')

// Game functions

function checkBagSpace() {
    /*
        Checks if bagspace has ores to fill the orebox
    */

    let x = 1872;
    let y = 858;
    let width = 31;
    let height = 28;

    let litiumColors = ["c4c310","d7d610","b1b010","d6d410","828100"]

    let colorFound = helper.findColor(x,y,width,height,litiumColors).state;

    return colorFound
}

function fillOreBox() {
    let bagSpace = checkBagSpace()
    
    if (bagSpace) {
        robot.moveMouse(1743, 654) // Ore box
        robot.mouseClick("right")
        helper.sleep(1)
        robot.moveMouse(1690, 676) // Fill box
        robot.mouseClick()
        helper.sleep(1)
        

        bagSpace = checkBagSpace()

        if(bagSpace) {
            return "bank"
        }

        return true
    }
    helper.sleep(1)
    return false
}

function mineLitium() {
    let oreBox = fillOreBox()
    let litiumOreCoordinates = findOre(930,401,213,318)

    while(!oreBox || oreBox != "bank") {
        robot.moveMouse((litiumOreCoordinates[0]+55),litiumOreCoordinates[1]);
        robot.mouseClick()
        helper.sleep(17)

        oreBox = fillOreBox()
        console.debug("fillorebox: " + oreBox)
    }

    return false
}

function findBank() {
    let x = 458
    let y = 562
    let width = 61
    let height = 47
    
    let colors = ["fefefd","f0ebe3","fefefe","fdfcf6","f8f3ea"]

    let colorFound = helper.findColor(x,y,width,height,colors)


    if (colorFound.state) {
        return [colorFound.random_x + x, colorFound.random_y + y]
    } else {
        console.error("Bank not found")
    }

    throw new Error('Program terminated')
}

function bankOre(testing) {
    let x = 1112;
    let y = 326;
    let width = 176;
    let height = 196;

    let litiumColors = ["cdcc10","bebd10","c3c210","bdbc10","d9d710","c9c810", "a3a210","d1cf10","afad10","d9d810"]
    let colorFound = helper.findColor(x,y,width,height,litiumColors)
    console.log("BANKING STATE: " + colorFound.state)
    let screen_x = colorFound.random_x + x;
    let screen_y = colorFound.random_y + y;

    return [screen_x,screen_y]
}

function bankItems() {
    console.log("Banking items...")

    // x, y, button, seconds, key, toggle, callback

    for (let i = 0; i < bankActions.length; i++) {
        let movement = helper.characterMovement(bankActions[i].x,bankActions[i].y,bankActions[i].button,bankActions[i].seconds,bankActions[i].key,bankActions[i].toggle,bankActions[i].callback)
        console.log("Movement: " + movement)
        if (movement != null && movement.length == 2 && bankActions[i+1].previous) {
            bankActions[i+1].x = bankActions[i+1].x + movement[0]
            bankActions[i+1].y = bankActions[i+1].y + movement[1]
        }
        
    }

}

function findOre(xInput,yInput,widthInput,heightInput) {
    let x,y,width,height
 
    if (xInput != null) {
        x = xInput
        y = yInput
        width = widthInput
        height = heightInput
    } else {
        x = 710;
        y = 470;
        width = 284;
        height = 448;
    }

    let litiumColors = ["f9eb05","d5c900","d7d610","d7cc00","f8eb05","8d5728", "825129","9e632f","805c40","87522e","885528"]
    let colorFound = helper.findColor(x,y,width,height,litiumColors)
    console.log("ORE FOUND STATE: " + colorFound.state)
    let screen_x = colorFound.random_x + x - 55;
    let screen_y = colorFound.random_y + y;

    return [screen_x, screen_y]
}

function returnToMining() {
    console.log("Returning to mining spot...")

    for (let i = 0; i < miningActions.length; i++) {
        console.log(miningActions[i])
        helper.characterMovement(miningActions[i].x, miningActions[i].y, miningActions[i].button, miningActions[i].seconds, 
            miningActions[i].key, miningActions[i].toggle, miningActions[i].callback)
    }
 
}

function mine() {
    rotateMap(1430,57);

    while(mineLitium())
    {
        console.debug("Mining...")
    }
    console.debug("Stopped mining...")
}

function parseMovement(data) {
    for(let i = 0; i < data.length; i++) {
        console.log("Current movement: " + data[i])
        helper.characterMovement( data[i].x, data[i].y,data[i].button,parseFloat(data[i].waitTime),"","",null)
    }
}

function startMiningLitium(arg) {
    helper.openRS()

    /*let litiumColors = ["d7d610","f9eb05","d5c900","d7cc00","f8eb05","8d5728", "825129","9e632f","805c40","87522e","885528"]
    let colorFound = helper.findColor(930,401,213,318,litiumColors)
    
    if (colorFound.state) {
        console.log("Found litium mine")
        mine()
    }

    while(true) {
        helper.rotateMap()
        bankItems()
        returnToMining()
        mine()
    }*/

    let movement = helper.readCharacterMovement("litium_mining.json")

    console.log(movement)
    while(true){
        parseMovement(movement.mouseMovements)
    }
}

module.exports = {
    startMiningLitium
  };