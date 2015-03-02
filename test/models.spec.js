var chai = require("chai"),
    spies = require("chai-spies"),
    things = require("chai-things");

chai.use(spies);
chai.use(things);

var expect = require("chai").expect;
var models = require("../server/db/models/models.js");

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
    });
});

describe("Address Model", function(){
	describe("Validations", function(){
		var address;
		beforeEach(function (){
			address = new models.Address();
		});
		it("Should error without any data", function (done){
			address.validate(function (err){
				expect(err.errors).to.have.property("address1");
				expect(err.errors).to.have.property("city");
				expect(err.errors).to.have.property("stateProv");
				expect(err.errors).to.have.property("postalCode");
				expect(err.errors).to.have.property("country");
				expect(err.errors).to.have.property("phone");
			});
		});
	});
	describe("Save to database", function(){
		var address = new models.Address();
		it("Should save to database", function (done){
			address.address1 = "123 Fake St";
			address.address2 = "Apt A";
			address.city = "New York";
			address.stateProv = "NY";
			address.postalCode = "12345";
			address.country = "United Stated";
			address.phone = "(555)555-5555"
			address.save(function (err, address){
				expect(address.address1).to.equal("123 Fake St");
			});
		}); 
	});
});
