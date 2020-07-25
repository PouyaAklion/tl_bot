const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://192.168.128.1:27017/tl_bot', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.ConnectionStates
module.exports={mongoose};