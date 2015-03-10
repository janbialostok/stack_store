'use strict';
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Promise = require('bluebird');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;
var Address = mongoose.model('Address');
var Item = mongoose.model('Item');

var cartSchema = new Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	items: [{ 
		itemId: {
			type: mongoose.Schema.Types.ObjectId, 
			ref: 'Item' 
		},
		quantity: {type: Number, default: 1, min: 1}
	}],
	status: { type: String, required: true, default: 'Open' },
	billingAddress: [Address.schema],
	shippingAddress: [Address.schema],
	date: { type: Date, required: true, default: Date.now }
});

cartSchema.methods.size = function() {
	return this.items.reduce(function(prev, cur) {
		return prev + cur.quantity;
	}, 0);
};

cartSchema.methods.mergeCartWith = function(cartObj) {
	var addedItemPromises = [];
	var self = this;
	cartObj.items.forEach(function(item) {
		addedItemPromises.push(self.addItem(item));
	});
	return Promise.all(addedItemPromises);
};

cartSchema.methods.addItem = function (itemObj){
	var self = this;
	return new Promise(function(resolve, reject) {
		var hasSet = false;
		self.items.forEach(function(item) {
			if (item.itemId.toString() === itemObj.itemId.toString()) {
				item.quantity += itemObj.quantity;
				hasSet = true;
			}
		});
		if (!hasSet) self.items.push(itemObj);

		return self.save(function(err, cart) {
			if (err) reject(err);
			else resolve(cart);
		});
	});
};

cartSchema.statics.addItemById = function(cartId, itemObj) {
	var self = this;
	return new Promise(function(resolve, reject) {
		return self.findById(cartId, function(err, cart) {
			resolve(cart.addItem(itemObj));
		});
	});	
};

cartSchema.statics.calculateTotalCost = function(cartObj) {
	var totalCost = 0;
	
	cartObj.items.forEach(function(itemRef) {
		Item.findById(itemRef._id, function(err, item) {
			totalCost += item.price*itemRef.quantity;
		});
	});

	return totalCost;
};

cartSchema.statics.getSummary = function(cartObj) {
	var itemList = [];

	cartObj.items.forEach(function(itemRef) {
		Item.findById(itemRef._id, function(err, item) {
			itemList.push(itemRef.quantity + " " + item.name);
		});
	});

	return itemList;
}

mongoose.model("Cart", cartSchema);
// module.exports = mongoose.model('Cart', cartSchema);
