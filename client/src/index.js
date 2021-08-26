require('dotenv').config();
const Telegraf = require('telegraf')
const TSL = require('telegraf-session-local')
const session = require('telegraf/session')

const Stage = require('telegraf/stage')


// commands
const startCommand = require('./commands/start')

// scenes
const operationScene = require('./scenes/operation')





const init = (bot, config) => {
    // scenes
    const stage = new Stage([operationScene ])
    // middleaware
    bot.use(session())
    // bot.use(new TSL({database:'data/session.json'}).middleware())
    bot.use(stage.middleware())
    
    
    // commands
    bot.start(startCommand)
    
    
    // handler 
    bot.hears('Expense',(ctx) =>  {
        ctx.scene.enter('operation') 
    })
    
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

