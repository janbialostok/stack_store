"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);
var Review = mongoose.model("Review", Review);

router.post('/signup', function (req, res, next){
	var user = new User(req.body);
	user.save(function (err, savedUser){
		if (!err) res.json(savedUser);
		else next(err);
	});
});

router.get('/:userid/items/:itemid', function (req, res, next){
	User.findById(req.params.userid).populate("items").exec(function (err, user){
		if (!err) res.json(user.items);
		else next(err);
	});
});

router.get('/:id/reviews', function (req, res, next){
	Review.find({ userId: req.params.id }, function (err, reviews){
		if (!err) res.json(reviews);
		else next(err);
	});
});

router.use('/:id', function (req, res, next){
	User.findOne({ _id: req.params.id }, function (err, user){
		if (!err) {
			req.user = user;
			next();
		}
		else next(err);
	});
});

router.route('/:id')
	.get(function (req, res){
		res.json(req.user);
	})

	.put(function (req, res){
		for (var key in req.body){
			if (req.body.hasOwnProperty(key)){
				if (key === "address" || key === "creditCard" || key === "orders"){
					req.user[key].push(req.body[key]);
				}
				else req.user[key] = req.body[key];
			}
		}
		req.user.save(function (err, user){
			if (!err) res.status(200).end();
			else res.status(400).end();
		});
	})

	.delete(function (req, res){
		User.remove({ _id: req.user._id }, function (err){
			if (!err) res.status(200).send("User Deleted");
			else res.status(400).end();
		});
	});


router.get('/:userid/items/:itemid', function (req, res, next){
	User.findById(req.params.userid).populate("items").exec(function (err, user){
		if (!err) res.json(user.items);
		else next(err);
	});
});


module.exports = router;
