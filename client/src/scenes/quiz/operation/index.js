
const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

// store
// import { state, mutations } from './store'

// keyboards
const currencyKeys = require('./keyboards/currency')
const tagsKeys = require('./keyboards/tags')

// services
const operationsServices = require('../../../services/operationsServices')

const saveData = (data = {}, ctx) => {
    const oldData = ctx.wizard.state.operationData
    ctx.wizard.state.operationData = Object.assign(oldData, data)
    const { operationData } = ctx.wizard.state
    return operationData
}


const operationScene = new WizardScene(
  'operation', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    ctx.wizard.state.operationData = {
      currency: '',
      price: 0, 
      tags: []
    };
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
    const {tags} = ctx.wizard.state.operationData
    saveData({tags: [...tags, newTagName]}, ctx)
  },
)

operationScene.hears('finish', async ctx => {
  const operation = saveData({}, ctx)
  try {
    await operationsServices.post({
      ...operation,
      type: 'Expense'
    })
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