var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Credit, Address, Review, Cart, User, Item;

var Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var creditSchema = new Schema({

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

});

var cartSchema = new Schema({

});

var userSchema = new Schema({

});

var itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Currency, required: true},
    description: String,
    image: String,
    reviews: [reviewSchema],
    sellerID: { type: Number, required: true }
});

Credit = mongoose.model('Credit', creditSchema);
Address = mongoose.model('Address', addressSchema);
Review = mongoose.model('Review', reviewSchema);
Cart = mongoose.model('Cart', cartSchema);
User = mongoose.model('User', userSchema);
Item = mongoose.model('Item', itemSchema);
