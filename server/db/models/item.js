'use strict';
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Review = mongoose.model('Review');

// mongoose.connect("mongodb://localhost/stack_store");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error: '));

var Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;

var itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true},
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

itemSchema.statics.findByCategory = function(tags, cb) {
    var tagArr = tags.split(' ');
    tagArr.shift();
    var queryObj = {
        $and: tagArr.map(function(tag) {
            return { tags: tag };
        })
    };
    return this.find(queryObj, cb); 
};

itemSchema.statics.findByPartialName = function(searchStr, cb) {
    return this.find({
        name: {
            $regex: searchStr,
            $options: 'i'
        } 
    }, cb);
};


mongoose.model("Item", itemSchema);
// module.exports = mongoose.model('Item', itemSchema);
