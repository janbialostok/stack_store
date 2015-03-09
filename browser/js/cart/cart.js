'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('cartView', {
		url: '/cart',
		controller: 'CartCtrl',
		templateUrl: 'js/cart/cart.html'
	});
});

app.controller('CartCtrl', function($scope, $state, $q, $timeout,CurrentFactory, UserFactory, CartFactory, ItemFactory) {

	var user = CurrentFactory.current.user;
	var itemQuantity = [];
	CartFactory.getCartByUserId(user._id).then(function (cart){
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
				$scope.cart.items[index].editQuantity = function (item){
					if (item.quantity === 0) {
						item.deleteItem(item);
					}
					else {
						CartFactory.updateCart($scope.cart._id, item).then(function (updated){
							CurrentFactory.updateCartSize(user);
							$scope.updatedMessage = true;
							$timeout(function(){$scope.updatedMessage = false}, 3000);
						});
					}
				};
				$scope.cart.items[index].deleteItem = function (item){
					CartFactory.deleteItem($scope.cart._id, item).then(function (updated){
						$scope.cart.items.splice(updated.index, 1);
						CurrentFactory.updateCartSize(user);
						$scope.updatedMessage = true;
						$timeout(function(){$scope.updatedMessage = false}, 3000);
					});
				};
			});
		});
	});

});