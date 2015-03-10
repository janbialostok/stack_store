"use strict";

app.config(function($stateProvider) {
	$stateProvider.state("orderhistory", {
		url: "/orderhistory",
		controller: "OrderHistoryCtrl",
		templateUrl: "js/login/orderhistory/orderhistory.html"
	});
});

app.controller("OrderHistoryCtrl", function($scope, CurrentFactory, CartFactory) {
	$scope.currentUser = CurrentFactory.current.user;

	var getOrderHistory = function() {
		return CartFactory.getCartByUserId($scope.currentUser._id).then(function(orders) {
			$scope.orderHistory = orders;
		});
	};

	getOrderHistory();
});
