"use strict";
var itemRouter = require("express").Router();
var Item = require("../../db/models/item.js");

itemRouter.get("/id", function(req, res) {
    Item.findOne({ _id: req.query.productId }, function(err, item) {
	if (!err) res.json(item);
	else res.status(404).end();
    });
});

module.exports = itemRouter;
