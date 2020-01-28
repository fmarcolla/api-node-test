const mongoose = require('mongoose');

const bd = 'api_rest';

mongoose.connect('mongodb://localhost/' + bd, { useMongoClient : true });
mongoose.Promise = global.Promise;

module.exports = mongoose;