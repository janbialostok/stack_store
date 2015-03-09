'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('checkoutView', {
		url: '/checkout',
		controller: 'CheckoutCtrl',
		templateUrl: 'js/checkout/checkout.html'
	});
});

app.controller('CheckoutCtrl', function($scope, $state, $q, CurrentFactory, UserFactory, CartFactory, ItemFactory){
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
		items.forEach(function (item, index){
			UserFactory.getUserById(item.sellerID).then(function (returnedSeller){
				$scope.cart.items[index].quantity = itemQuantity[index];
				$scope.cart.items[index].sellerName = returnedSeller.name;
			});
		});
	});

});