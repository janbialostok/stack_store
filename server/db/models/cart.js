'use strict'
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = require("./address.js");

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var cartSchema = new Schema({
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    status: { type: String, required: true, default: 'Open' },
    billingAddress: [Address.schema],
    shippingAddress: [Address.schema]
});

module.exports = mongoose.model('Cart', cartSchema);