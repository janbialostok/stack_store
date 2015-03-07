'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('cartView', {
		url: '/cart',
		controller: 'CartCtrl',
		templateUrl: 'js/cart/cart.html'
	});
});

app.controller('CartCtrl', function($scope, $state, $q, CurrentFactory, UserFactory, CartFactory, ItemFactory) {

	var user = CurrentFactory.current.user;
	CartFactory.getCart(user._id).then(function (cart){
		$scope.cart = cart;
		return cart;
	}).then(function (cart) {
		console.log(cart);
		var promises = cart.items.map(function (item, index) {
			return ItemFactory.getItem(item.itemId);
		});
		return $q.all(promises);
	}).then(function (items) {
		console.log("The items", items);
		$scope.cart.items = items;
		items.forEach(function (item, index){
			UserFactory.getUserById(item.sellerID).then(function (returnedSeller){
				$scope.cart.items[index].sellerName = returnedSeller.name;
			});
		});
		console.log("the cart on the scope", $scope.cart.items);
	})
});