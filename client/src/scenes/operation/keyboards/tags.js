
const Markup = require('telegraf/markup')
const tagsServices = require('../../../services/tagsServices')


const tagsBtns = async() => {
    const tags = (await tagsServices.getItems()).data
    const finishBtn = Markup.button('finish')
    const testTwice = tags.reduce((result, curr) => {
        const currBtn = Markup.button(curr.name)
        const resCopy = Object.assign([], result)
        const resLength = result.length
        if (resLength > 0 && resLength % 2 === 1) {

            twiceItem = [resCopy[resLength - 1], currBtn]
            return [...resCopy, twiceItem]
        } else {
            return [ ...resCopy, currBtn]
        }


    }, [])

    console.log(testTwice, 'twice');
    return [
        finishBtn,
        // ...tags.map((tag, index) => {
        //     return Markup.button(tag.name)
        // }) 
        ...testTwice
    ]
}

const tagsKeyboard = async() => {
    return Markup.keyboard(
        await tagsBtns()
    ).extra()
}

module.exports = tagsKeyboard
        