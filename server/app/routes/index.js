'use strict';
var router = require('express').Router();
var Item = require('../../db/models/item.js');

router.get("/", function(req, res) {
    Item.find({}, function(err, allItems) {
	if (!err) res.json(allItems);
	else res.status(404).end();
    });
});

module.exports = router;
