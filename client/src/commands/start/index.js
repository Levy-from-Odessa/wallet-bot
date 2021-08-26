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
    ]
]).extra()



module.exports = async (ctx) => {
    const {data} = await operationsServices.getItems()
    const headers = ['type', 'currency', 'price', 'tags', 'createdAt']
    
    const tplImage = await compileTpl(
      './src/templates/report/index.tpl', 
      {data, headers }
    )


    ctx.replyWithPhoto({source: tplImage})
    await ctx.reply('welcome', keyboard)
}