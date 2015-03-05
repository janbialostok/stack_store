"use strict";
var userRouter = require("express").Router();
var User = require("../../db/models/user.js");

// userRouter.get("/id", function(req, res) {
//     User.findOne({ _id: req.query.userId }, function(err, user) {
// 	if (!err) res.json(user);
// 	else res.status(404).end();
//     });
// });

userRouter.route('/find/:id')
	.all(function (req, res, next){
		User.findOne({ _id: req.params.id }, function (err, user){
			if (!err) {
				req.user = user;
				next();
			}
			else next(err);
		});
	});
	.get(function (req, res){
		res.json(req.user);
	});
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
	});
	.delete(function (req, res){
		User.remove({ _id: req.user._id }, function (err){
			if (!err) res.status(200).send("User Deleted");
			else res.status(400).end();
		});
	});

userRouter.post('/signup', function (req, res, next){
	var user = new User(req.body);
	user.save(function (err, savedUser){
		if (!err) res.json(savedUser);
		else next(err);
	});
});

userRouter.get('/:userid/items/:itemid', function (req, res, next){
	User.findById(req.params.userid).populate("items").exec(function (err, user){
		if (!err) res.json(user.items);
		else next(err);
	});
});

module.exports = userRouter;
