"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var Item = mongoose.model("Item", Item);

router.get("/id", function(req, res) {
    Item.findOne({ _id: req.query.productId }, function(err, item) {
	if (!err) res.json(item);
	else res.status(404).end();
    });
});

module.exports = router;
