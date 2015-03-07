'use strict';
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = mongoose.model('Address');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var cartSchema = new Schema({
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    items: [{ 
    	itemId: {
	    	type: mongoose.Schema.Types.ObjectId, 
	    	ref: 'Item' 
	    },
	    quantity: {type: Number, default: 1, min: 1}
    }],
    status: { type: String, required: true, default: 'Open' },
    billingAddress: [Address.schema],
    shippingAddress: [Address.schema]
});

// cartSchema.method('addItem', function (item){
//     this.update({},{$push : {items: {itemId: item.itemId, quantity: item.quantity}}});
// });

mongoose.model("Cart", cartSchema);
// module.exports = mongoose.model('Cart', cartSchema);