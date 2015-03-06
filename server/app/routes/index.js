'use strict';
var router = require('express').Router();
router.use("/item", require("./item.js"));
router.use("/user", require("./user.js"));
router.use("/cart", require("./cart.js"));
router.use("/review", require("./review.js"));


module.exports = router;
