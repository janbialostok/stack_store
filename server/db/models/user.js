'use strict'
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = require("./address.js");
var Credit = require("./creditCard.js");
var Cart = require("./cart.js")

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var emailValidator = validate({ validator: "isEmail", arguments: [this], message: "Please enter a valid email address"});

var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    key: { type: String, unique: true },
    token: { type: String, unique: true },
    authType: { type: String, required: true, default: "local" },
    permLevel: { type: String, required: true },
    hashPassword: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: String,
    email: { type: String, required: true, unique: true, validate: emailValidator },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    shippingAddress: [Address.schema],
    creditCard: [Credit.schema],
    cart: [Cart.schema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }]
});

userSchema.virtual('password').set(function (password){
    this.salt = crypto.randomBytes(16).toString('base64');
    this.hashPassword = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('base64');
});

module.exports = mongoose.model('User', userSchema);