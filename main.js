// main.js
// bot controller
// ===========

const prompt = require('prompt');
const fs = require('fs');
const bot = require('./src/bots/bot.js');
const helper = require('./src/utility/helper.js');
const robot = require('robotjs');
const combatBot = require('./src/bots/combat_bot.js');

const fsPromises = fs.promises;

async function readAvailableBots(path) {
    const botFolder = path;
    let files = await fsPromises.readdir(botFolder);

    let tmpIndex = files.indexOf("template");
    files.splice(tmpIndex,1);


    return files;
}

function displayCategories(categories) {
    console.log("========= Bots menu =========");
    console.log("INFO: Write the full name of the category\n");

    Object.entries(categories).forEach(([key, value]) => {
        console.log("- " + key)
     });
}

function displayMenu(bots) {
    console.log("========= Bots menu =========")

    for(let i = 0; i < bots.length; i++) {
        console.log((i+1) + ": " + bots[i])
    }
    console.log("0: quit")
}


async function main() {
    let categories = {"other": [], "mining": [], "combat": []}
    const avBots = await readAvailableBots("./misc/")
    
    for (let i = 0; i < avBots.length; i++) {
        switch(avBots[i].split("_").slice(-1)[0].replace(".json","")) {
            case "bot":
                categories.other.push(avBots[i])
                break;
            case "mining":
                categories.mining.push(avBots[i])
                break;
            case "combat":
                categories.combat.push(avBots[i])
            default:
                console.log("No bots were found!")
        }
    }

    // Category
    displayCategories(categories);
    const categoryInput = await prompt.get(['category']);
    console.log(categoryInput.category);

    // Bots
    switch(categoryInput.category) {
        case "other":
            displayMenu(categories.other)
            break;
        case "mining":
            displayMenu(categories.mining)
            break;
        case "combat":
            displayMenu(categories.combat)
            break;
    }

    const botInput = await prompt.get(['bot'])
    console.log(botInput.bot)
    if(botInput.bot <= avBots.length) {
        bot.startBot(avBots[botInput.bot -1])
    }
}

main()