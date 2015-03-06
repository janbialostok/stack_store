var async = require('async');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/stack_store").connection;

require('./server/db/models/review.js');
require('./server/db/models/item.js');
require('./server/db/models/user.js');
require('./server/db/models/address.js');
require('./server/db/models/creditCard.js');
require('./server/db/models/cart.js');

var Item = mongoose.model("Item");
var User = mongoose.model("User");
var Address = mongoose.model("Address");

var userData = [
    {name: "Admin", permLevel: "Super User", password: "password", firstName: "Joe", lastName: "Johnson", email: "joe123@gmail.com", address: [new Address({address1: "5 Hanover Square" ,address2: "Floor 25", city: "New York", stateProv: "NY", postalCode: "10004", country: "US", phone: "(212) 555-5555"})]},
    {name: "Joe Johnson", permLevel: "Registered User", password: "password", firstName: "Joe", lastName: "Johnson", email: "joe123@gmail.com", address: [new Address({address1: "614 East Lee St." ,address2: "Apt. 2", city: "Tucson", stateProv: "AZ", postalCode: "85719", country: "US", phone: "(503) 555-5555"})]},
    {name: "Lilly Baker", permLevel: "Registered User", password: "password", firstName: "Lilly", lastName: "Baker", email: "lilly123@gmail.com"}
];

var itemData = [
    {name: "Blue Jeans", price: "80", description: "This long sleeve top is for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "tops", "long_sleeve"], quantity: 10, size: "34 x 32"},
    {name: "Red Jeans", price: "80", description: "This short sleeve top is for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "tops", "short_sleeve"], quantity: 10, size: "34 x 32"},
    {name: "White Jeans", price: "30", description: "These skinny jeans are for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "bottoms", "skinny"], quantity: 10, size: "34 x 32"},
    {name: "White Jeans", price: "30", description: "These slim jeans are for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "bottoms", "slim"], quantity: 10, size: "34 x 32"},
    {name: "Blue Jeans", price: "50", description: "These straight jeans are for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "bottoms", "straight"], quantity: 2, size: "34 x 32"},
    {name: "Blue Jeans", price: "50", description: "These boot jeans are for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "bottoms", "boot"], quantity: 10, size: "34 x 32"},
    {name: "Blue Jeans", price: "30", description: "These relaxed jeans are for a man.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["male", "bottoms", "relaxed"], quantity: 10, size: "34 x 32"},
    {name: "Black Jeans", price: "40", description: "This long sleeve top is for a woman.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "tops", "long_sleeve"], quantity: 6, size: "27"},
    {name: "Black Jeans", price: "50", description: "This short sleeve top if for a woman.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "tops", "short_sleeve"], quantity: 6, size: "27"},
    {name: "Black Jeans", price: "90", description: "These skinny jeans are for a woman.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "bottoms", "skinny"], quantity: 6, size: "27"},
    {name: "Black Jeans", price: "70", description: "These slim jeans are for a woman.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "bottoms", "slim"], quantity: 3, size: "27"},
    {name: "Black Jeans", price: "90", description: "These straight jeans are for a woman.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "bottoms", "straigh"], quantity: 1, size: "27"},
    {name: "Black Jeans", price: "60", description: "These boot jeans are for a lady.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "bottoms", "boot"], quantity: 6, size: "27"},
    {name: "Black Jeans", price: "40", description: "These relaxed jeans for for a lady.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["female", "bottoms", "relaxed"], quantity: 6, size: "24"},
    {name: "Black Jeans", price: "20", description: "This long sleeve top is for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "tops", "long_sleeve"], quantity: 6, size: "24"},
    {name: "Black Jeans", price: "30", description: "This short sleeve top is for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "tops", "short_sleeve"], quantity: 11, size: "24"},
    {name: "Black Jeans", price: "30", description: "Children shouldn't wear skinny jeans.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "bottoms", "skinny"], quantity: 23, size: "24"},
    {name: "Black Jeans", price: "20", description: "These slim jeans are for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "bottoms", "slim"], quantity: 6, size: "24"},
    {name: "Black Jeans", price: "20", description: "These straight jeans are for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "bottoms", "straight"], quantity: 6, size: "24"},
    {name: "Black Jeans", price: "20", description: "These boot jeans are for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "bottoms", "boot"], quantity: 6, size: "24"},
    {name: "Black Jeans", price: "10", description: "These relaxed jeans are for a child.", image: "http://anf.scene7.com/is/image/anf/anf_70793_01_prod1?$productMagnify-anf$", sellerID: "", tags:["children", "bottoms", "relaxed"], quantity: 6, size: "24"}
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
