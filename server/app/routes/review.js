"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var Review = mongoose.model("Review", Review);
var User = mongoose.model("User", User);
var Item = mongoose.model("Item", Item);

router.use('/create/:itemid/:userid', function (req, res, next){
	Item.findOne({ _id: req.params.itemid }, function (err, item){
		if (err) next(err);
		else {
			req.item = item;
			User.findOne({ _id: req.params.userid }, function (err, user){
				if (err) next(err);
				else {
					req.userid = user._id;
					next();
				}
			});
		}
	});
});

router.post('/create/:itemid/:userid', function (req, res, next){
	var review = new Review(req.body);
	review.userId = req.userid;
	review.productId = req.item._id;
	review.save(function (err, newReview){
		if (err) next(err);
		else {
			req.item.reviews.push(newReview._id);
			res.status(200).end();
		}
	});
});

module.exports = router;