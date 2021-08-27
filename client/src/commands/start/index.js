const Markup = require('telegraf/markup')
const operationsServices = require('../../services/operationsServices')

const compileTpl = require('../../templates/compileTpl')

const keyboard = Markup.keyboard([
    [
      Markup.button('Report'),
    ],
    [
      Markup.button('Expense'),
      Markup.button('Invest'),
    ],
    [
      Markup.button('Income'),
      Markup.button('Total'),
    ],
    [
      Markup.button('Settings'),
    ],
]).extra()



module.exports = async (ctx) => {
    const allItems = (await operationsServices.getItems()).data
    const total = (await operationsServices.total()).data
    const headers = ['type', 'currency', 'price', 'tags', 'createdAt']
    const totalHeaders = ['type', 'amount']

    const tplImage = await compileTpl(
      './src/templates/report/index.tpl', 
      {allItems, headers, total, totalHeaders }
    )


    ctx.replyWithPhoto({source: tplImage})
    ctx.reply('welcome', keyboard)
}