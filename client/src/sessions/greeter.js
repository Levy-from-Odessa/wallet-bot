
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')

// Handler factoriess
const { enter, leave } = Stage
// Greeter scene
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('Hi'))
greeterScene.leave((ctx) => ctx.reply('Bye'))
greeterScene.hears('hi', enter('greeter'))
greeterScene.on('message', (ctx) => ctx.replyWithMarkdown('Send `hi`'))

module.exports = greeterScene