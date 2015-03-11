var async = require('async');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/stack_store').connection;

require('./server/db/models/review.js');
require('./server/db/models/address.js');
require('./server/db/models/creditCard.js');
require('./server/db/models/item.js');
require('./server/db/models/cart.js');
require('./server/db/models/user.js');

var Review = mongoose.model('Review');

module.exports = function()