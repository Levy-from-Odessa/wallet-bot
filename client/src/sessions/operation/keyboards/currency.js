
const Markup = require('telegraf/markup')
const currencyKeys = Markup.keyboard(
    [
        [
            Markup.button('USD'),
            Markup.button('UAH')
        ],
        [
            Markup.button('USD'),
            Markup.button('UAH')
        ],
        [
            Markup.button('USD'),
            Markup.button('UAH')
        ],
        [
            Markup.button('USD'),
            Markup.button('UAH'),
            Markup.button('UAH')
        ],
        [
            Markup.button('USD'),
        ],
    ]
).extra()

module.exports = currencyKeys