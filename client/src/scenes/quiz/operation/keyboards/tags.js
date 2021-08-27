
const Markup = require('telegraf/markup')
const tagsServices = require('../../../../services/tagsServices')


const tagsKeys = async () => {
    const tags = (await tagsServices.getItems()).data
    const finishBtn = [Markup.button('finish')]
    console.log(tags);
    const testTwice = tags.reduce((result, curr) => {
        const currBtn = Markup.button(curr.name)
        const resLength = result.length
        const lastItem = result[resLength - 1]

        if (resLength % 2 === 0 && resLength !==0 && lastItem.length === 1) {
            console.log(lastItem, 'lastItem');
            const twiceItem = [...lastItem, currBtn]
            const newRes = result.splice(resLength - 1, 1)

            // console.log(newRes, 'newRes');
            return [...result, twiceItem]
        } else {
            console.log(result, 'result');
            return [ ...result, [currBtn]]
        }
    }, [])

    console.log(testTwice, 'twice');
    return Markup.keyboard([
           finishBtn,
            ...testTwice
    ]).extra()
}


module.exports = tagsKeys
        