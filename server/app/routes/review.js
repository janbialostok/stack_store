"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var Review = mongoose.model("Review");
var Item = mongoose.model("Item");

router.post('/create', function (req, res, next){
	var review = new Review(req.body);
	review.save(function (err, newReview){
		if (err) next(err);
		else {
			Item.findOne({ _id: req.body.itemId }, function (err, item){
				if (err) res.status(400).end();
				else {
					item.reviews.push(newReview._id);
					item.save(function (err, returned){
						if (!err) res.status(200).end();
						else res.status(400).end();
					});
				}
			});
		}
	});
});

module.exports = router;