"use strict";

app.config(function($stateProvider) {
	$stateProvider.state("orderhistory", {
		url: "/orderhistory",
		controller: "OrderHistoryCtrl",
		templateUrl: "js/login/orderhistory/orderhistory.html"
	});
});

app.controller("OrderHistoryCtrl", function($scope, CurrentFactory, CartFactory, ItemFactory) {
	$scope.currentUser = CurrentFactory.current.user;

	var getOrderHistory = function() {
		return CartFactory.getOrdersByUserId($scope.currentUser._id).then(function(orders) {
			$scope.orderHistory = orders;
			$scope.orderHistory.forEach(function (order,index){
				var subtotals = 0;
				order.items.forEach(function (item){
					ItemFactory.getItem(item.itemId).then(function (returned){
						subtotals += returned.price*item.quantity;
						$scope.orderHistory[index].subtotal = subtotals;
					});
				});
			});
		});
	};

	getOrderHistory();
});
