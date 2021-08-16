
const Markup = require('telegraf/markup')
const currencyKeys = Markup.keyboard(
    [
        [
            Markup.button('USD'),
            Markup.button('UAH')
        ],
        [
            Markup.button('EUR'),
            Markup.button('BTC')
        ],
    ]
).extra()

module.exports = currencyKeys