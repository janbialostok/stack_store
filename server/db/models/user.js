'use strict';
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = mongoose.model('Address');
var Credit = mongoose.model('Credit');
var Cart = mongoose.model('Cart');
var Promise = require('bluebird');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var emailValidator = validate({ validator: "isEmail", arguments: [this], message: "Please enter a valid email address"});

var validatePermLevel = function(value) {
    return /Guest|Registered User|Super User/.test(value);
};

var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    facebook: { id: String },
    google: { id: String },
    // key: { type: String, unique: true },
    // token: { type: String, unique: true },
    authType: { type: String, required: true, default: "local" },
    permLevel: { type: String, required: true, validate: validatePermLevel },
    hashPassword: { type: String },
    salt: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: String,
    email: { type: String, required: true, validate: emailValidator },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    address: [Address.schema],
    creditCard: [Credit.schema],
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
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

userSchema.methods.createCart = function() {
    var self = this;
    return Cart.create({userId: self._id}).then(function(cart) {
        self.cart = cart._id;
        return new Promise(function(resolve, reject) {
            self.save(function(err, savedUser) {
                if (err) reject(err);
                resolve(savedUser);
            });
        });
    });
};

userSchema.methods.mergeCartWith = function(cartId) {
    var self = this;
    var userCart;
    return Cart.findById(this.cart).exec()
        .then(function(foundCart) {
            userCart = foundCart;
            return Cart.findById(cartId);
        }).then(function(mergingCart) {
            return userCart.mergeCartWith(mergingCart);
        }).then(function() {
            return self;
        });
};


userSchema.statics.addItemToCart = function (itemObj, userId){
    var self = this;
    return new Promise(function(resolve, reject) {
        var user = {};
        var cartId;
        self.findById(userId).exec()
        .then(function(foundUser) {
            user = foundUser;
            return user.cart;
        }).then(function(cartId) {
            if (cartId) {
                Cart.addItemById(cartId, itemObj).then(function() {
                    resolve(user);
                });
            } else {
                user.createCart().then(function() {
                    return Cart.addItemById(user.cart, itemObj);
                }).then(function() {
                    resolve(user);
                });

                // Cart.create({userId: userId}).then(function(newCart) {
                //     user.cart = newCart._id;
                //     newCart.addItem(itemObj).then(function() {
                //         user.save(function(err, savedUser) {
                //             resolve(savedUser);
                //         });
                //     });
                // });
            }
        });
    });
};

userSchema.statics.saveGuestUser = function() {
    var Self = this;
    return (function saveGuestUser() {
        var user = new Self({
            name: crypto.randomBytes(16).toString('base64'),
            password: 'temp',
            authType: 'local',
            permLevel: 'Guest',
            firstName: 'Guest',
            lastName: 'User',
            email: 'temp@email.com' 
        });

        return new Promise(function(resolve, reject) {
            Self.findOne({name: user.name}, function(err, foundUser) {
                if (foundUser || err) resolve(saveGuestUser());
                else {
                    user.save(function(err, savedUser) {
                        resolve(savedUser);
                    });
                }
            });
        });
    })();
};

// module.exports = mongoose.model('User', userSchema);
mongoose.model('User', userSchema);
