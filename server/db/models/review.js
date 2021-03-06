'use strict';
var mongoose = require("mongoose");
var validate = require("mongoose-validator");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

var reviewValidator = validate({ validator: "isLength",
				arguments: [25],
				message: "Reviews must be at least 25 characters"});

var reviewSchema = new Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, required: true, validate: reviewValidator },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item' }
});

mongoose.model("Review", reviewSchema);
// module.exports = mongoose.model('Review', reviewSchema);
