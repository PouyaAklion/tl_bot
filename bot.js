const TelegramBot = require('node-telegram-bot-api');
const express = require('express')
const bodyParser = require('body-parser');

const { User } = require('./User');
const env = require('dotenv').config()

const token = process.env.TELEGRAM_TOKEN;
let bot;

const commands = {
  btnFilters: 'فیلتر ها',
  btnPremium: 'افزایش اعتبار',
  btnSharePhone: 'ارسال شماره موبایل',
  btnShareLocation: 'ارسال موقعیت',
}
const keyboard = {
  reply_markup: JSON.stringify({
    keyboard: [[commands.btnFilters]],
    resize_keyboard: true
  })
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function registerUser(user) {
  let newUser = new User({
    id: user.id,
    username: user.username || null,
    fullname: user.first_name || null + user.last_name || null
  })
  await newUser.save().catch(e => {
    return false
  });
  return true;
}
async function checkUser(id) {
  return await User.findOne({ id }) || false;

}

function listenWebhooks() {
  const app = express();
  app.use(bodyParser.json());
  app.listen(process.env.PORT);
  app.post('/' + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
}




if (process.env.NODE_ENV === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.onText(/\/start/, async (msg, match) => {
  let user = await checkUser(msg.from.id)
  if (!user) {
    await registerUser(msg.from)
    bot.sendMessage(msg.chat.id, 'welcome', keyboard)
  } else if (user.requestCount >= 10) {
    bot.sendMessage(msg.chat.id, 'حساب رایگان شما تمام شده است');
  } else {
    bot.sendMessage(msg.chat.id, 'welcome again', keyboard)
    user.requestCount++;
    await user.save();

  }

});


bot.on('message', (msg) => {
  if (msg.text === commands.btnFilters) {
    console.log(msg)
  }
});

listenWebhooks();