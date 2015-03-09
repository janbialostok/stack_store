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

	factory.getCartByUserId = function (userId) {
		return $http.get('/api/cart/user/' + userId).then(function (res){
			return res.data;
		})
	};

	factory.updateCart = function (cartId, item){
		return $http.put('/api/cart/update/' + cartId, item).then(function (res){
			return res.data;
		});
	}

	factory.deleteItem = function (cartId, item){
		var query = {};
		query.item = item;
		return $http.delete('/api/cart/delete/' + cartId + '/item/' + item._id).then(function (res){
			return res.data;
		});
	}

	return factory;
});