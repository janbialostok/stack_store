var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Credit, Address, Review, Cart, User, Item;

var Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var creditSchema = new Schema({
    number: { type: String, required: true, unique: true },
    expiration: { type: Date, required: true },
    ccv: { type: String, required: true },
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
    comment: { type: String },
    username: { type: String, required: true },
    userId: { type: String, required: true }
});

var cartSchema = new Schema({
    item: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    status: { type: String, required: true, default: "Open" }
});

var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    key: { type: String, required: true, unique: true },
    token: { type: String, required: true, unique: true },
    authType: { type: String, required: true },
    permLevel: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    image: String,
    email: { type: String, required: true },
    items: [String],
    address: addressSchema,
    creditCard: creditSchema,
    cart: cartSchema,
    orders: [cartSchema]
});

var itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Currency, required: true},
    description: String,
    image: String,
    reviews: [reviewSchema],
    sellerID: { type: String, required: true }
});

Credit = mongoose.model('Credit', creditSchema);
Address = mongoose.model('Address', addressSchema);
Review = mongoose.model('Review', reviewSchema);
Cart = mongoose.model('Cart', cartSchema);
User = mongoose.model('User', userSchema);
Item = mongoose.model('Item', itemSchema);

module.exports = {
    Credit: Credit,
    Address: Address,
    Review: Review,
    Cart: Cart,
    User: User,
    Item: Item
}
