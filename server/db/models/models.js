var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var ccvValidator = validate({ validator: "isLength",
			      arguments: [3, 3],
			      message: "CCV is not 3 digits"});

var ccNumValidator = validate({ validator: "isLength",
				arguments: [16, 16],
				message: "CC number is not 16 digits"});

var creditSchema = new Schema({
    number: { type: String, required: true, unique: true, validate: ccNumValidator },
    expiration: { type: Date, required: true },
    ccv: { type: String, required: true, validate: ccvValidator },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
});

var addressSchema = new Schema({
    address1: { type: String, required: true },
    address2: String,
    city: { type: String, required: true },
    stateProv: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true }
});

var reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, min: 50 },
    username: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' }
});

var cartSchema = new Schema({
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    status: { type: String, required: true, default: 'Open' }
});

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
    email: { type: String, required: true, unique: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    shipping: [addressSchema],
    billing: [addressSchema],
    creditCard: [creditSchema],
    cart: [cartSchema],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }]
});

var itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Currency, required: true},
    description: String,
    image: String,
    reviews: [reviewSchema],
    avgReview: { type: Number, min: 1, max: 5},
    sellerID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tags: [String]
});

userSchema.virtual('password').set(function (password){
    this.salt = crypto.randomBytes(16).toString('base64');
    this.hashPassword = crypto.pbkdf2Sync(password, this.salt, 100, 64).toString('base64');
});

itemSchema.pre('save', function (next){
    var total = 0;
    this.reviews.forEach(function (review){
        total += review.rating;
    });
    this.avgReview = (total/this.reviews.length);
    next();
});

module.exports = {
    Credit: mongoose.model('Credit', creditSchema),
    Address: mongoose.model('Address', addressSchema),
    Review: mongoose.model('Review', reviewSchema),
    Cart: mongoose.model('Cart', cartSchema),
    User: mongoose.model('User', userSchema),
    Item: mongoose.model('Item', itemSchema)
}
