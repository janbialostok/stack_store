"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);
var Cart = mongoose.model("Cart", Cart);
var Address = mongoose.model("Address", Address);

router.put('/add', function (req, res, next){
	User.findById(req.body.userId, function (err, user) {
		if (!err) {
			var item = {itemId: req.body.itemId , quantity: req.body.quantity};
			User.addItemToCart(item, user._id).then(function(user) {
				res.json(user);
			});
		} else next(err);
	});
});

router.get('/user/:userId', function (req, res, next){
	User.findById(req.params.userId)
		.populate('cart')
		.exec( function (err, user){
			if (!err){
				res.json(user.cart);
			}
			else {
				next(err);
			}
		});
	});

router.put('/:cartId/mergeWith/user/:userId', function(req, res, next) {
	User.findById(req.params.userId).exec()
	.then(function(user) {
		if (user.cart) return user;
		else return user.createCart();
	}).then(function(user) {
		return user.mergeCartWith(req.params.cartId);
	}).then(function(newUser) {
		res.json(newUser);
	});
});

router.delete('/user/:userid/item/:itemid', function (req, res, next){
	User.findById(req.params.userid, function (err, user) {
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

router.get('/:cartId/size', function(req, res, next) {
	Cart.findById(req.params.cartId, function(err, cart) {
		if (err) return next(err);
		res.send({ size: cart.size() });
	});
});

router.put('/:id/save/address', function (req, res, next){
	var shipping = new Address(req.body.shipping);
	var billing = new Address(req.body.billing);
	Cart.findByIdAndUpdate(req.params.id, {$push: {shippingAddress: shipping , billingAddress: billing}}, function (err, cart){
		if (!err) res.json(cart);
		else next(err);
	});
});

router.put('/:userid/clear', function (req, res, next){
	var cart = new Cart();
	cart.user = req.params.userid;
	cart.save(function (err, returned){
		if (!err) {
			User.findByIdAndUpdate(req.params.userid, {$set: {cart: returned._id}}, function (err, user){
				if (!err) res.json(user);
				else next(err);
			});
		}
		else next(err);
	});
});


module.exports = router;