require('dotenv').config();
const Telegraf = require('telegraf')
const session = require('telegraf/session')

const Stage = require('telegraf/stage')


// commands
const startCommand = require('./commands/start')

// scenes
const operationScene = require('./scenes/quiz/operation')

// tables
const operationTable = require('./scenes/admin/operations')

const init = (bot, config) => {
    // scenes
    const stage = new Stage([operationScene, operationTable ])
    // middleaware
    bot.use(session())
    // bot.use(new TSL({database:'data/session.json'}).middleware())
    bot.use(stage.middleware())
    
    
    // commands
    bot.start(startCommand)
    bot.hears('Report', startCommand)
    
    
    // handler 
    bot.hears('Expense', Stage.enter('operation') )
    bot.hears('Settings', Stage.enter('operationTable') )
    
    return bot
}

const main = async (bot, config) => {
    try {
        const initBot = init(bot, config)
        await initBot.launch()
        console.log("Launched");
    } catch (error) {
        console.log(error);
        
    }
}
// main
const bot = new Telegraf(process.env.BOT_TOKEN)
main(bot, process.env)

