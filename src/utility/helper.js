// helper.js
// ========
const robot = require('robotjs');
const fs = require('fs');

// Utility functions

function sleep(seconds) {
    let ms = seconds * 1000
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(start, end) {
    return Math.floor(Math.random() * end) + start;
}

function findColor(x,y,width,height, colors) {
    let img = robot.screen.capture(x, y, width, height);
    
    for (let i = 0; i < width; i++) {
        for(let j = 0; j < height; j++) {
            let color = img.colorAt(i, j)
            if (colors.includes(color))
                return {"random_x": i,"random_y": j,"state": true};
        }
    }
    
    return {"random_x": 0, "random_y": 0,"state": false}
}


function readCharacterMovement(bot) {
    let path = "./misc/" + bot 
    let data = JSON.parse(fs.readFileSync(path, 'utf-8'))
    
    return data
} 

// Generic game functions

function rotateMap() {
    sleep(1)
    let x = 1414;
    let y = 41;
    let width = 442;
    let height = 33;

    let mapColors = ["4a4943", "44423e","3f3d39","3b3935"]

    let colorFound = findColor(x,y,width,height,mapColors);
    screen_x = colorFound.random_x + x
    screen_y = colorFound.random_y + y
    robot.moveMouse(screen_x, screen_y)
    robot.mouseClick()

    robot.keyToggle("up","down");
    sleep(1);
    robot.keyToggle("up", "up");
}

function characterMovement(x, y, button, seconds, key, toggle, gameCallback) {

    sleep(seconds)

    if (key.length > 0) {
        if(toggle.length > 0) {
            robot.keyToggle(key, toggle);
        } else {
            robot.keyTap(key)
        }
        
    }
    else if (button.length === 0 && gameCallback == null) {
        console.log("CH: " + 1)
        robot.moveMouse(x, y)
        robot.mouseClick()
    } else if (button.length > 0 && gameCallback == null) {
        console.log("CH: " + 2)
        robot.moveMouse(x, y)
        robot.mouseClick(button)
    } else if (button.length === 0) {
        console.log("CH: " + 3)
        let cb_xy = gameCallback()
        robot.moveMouse(cb_xy[0] + x , cb_xy[1] + y)
        robot.mouseClick()
        return cb_xy
    } else {
        console.log("CH: " + 4)
        let cb_xy = gameCallback()
        robot.moveMouse(cb_xy[0] + x, cb_xy[1] + y)
        robot.mouseClick(button)
        return cb_xy
    }
     
}

function openRS() {
    let x = 0
    let y = 1033
    let width = 1282
    let height = 46

    let colors = ["0f1a24", "414648"]
    
    let colorFound = findColor(x,y,width,height,colors)
    
    let screen_x = colorFound.random_x + x
    let screen_y = colorFound.random_y + y
    console.log("FOUND RS: " + colorFound.state)
    
    robot.moveMouse(screen_x, screen_y)
    robot.mouseClick()
}

function openTeleportButton() {
    let x = 1380
    let y = 138
    let width = 465
    let height = 283

    let colors = ["4f355f", "452a4f"]
    
    let colorFound = findColor(x,y,width,height,colors)
    
    let screen_x = colorFound.random_x + x
    let screen_y = colorFound.random_y + y
    console.log("FOUND Teleport: " + colorFound.state)
    
    robot.moveMouse(screen_x, screen_y)
    robot.mouseClick()
}

module.exports = {
    sleep,
    getRandomInt,
    findColor,
    characterMovement,
    openRS,
    openTeleportButton,
    readCharacterMovement,
    rotateMap
  };