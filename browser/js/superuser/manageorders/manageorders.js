"use strict";

app.config(function($stateProvider) {
	$stateProvider.state("manageOrders", {
		url: "manageOrders",
		controller: "ManageOrderCtrl",
		templateUrl: "js/superuser/manageorders/manageorders.html"
	});
});

app.controller("ManageOrderCtrl", function($scope, CurrentFactory, CartFactory, ItemFactory) {
		$scope.currentUser = CurrentFactory.current.user;

		var getAllOrders = function() {
				return CartFactory.getAllOrders().then(function(orders) {
						$scope.orderHistory = orders;
				});
		};

		$scope.cancelOrder = function(order) {
				return CartFactory.changeStatus(order, "Cancel");
		};

		$scope.completeOrder = function(order) {
				return CartFactory.changeStatus(order, "Complete");
		};
		
		getAllOrders();
});
