"use strict";

app.config(function($stateProvider) {
	$stateProvider.state("manageOrders", {
		url: "manageOrders",
		controller: "ManageOrderCtrl",
		templateUrl: "js/superuser/manageorders/manageorders.html"
	});
});

//app.controller("ManageOrderCtrl", function($scope, ))
