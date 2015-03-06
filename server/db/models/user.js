'use strict';
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = mongoose.model('Address');
var Credit = mongoose.model('Credit');
var Cart = mongoose.model('Cart');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var emailValidator = validate({ validator: "isEmail", arguments: [this], message: "Please enter a valid email address"});

var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    facebook: { id: String },
    google: { id: String },
    // key: { type: String, unique: true },
    // token: { type: String, unique: true },
    authType: { type: String, required: true, default: "local" },
    permLevel: { type: String, required: true },
    hashPassword: { type: String },
    salt: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: String,
    email: { type: String, required: true, unique: true, validate: emailValidator },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    address: [Address.schema],
    creditCard: [Credit.schema],
    cart: [Cart.schema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }]
});

var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

userSchema.virtual('password').set(function (password){
    this.salt = generateSalt();
    this.hashPassword = encryptPassword(password, this.salt);
});

userSchema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.hashPassword;
});

userSchema.method('cartToOrder', function (cart) {
    var self = this;
    Cart.create(this.cart).exec(function (err, savedCart){
        self.orders.push(savedCart._id);
    });
});

// module.exports = mongoose.model('User', userSchema);
mongoose.model('User', userSchema);
