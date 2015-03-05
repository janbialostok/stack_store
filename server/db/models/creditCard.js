'use strict'
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = require("./address.js")

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var ccvValidator = validate({ validator: "isLength",
			      arguments: [3, 3],
			      message: "CCV is not 3 digits"});

var ccNumValidator = validate({ validator: "isLength",
				arguments: [16, 16],
				message: "CC number is not 16 digits"});

var creditSchema = new Schema({
    number: { type: String, required: true, unique: true, validate: ccNumValidator },
    expirationMonth: { type: Number, required: true, min: 1, max: 12 },
    expirationYear: { type: Number, required: true, min: 1000, max: 9999 },
    ccv: { type: String, required: true, validate: ccvValidator },
    billingAddress: { type: [Address.schema], required: true }
});

mongoose.model("Credit", creditSchema);
// module.exports = mongoose.model('Credit', creditSchema);
