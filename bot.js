const Promise = require('bluebird');
const TelegramBot = require('node-telegram-bot-api');
const { User } = require('./User');
const env = require('dotenv').config()

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
const opts = {
  reply_markup: JSON.stringify({
    keyboard: [[{ text: 'share phone number', request_contact: true }, 'B'], ['D'], ['E', { text: 'share location', request_location: true }]],
    resize_keyboard: true
  })
};

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});
bot.onText(/\/start/, async (msg, match) => {

  let user = await User.findOne({ id: msg.from.id })
  if (!user) {
    await registerUser(msg.from)
    bot.sendMessage(msg.chat.id, 'welcome', opts)
  } else if (user.requestCount >= 10) {
    bot.sendMessage(msg.chat.id, 'حساب رایگان شما تمام شده است');
  } else {
    bot.sendMessage(msg.chat.id, 'welcome again', opts)
    user.requestCount++;
    await user.save();

  }

});


bot.on('message', (msg) => {

});

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function registerUser(user) {
  let newUser = new User({
    id: user.id,
    username: user.username || null,
    fullname: user.first_name || null
  })
  await newUser.save().catch(e => {
    return false
  });
  return true;
}