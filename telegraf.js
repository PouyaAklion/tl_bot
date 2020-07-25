const { Telegraf } = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const env = require('dotenv').config()


const startUpKeyboard  = Markup.keyboard([
  { text: "فیلتر ها 🚩" },
  { text: " آخرین اطلاعات بازار 📌" },
])

const bot = new Telegraf(process.env.TOKEN)
bot.start((ctx) => ctx.reply('Hello', Extra.markup(startUpKeyboard)))

bot.on('message',(ctx)=>{
  if(ctx.update.message.text === 'فیلتر ها 🚩'){
    console.log('filter pressed');
  }
  
});
bot.launch()