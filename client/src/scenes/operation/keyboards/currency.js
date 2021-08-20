
const Markup = require('telegraf/markup')
const currencyKeys = () => {
    const USD = Markup.button('USD')
    return Markup.keyboard(
        [
            [
                USD,
                Markup.button('UAH')
            ],
            [
                Markup.button('EUR'),
                Markup.button('BTC')
            ],
        ]
    ).extra()
}

module.exports = currencyKeys