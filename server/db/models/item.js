'use strict'
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Review = require("./review.js");

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Currency, required: true},
    description: String,
    image: String,
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    sellerID: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    tags: [String],
    quantity: {type: Number, required: true},
    size: { type: String, required: true }
});

itemSchema.virtual('avgReview').get(function (){
    var sum = 0;
    this.reviews.forEach(function (review){
        sum += review.rating;
    });
    return Math.round(sum/this.reviews.length, -2);
});

mongoose.model("Item", itemSchema);
// module.exports = mongoose.model('Item', itemSchema);
