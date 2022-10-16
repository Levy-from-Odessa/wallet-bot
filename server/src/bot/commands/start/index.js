// const operationsServices = require('../../services/operationsServices')
// const compileTpl = require('../../templates/compileTpl')

const keyboard = ([
    [{
      text: ('Report'),
      web_app: {url: 'https://dfa1-178-138-97-25.eu.ngrok.io/'}
    }],
    [{
      text: ('Expense'),
    },{
      text: ('Invest'),
    }],
    [{
      text: ('Income'),
    },{
      text: ('Total'),
    }],
    [{
      text: ('Settings'),
    }],
])



module.exports = async (msg, ctx) => {
  console.log(msg);
  const {chat, text, from} = msg
  
  ctx.sendMessage(
    chat.id,
    'welcome, ' + from.first_name,
    {
      reply_markup: {keyboard}
    } 
    )
}

    // const allItems = (await operationsServices.getItems()).data
    // // const total = (await operationsServices.total()).data
    // const headers = ['type', 'currency', 'price', 'tags', 'createdAt']
    // const totalHeaders = ['type', 'amount']

    // const tplImage = await compileTpl(
    //   './src/templates/report/index.tpl', 
    //   {
    //     allItems, 
    //     headers, 
    //     // total, 
    //     totalHeaders 
    //   }
    // )


    // ctx.replyWithPhoto({source: tplImage})