"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);

router.post('/user/:userid/item/:itemid', function (req, res, next){

	var quantity = req.body;
	console.log(req.body);

	User.findById(req.params.userid, function (err, user){
		if (!err) {
			console.log(user);
			if (user.cart.length == 0) {
				user.cart = new Cart(
					{ user: req.params.userid , 
					  items: [{item: req.params.itemid , quantity: quantity}] 
					});
				console.log("Cart", user.cart);
				user.save();
			} else {
				console.log(user.cart);
				user.cart.items.forEach( function (itemObject, index) {
					if (req.params.itemid == itemObject.item){
						user.cart.items[index].quantity =+ quantity;
						user.save();
						return;
					};
				});
				user.cart.items.push({item: req.params.itemid , quantity: quantity});
				user.save();
			} 
		} else next(err);
	});
});

router.delete('/user/:userid/item/:itemid', function (req, res, next){
	User.findbyId(req.params.userid, function (err, user) {
		if (!err) {
			user.cart.items.pull({id: req.params.itemid});
		} 
		else next(err);
	});
});


module.exports = router;