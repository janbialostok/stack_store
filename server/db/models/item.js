'use strict';
var mongoose = require("mongoose");
var validate = require("mongoose-validator");
var Promise = require("bluebird");

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

itemSchema.set("toJSON", { virtuals: true });

itemSchema.virtual('avgReview').get(function (){
    var sum = 0;
	var promises = [];
	var self = this;
	
	if (this.reviews.length > 0) {
		this.reviews.forEach(function (reviewId){
			promises.push(Review.findOne({ _id: reviewId }).exec(function(err, review) {
				sum += review.rating;
			}));
		});

		return Promise.all(promises).then(function() {
			return parseFloat(sum/self.reviews.length).toFixed(2);
		});
	}
	
	return new Promise(function(resolve, reject) {
		resolve(sum);
	});
});

itemSchema.statics.waitForAvgs = function(items) {
	var promises = [];
	
	items.forEach(function(item) {
		promises.push(item.avgReview);
	});

	return Promise.all(promises).then(function(avgRevArr) {
		var itemsObjs = [];
		
		items.forEach(function(item, i) {
			var itemObj = item.toObject();
			
			itemObj.avgReview = avgRevArr[i];
			itemsObjs.push(itemObj);
		});

		return itemsObjs;
	});
};

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

itemSchema.statics.findBySellerId = function(seller, cb) {
    return this.find({ sellerID: seller}, cb);
}

mongoose.model("Item", itemSchema);
// module.exports = mongoose.model('Item', itemSchema);
