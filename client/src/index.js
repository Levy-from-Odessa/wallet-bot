require('dotenv').config();
const Telegraf = require('telegraf')
const TSL = require('telegraf-session-local')
const session = require('telegraf/session')
const WizardScene = require('telegraf/scenes/wizard');

const Stage = require('telegraf/stage')


// commands
const startCommand = require('./commands/start')
// const helpCommand = require('./commands/help')
// scenes
const operationScene = require('./scenes/operation')

// services
// const translateService = require('./services/translateService')




const init = async (bot, config) => {
    // scenes
    const stage = new Stage([operationScene ])
    // middleaware
    bot.use(session())
    // bot.use(new TSL({database:'data/session.json'}).middleware())
    bot.use(stage.middleware())
    
    
    // commands
    bot.start(startCommand)
    // bot.help(helpCommand)
    // bot.command('from',ctx => ctx.scene.enter('from'))
    // bot.command('to',ctx => ctx.scene.enter('to'))
    // bot.command('lang', ctx => ctx.reply(`from ${ctx.session.from} to ${ctx.session.to}`))
    
    
    // handler 
    bot.hears('expense',(ctx) =>  {
        ctx.scene.enter('operation') 
    })
    // bot.on('message', async ctx => )
    
    return bot
}

const main = async (bot, config) => {
    try {
        const initBot = await init(bot, config)
        await initBot.launch()
        console.log("Launched");
    } catch (error) {
        console.log(error);
        
    }
}
// main
const bot = new Telegraf(process.env.BOT_TOKEN)
main(bot, process.env)

