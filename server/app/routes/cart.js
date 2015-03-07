"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);

router.post('/user/:userid/item/:itemid', function (req, res, next){

	var quantity = req.body;

	User.findById(req.params.userid, function (err, user){
		if (!err) {
			if (user.cart.items.length = 0) {
				user.cart = new Cart({user: req.params.userid});
				user.cart.items.push({item: req.params.itemid , quantity: quantity});
			};
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