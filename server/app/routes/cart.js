"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);

router.put('/add', function (req, res, next){
	User.findById(req.body.userId, function (err, user) {
		if (!err) {
			var item = {itemId: req.body.itemId , quantity: req.body.quantity};
			// should switch addItemToCart to a method
			User.addItemToCart(item, user._id).then(function(user) {
				console.log('user after added cart', user);
				res.json(user);
			});
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

router.get('/:cartId/size', function(req, res, next) {
	Cart.findById(req.params.cartId, function(err, cart) {
		if (err) return next(err);

		res.send({
			size: cart.size()
		});
	});
});


module.exports = router;