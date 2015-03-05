'use strict';
var router = require('express').Router();
var Item = require('../../db/models/item.js');
var User = require('../../db/models/user.js');

router.get('/item/id', function(req, res){
	Item.findOne({ _id: req.query.productId }, function(err, item){
		if (!err) res.json(item);
		else res.status(404).end();
	});
});

router.get('/user/id', function(req, res){
	User.findOne({ _id: req.query.userId }, function(err, user){
		if (!err) res.json(user);
		else res.status(404).end();
	});
});

router.get("/", function(req, res) {
    Item.find({}, function(err, allItems) {
	res.json(allItems);
    });
});

module.exports = router;
