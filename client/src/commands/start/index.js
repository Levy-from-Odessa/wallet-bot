const Markup = require('telegraf/markup')
const walletServices = require('../../services/walletServices')

// test
const nodeHtmlToImage = require('node-html-to-image')
const swig = require('swig')

const keyboard = Markup.keyboard(
    [Markup.button('expense')]
).extra()


// render template with props
function compileTpl(file, params) { // actions?, filesType?
  const compiled = swig.compileFile(file)
  return compiled(params)
}  


module.exports = async (ctx) => {
    const {data} = await walletServices.getItems()
    
    const tpl = compileTpl('./src/templates/report.html', {data, headers: [1,2,3]})
    const image = await nodeHtmlToImage({
        html: tpl
    })


    ctx.replyWithPhoto({source:image})
    await ctx.reply('welcome', keyboard)
}