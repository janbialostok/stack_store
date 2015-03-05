'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/:type', function(req, res, next) {
	var type = req.params.type;

	passport.authenticate(type);
});