
const Scene = require('telegraf/scenes/base')
const WizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')


// keyboards
const currencyKeys = require('./keyboards/currency')
const tagsKeys = require('./keyboards/tags')
// services
const walletServices = require('../../services/walletServices')

const saveData = (data = {}, ctx) => {
    const oldData = ctx.wizard.state.operationData
    ctx.wizard.state.operationData = Object.assign(oldData, data)
    const { operationData } = ctx.wizard.state
    return operationData
}


const operationScene = new WizardScene(
  'operation', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    ctx.wizard.state.operationData = {currency: '', price: 0, tagNames: []};
    console.log(currencyKeys());
    ctx.reply('In which currency did you spend money?', currencyKeys());
    
    return ctx.wizard.next();
  },
  async (ctx) => {
    const currency = ctx.message.text
    ctx.reply('How much did you spend?', Markup.removeKeyboard().extra() )
    saveData({currency}, ctx)
    return ctx.wizard.next();
  },
  async (ctx) => {
    const price = ctx.message.text
    saveData({price}, ctx)
    console.log(await tagsKeys());
    ctx.reply('What did you buy?',await tagsKeys());
    return ctx.wizard.next();
  },
  async (ctx) => {
    const newTagName = ctx.message.text
    const {tagNames} = ctx.wizard.state.operationData
    saveData({tagNames: [...tagNames, newTagName]}, ctx)
  },
)

operationScene.hears('finish', async ctx => {
  const operation = saveData({}, ctx)
  try {
    await walletServices.post(operation)
  } catch (error) {
    console.log(error);
  }

  ctx.deleteMessage()
  ctx.reply(operation, Markup.removeKeyboard().extra() )
  return ctx.scene.leave()
})


operationScene.leave(ctx => {
  ctx.reply('bye bye')
})


module.exports = operationScene