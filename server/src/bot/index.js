
const TelegramBot = require('node-telegram-bot-api');
const config = require('../../config/index');
const OperationsControllers = require('../controllers/OperationsControllers');

// commands
const startCommand = require('./commands/start')

const bot = new TelegramBot(config.bot.token, {polling: true});

bot.on('message', (msg) =>{
  const {chat, text, from} = msg
  if (text === '/start') {
    startCommand(msg, bot)
  }
})

bot.on(('web_app_data'), async msg => {
  const {chat, text, from, web_app_data} = msg
  console.log(web_app_data);


  bot.sendMessage(
    chat.id,
    'good'
  )
})