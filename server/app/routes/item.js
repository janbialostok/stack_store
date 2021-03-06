"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var Promise = require("bluebird");
var Item = mongoose.model("Item");

var hideOutOfStock = function(items) {
	return items.filter(function(item) {
		return item.quantity > 0;
	});
};

router.get('/findAll', function (req, res, next) {
    Item.find({}, function(err, items) {
		if (!err) {
			Item.waitForAvgs(items).then(function(items) {
				res.json(hideOutOfStock(items));
			}).catch(function(err) {
				console.log(err);
			});	
		}
		
		else next(err);
    });
});

router.put('/update/:id/inventory', function (req, res, next){
	Item.findById(req.params.id, function (err, item){
		item.quantity -= req.body.quantity;
		item.save(function (err, returned){
			if (err) next(err);
			else res.json(returned);
		});
	});
});

router.get('/findBy/category/:categoryTags', function(req, res, next) {
	Item.findByCategory(req.params.categoryTags, function(err, items) {
		if (err) return next(err);
		Item.waitForAvgs(items).then(function(items) {
			res.json(hideOutOfStock(items));
		}).catch(function(err) {
			console.log(err);
		});	
	});
});

router.get("/findBy/user/:userId", function(req, res, next) {
    Item.findBySellerId(req.params.userId, function(err, items) {
		if (err) return next(err);
		Item.waitForAvgs(items).then(function(items) {
			res.json(items);
		}).catch(function(err) {
			console.log(err);
		});	
    });
});

router.get('/findBy/search/:searchString', function(req, res, next) {
	Item.findByPartialName(req.params.searchString, function(err, items) {
		if (err) return next(err);
		Item.waitForAvgs(items).then(function(items) {
			res.json(hideOutOfStock(items));
		}).catch(function(err) {
			console.log(err);
		});	
	});
});

router.post('/create', function (req, res, next){
	if (!req.body.image) req.body.image = "http://www.catpicturesnyc.com/wp-content/uploads/2011/05/kitten_in_jeans_picture.jpg";
	var item = new Item(req.body);
	item.save(function (err, newItem){
		if (!err) res.json(newItem);
		else next(err);
	});
});

router.get('/:itemid/user/:userid', function (req, res, next){
	Item.findById(req.params.itemid).populate("sellerID").exec(function (err, items){
		if (!err) res.json(hideOutOfStock(items));
		else next(err);
	});
});

router.get('/:itemid/reviews', function (req, res, next){
	Item.findById(req.params.itemid).populate("reviews").exec(function (err, reviews){
		if (!err) res.json(reviews);
		else next(err);
	});
});

router.use('/:id', function (req, res, next){
	Item.findOne({ _id: req.params.id }, function (err, item){
		if (!err) {
			req.item = item;
			next();
		}
		else next(err);
	});
});

router.route('/:id')
	.get(function (req, res){
		res.json(req.item);
	})
	.put(function (req, res){
		for (var key in req.body){
			req.item[key] = req.body[key];
		}
		req.item.save(function (err, item){
			if (!err) res.json(item);
			else res.status(400).end();
		});
	})
	.delete(function (req, res){
		Item.remove({ _id: req.item._id }, function (err){
			if (!err) res.status(200).end();
			else res.status(400).end();
		});
	});


module.exports = router;
