const Markup = require('telegraf/markup')

const keyboard = Markup.keyboard(
    [Markup.button('expense')]
).extra()

module.exports = async (ctx) => {
    await ctx.reply('welcome', keyboard)
}