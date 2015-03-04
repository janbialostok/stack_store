'use strict';
var router = require('express').Router();
var models = require("../../db/models/models.js");

router.get("/", function(req, res) {
    models.items.find({}, function(err, allItems) {
	res.json(allItems);
    });
});

module.exports = router;
