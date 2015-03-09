'use strict';

app.factory('CartFactory', function($http) {
	var factory = {};
	factory.sendItemToCart = function (item) {
		return $http.put('/api/cart/add/', item).then(function (res){
			return res.data;
		});
	};
	factory.addItemToCart = function(itemQuantity,itemId, userId) {
		var item = {
			userId : userId,
		 	itemId : itemId,
		 	quantity : itemQuantity
		};
		return this.sendItemToCart(item);
	};
	factory.getCartSize = function(cartId) {
		return $http.get('/api/cart/' + cartId + '/size/').then(function(res) {
			return res.data.size;
		});
	};
	factory.mergeCartTo = function(userId, cartId) {
		return $http.put('/api/cart/' + cartId + '/mergeWith/user/' + userId)
			.then(function(res) {
				return res.data;
			});
	};

	return factory;
});