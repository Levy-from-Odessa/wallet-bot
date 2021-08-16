
const WizardScene = require('telegraf/scenes/wizard')
const Stage = require('telegraf/stage')

// Handler factoriess
const { enter, leave } = Stage

const walletServices = require('../../services/walletServices')
const tagsServices = require('../../services/tagsServices')

const currencyKeys = require('./keyboards/currency')
const tagsKeys = require('./keyboards/tags')

const saveData = (data, ctx) => {
    const oldData = ctx.wizard.state.operationData
    ctx.wizard.state.operationData = Object.assign(oldData, data)
    const { operationData } = ctx.wizard.state
    return operationData
}



const operationScene = new WizardScene(
  'operationScene', // first argument is Scene_ID, same as for BaseScene
  async (ctx) => {
    ctx.wizard.state.operationData = {currency: '', amount: 0, tag: ''};
    ctx.reply('In which currency did you spend money?', currencyKeys);
    return ctx.wizard.next();
  },
  (ctx) => {
    const currency = ctx.message.text
     saveData({currency}, ctx)
    ctx.reply('How much did you spend?');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const tags = (await tagsServices.getItems()).data
    console.log(tags);

    const amount = ctx.message.text
    saveData({amount}, ctx)
    ctx.reply('What did you buy?', tagsKeys(tags));
    return ctx.wizard.next();
  },
  async (ctx) => {
    const tag = ctx.message.text
    const operation = await saveData({tag}, ctx)
    ctx.reply(operation)
    const newOperation = await walletServices.post(operation)
    ctx.reply(newOperation)
    return ctx.scene.leave()
  },
);

operationScene.command('leave' , (ctx) =>  ctx.reply('leave'))

operationScene.leave((ctx) => ctx.reply('Bye'))


module.exports = operationScene