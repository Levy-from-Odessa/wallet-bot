require('dotenv').config();
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)
const session = require('telegraf/session')
const Stage = require('telegraf/stage')

const operationScene = require('./sessions/operation')

const stage = new Stage([operationScene ])
bot.use(session())
bot.use(stage.middleware())


const keyboard = Markup.keyboard(
    [Markup.button('expense')]
).extra()


bot.start( async (ctx) => {
    await ctx.reply('123', keyboard)
})

bot.hears('expense',(ctx) =>  {
    ctx.scene.enter('operationScene') 
    ctx.reply('enter to operation room')
})


bot.launch()
