var chai = require("chai"),
    spies = require("chai-spies"),
    things = require("chai-things");

chai.use(spies);
chai.use(things);

var expect = require("chai").expect;
var models = require("../server/db/models/models.js");

var testAddress = {
	address1: "123 Fake St",
	address2: "Apt A",
	city: "New York",
	stateProv: "NY",
	postalCode: "12345",
	country: "United Stated",
	phone: "(555)555-5555"
};

var testCredit = {
	number: "1234567890123456",
	expiration: new Date(),
	ccv: "123"
};

var testReview = {
	rating: 5,
	comment: "Bacon ipsum dolor amet cillum shankle aliqua fatback, tri-tip tenderloin esse incididunt rump ullamco capicola picanha short loin sausage biltong. Cupidatat ham ex do flank laboris in est mollit pork loin pariatur drumstick filet mignon nisi. Exercitation corned beef minim sint, rump beef meatball anim porchetta cillum. Aute minim anim, pork belly cupidatat chuck alcatra spare ribs excepteur pork biltong kevin. Dolor est rump culpa ad sint, chicken aute ea." 
};

var testUser = {
	name: "janbialostok",
	permLevel: "registered",
	password: "Password!",
	firstName: "Jan",
	lastName: "Bialostok",
	email: "janbialostok@gmail.com"
};

var testItem = {
	name: "Test Item",
	price: "$100.00",
	description: "Some test item"
};


describe("Address Model", function(){
	describe("Validations", function(){
		var address = new models.Address();
		it("Should error without any data", function (done){
			address.validate(function (err){
				expect(err.errors).to.have.property("address1");
				expect(err.errors).to.have.property("city");
				expect(err.errors).to.have.property("stateProv");
				expect(err.errors).to.have.property("postalCode");
				expect(err.errors).to.have.property("country");
				expect(err.errors).to.have.property("phone");
				done();
			});
		});
	});
	describe("Save to database", function(){
		var address = new models.Address(testAddress);
		it("Should save to database", function (done){
			address.save(function (err, address){
				expect(err).to.equal(null);
				expect(typeof address).to.equal("object");
				models.Address.remove({}, done);
			});
		}); 
	});
});

describe("Credit Card Model", function() {
    describe("Validations", function() {
		var creditCard;	

		beforeEach(function() {
		    creditCard = new models.Credit();
		});

		it("Should err without any data", function(done) {
		    creditCard.validate(function(err) {
			expect(err.errors).to.have.property("number");
			expect(err.errors).to.have.property("expiration");
			expect(err.errors).to.have.property("ccv");
			expect(err.errors).to.have.property("address");
			done();
		    });
		});

		it("Should err with data of zero length", function(done) {
		    creditCard.number = "";
		    creditCard.ccv = "";
		    
		    creditCard.validate(function(err) {
				expect(err.errors).to.have.property("number");
				expect(err.errors).to.have.property("ccv");
				done();
		    });
		});

		it("Should save with valid data", function (done){
			var address = new models.Address(testAddress);
			address.save(function (err, returnedAddress){
				var addId = returnedAddress._id;
				for (var key in testCredit){
					creditCard[key] = testCredit[key];
				}
				creditCard.address = addId;
				creditCard.save(function (err, credit){
					expect(err).to.equal(null);
					expect(typeof credit).to.equal("object");
					models.Credit.remove({}).exec(function(){
						models.Address.remove({}, done);
					});
				});
			});
		});
    });
});

