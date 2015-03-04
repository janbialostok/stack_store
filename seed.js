var async = require('async');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/stack_store");

var Item = require('./server/db/models/item.js');
var User = require('./server/db/models/user.js');
var Address = require('./server/db/models/address.js');

var userData = [
    {name: "Admin", permLevel: "Super User", password: "password", firstName: "Joe", lastName: "Johnson", email: "joe123@gmail.com", shippingAddress: [new Address({address1: "5 Hanover Square" ,address2: "Floor 25", city: "New York", stateProv: "NY", postalCode: "10004", country: "US", phone: "(212) 555-5555"})]},
    {name: "Joe Johnson", permLevel: "Registered User", password: "password", firstName: "Joe", lastName: "Johnson", email: "joe123@gmail.com", shippingAddress: [new Address({address1: "614 East Lee St." ,address2: "Apt. 2", city: "Tucson", stateProv: "AZ", postalCode: "85719", country: "US", phone: "(503) 555-5555"})]},
    {name: "Lilly Baker", permLevel: "Registered User", password: "password", firstName: "Lilly", lastName: "Baker", email: "lilly123@gmail.com"}
];

var itemData = [
    {name: "Blue Jeans", price: "$30", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "Red Jeans", price: "$30", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "White Jeans", price: "$30", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "Blue Jeans", price: "$50", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "Blue Jeans", price: "$50", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "Blue Jeans", price: "$30", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "male pants", "male slim"], quantity: 10, size: "34 x 32"},
    {name: "Black Jeans", price: "$40", description: "", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "female pants", "female slim"], quantity: 6, size: "27"}
];

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
	console.log("Adding Data");
	async.each(userData, function (user,firstDone) {
	    User.create(user, firstDone);	
	},function (err){
	    console.log("Finished With Users");
	    User.findOne({name: "Admin"} , function (err, adminUser){
		async.each(itemData, function (item, secondDone){
		    item.sellerID = adminUser._id;
		    Item.create(item, secondDone);
		}, function (err){
		    if (err) console.log(err);
		    console.log("Finished With Items");
		    console.log("Control-C to exit because I'm too lazy to implement a function to end this.");
		});
	    });
	});
    });
});
