"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var Item = mongoose.model("Item", Item);

router.get('/findAll', function (req, res, next) {
    Item.find({}, function(err, items) {
		if (!err) res.json(items);
		else next(err);
    });
});

router.get('/findBy/category/:categoryTags', function(req,res, next) {
	
});

router.post('/create', function (req, res, next){
	var item = new Item(req.body);
	item.save(function (err, newItem){
		if (!err) res.json(newItem);
		else next(err);
	});
});

router.get('/:itemid/user/:userid', function (req, res, next){
	Item.findById(req.params.itemid).populate("sellerID").exec(function (err, user){
		if (!err) res.json(user);
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
			if (req.body.hasOwnPropertyKey(key)){
				if (key == 'reviews') req.item.reviews.push(req.body.reviews);
				else req.item[key] = req.item[key];
			}
		}
		req.item.save(function (err, item){
			if (!err) res.status(200).end();
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
