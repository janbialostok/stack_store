"use strict";
var userRouter = require("express").Router();
var User = require("../../db/models/user.js");

router.get("/user/id", function(req, res) {
    User.findOne({ _id: req.query.userId }, function(err, user) {
	if (!err) res.json(user);
	else res.status(404).end();
    });
});

module.exports = userRouter;
