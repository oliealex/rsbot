// main.js
// bot controller
// ===========

const prompt = require('prompt')
const botter = require('./src/bots/bot.js')


let schema = {
    properties: {
        bot: {
            pattern: /^[a-zA-Z\s\-]+$/,
            message: 'Must choose a valid bot',
            required: true
        },
    }
};


const bots = [
    {"name": "Litium bot", "description": "Farming gold by mining and banking litium ores", "location": "Dwarven mines"},
    {"name": "Crafting gems bot", "description": "Farming gold by mining and banking litium ores", "location": "Dwarven mines"},
    {"name": "smelting steel", "description": "Farming gold by mining and banking litium ores", "location": "Dwarven mines"}
]

function displayMenu() {
    console.log("========= Bots menu =========")

    for(let i = 0; i < bots.length; i++) {
        console.log((i+1) + ": " + bots[i].name)
    }
    console.log("0: quit")
}

async function menu() {

}

async function main() {
    displayMenu()
    let {bot} = await prompt.get(["bot"])
    
    switch(bot) {
        case "1":
            console.log("Starting litium bot")
            litiumBot.startMiningLitium()
            break;
        case "2":
            console.log("Starting crafting bot")
            botter.startBot()
            break;
        case "3":
            console.log("Starting smelting bot")
            botter.startBot("smelting_cannonballs.json")
        case "0":
            console.log("Exiting...")
            break;
        default:
            console.log("TEST")
            break;
    }
    
}

main()