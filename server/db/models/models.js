var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Credit, Address, Review, Cart, User, Item;

var Schema = mongoose.Schema;

var creditSchema = new Schema({
	number: { type: String, required: true, unique: true },
	expiration: { type: Date, required: true },
	ccv: { type: String, required: true },
	address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }
});

var addressSchema = new Schema({

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

});

var itemSchema = new Schema({

});

Credit = mongoose.model('Credit', creditSchema);
Address = mongoose.model('Address', addressSchema);
Review = mongoose.model('Review', reviewSchema);
Cart = mongoose.model('Cart', cartSchema);
User = mongoose.model('User', userSchema);
Item = mongoose.model('Item', itemSchema);