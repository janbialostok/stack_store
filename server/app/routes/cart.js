"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);

router.post('/addToCart/user/:userid/item/:itemid', function (req, res, next){

	//these aren't correct
	User.findById(req.params.userid, function (err, user){
		if (!err) {
			if (user.cart) {
				user.cart.items.push({item: req.params.itemid, quantity: req.body.quantity });
			} else {
				user.cart = new Cart({user: req.params.userid});
				user.cart.items.push(req.params.itemid);
			}
		}
		else next(err);
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