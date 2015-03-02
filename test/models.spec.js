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
