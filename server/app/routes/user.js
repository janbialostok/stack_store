"use strict";
var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User", User);

router.get("/id", function(req, res) {
    User.findOne({ _id: req.query.userId }, function(err, user) {
	if (!err) res.json(user);
	else res.status(404).end();
    });
});

module.exports = router;
