
const Markup = require('telegraf/markup')
const tagsBtns = (tags) => {
    return tags.map((tag, index) => {
        return Markup.button(tag.name)
    })
}

const tagsKeyboard = tags => Markup.keyboard(
    tagsBtns(tags)
).extra()


module.exports = tagsKeyboard
        