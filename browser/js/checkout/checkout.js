'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('checkoutView', {
		url: '/checkout',
		controller: 'CheckoutCtrl',
		templateUrl: 'js/checkout/checkout.html'
	})
	.state('checkoutView.payment',{
		url: '/payment',
		templateUrl: 'js/checkout/payment.html'
	});
});

app.controller('CheckoutCtrl', function($scope, $state, $q, CurrentFactory, UserFactory, CartFactory, ItemFactory, CreditFactory){
	$scope.user = CurrentFactory.current.user;
	var itemQuantity = [];
	CartFactory.getCartByUserId($scope.user._id).then(function (cart){
		$scope.cart = cart;
		return cart;
	}).then(function (cart) {
		var promises = cart.items.map(function (item, index) {
			itemQuantity.push(item.quantity);
			return ItemFactory.getItem(item.itemId);
		});
		return $q.all(promises);
	}).then(function (items) {
		$scope.cart.items = items;
		$scope.total = 0;
		items.forEach(function (item, index){
			UserFactory.getUserById(item.sellerID).then(function (returnedSeller){
				$scope.cart.items[index].quantity = itemQuantity[index];
				$scope.cart.items[index].sellerName = returnedSeller.name;
				$scope.total += item.quantity*item.price;
			});
		});
	});

	$scope.saveCustomer = function(status, response) {
		console.log(response);
		CreditFactory.processPayment(status,response,$scope.user._id,$scope.total).then(function(res){
			console.log(res);
		}) 	
  	};
});