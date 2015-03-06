'use strict';
var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    stateProv: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
});

mongoose.model('Address', addressSchema);

//module.exports = mongoose.model('Address', addressSchema);
