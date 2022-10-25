require('dotenv').config();

const keyboard = ([
    [{
      text: ('Report'),
    }],
    [{
      text: ('Expense'),
      web_app: {url: process.env.FRONEND_URL+'create?type=expense'}
    },{
      text: ('Invest'),
      web_app: {url: process.env.FRONEND_URL+'create?type=invest'}
    }],
    [{
      text: ('Income'),
      web_app: {url: process.env.FRONEND_URL+'create?type=income'}
    },{
      text: ('Total'),
    }],
    [{
      text: ('Settings'),
    }],
])



module.exports = async (msg, ctx) => {
  const {chat, text, from} = msg
  
  ctx.sendMessage(
    chat.id,
    'welcome, ' + from.first_name,
    {reply_markup: {keyboard}} 
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