const mongoose = require('mongoose');
const env = require('dotenv').config()

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.ConnectionStates
module.exports={mongoose};