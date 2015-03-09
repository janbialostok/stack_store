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
			User.addItemToCart(item, user._id);
			res.json(user);
		} else next(err);
	});
});

router.get('/:userId', function (req, res, next){
	User.findById(req.params.userId)
		.populate('cart')
		.exec( function (err, user){
		if (!err) {
			res.json(user.cart);
		} else next(err);
	})
})

router.put('/update/:id', function (req, res){
	Cart.findById(req.params.id, function (err, cart){
		var items = cart.items;
		var index;
		items.forEach(function (item, i){
			if (item.itemId.toString() === req.body._id.toString()){
				item.quantity = req.body.quantity;
				index = i;
			}
		});
		cart.items = items;
		cart.save(function (err, returned){
			if (err) res.status(500).end();
			else {
				var responseObj = {
					index: index,
					quantity: req.body.quantity
				};
				res.json(responseObj);
			}
		});
	});
});

router.delete('/delete/:cartid/item/:itemid', function (req, res, next){
	Cart.findById(req.params.cartid, function (err, cart){
		var items = cart.items;
		var newArray = []
		var index;
		items.forEach(function (item, i){
			if (item.itemId.toString() !== req.params.itemid){
				newArray.push(item);
			}
			else index = i;
		});
		cart.items = newArray;
		cart.save(function (err, returned){
			if (err) res.status(500).end();
			else {
				var responseObj = {
					index: index
				};
				res.json(responseObj);
			}
		});
	});
});


module.exports = router;