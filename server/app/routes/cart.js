"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);

router.post('/add', function (req, res, next){
	User.findById(req.body.userId, function (err, user) {
		if (!err) {
			var item = {itemId: req.body.itemId , quantity: req.body.quantity};
			if (user.cart.length == 0) {
				var cart = { user: req.body.userId, items: [item]};
				user.cart = new Cart(cart);
				console.log(user.cart);
				user.save( function (err,returned){
					res.json(returned);
				});
			} else {
				// for (var i=0; i < userCart.items.length; i++) {
				// 	if (req.body.itemId.toString() == userCart.items[i].itemId.toString()){
				// 		userCart.items[i].quantity += req.body.quantity;
				// 		user.save(function (err,returned){
				// 			res.json(returned);
				// 			return;
				// 		});
				// 	};
				// };
				console.log("hi");
				user.cart.update({},{$push : {items: {itemId: item.itemId, quantity: item.quantity}}});
			} 
		} else next(err);
	});
});

router.delete('/user/:userid/item/:itemid', function (req, res, next){
	User.findById(req.params.userid, function (err, user) {
		if (!err) {
			user.cart.items.pull({id: req.params.itemid});
		} 
		else next(err);
	});
});


module.exports = router;