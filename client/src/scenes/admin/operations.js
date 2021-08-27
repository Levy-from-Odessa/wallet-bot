
const BaseScene = require('telegraf/scenes/base')

const markup = require('telegraf/markup')

module.exports = operationTable = new BaseScene('operationTable')

operationTable.enter(ctx => {
	ctx.reply('table of operations')

	 var userName = ctx.from.first_name;
  const helloText = '<i>Hello</i>, ' + userName + '!';

	ctx.replyWithHTML(helloText);

 


})


