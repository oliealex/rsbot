const robot = require('robotjs')
const helper = require('../utility/helper.js')


function findTarget() {
    let itemData = helper.readColorData()
    let startX = 0
    let startY = 25
    let areaX = 100
    let areaY = 100
    let found = false
    while(!found) {
        colorFound = helper.findColor(startX,startY,areaX,areaY, itemData.grotworm.colors)

        console.log("StartX: " + startX + ", StartY: " + startY)
        if(colorFound.state) {
            found = true
            console.log("Color Found?: " + colorFound.state)
            robot.moveMouse(colorFound.random_x, colorFound.random_y)
            robot.mouseClick()
        } else {
            if (startX + 100 >= 1920) {
                startX = 263
                startY += 100
            } else if (startY > 1080) {
                found = true
            } else {
                startX += 100
            }
        }
    }
}

function startAttacking() {
    findTarget()
}

module.exports = {
    startAttacking
}