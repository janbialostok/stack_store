'use strict';
var crypto = require("crypto");
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Address = mongoose.model('Address');
var Promise = require('bluebird');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

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
	shippingAddress: [Address.schema]
});

cartSchema.methods.size = function() {
	return this.items.reduce(function(prev, cur) {
		return prev + cur.quantity;
	}, 0);
};

cartSchema.statics.addItem = function (cartId, itemObj){
    var self = this;
    var hasSet = false;
    self.findById(cartId, function (err, cart){
        var contents = cart.items;
        contents.forEach(function (item){
            if (itemObj.itemId.toString() === item.itemId.toString()){
                item.quantity += itemObj.quantity;
                hasSet = true;
            }   
        });
        if (!hasSet) {
            self.findByIdAndUpdate(cartId, {$push: {items: itemObj}}, function(err, data) {
                console.log("Push data", data);
                return;
            });
        }
        else {
            self.findByIdAndUpdate(cartId, {$set: {items: contents}}, function(err, data){
                console.log("Set data", data);
                return;
            });
        }
    });
};

mongoose.model("Cart", cartSchema);
// module.exports = mongoose.model('Cart', cartSchema);