'use strict';

app.factory('CartFactory', function($http) {
	var factory = {};

	factory.sendItemToCart = function (item) {
		return $http.put('/api/cart/add/', item).then(function (res){
			return res.data;
		});
	};

	factory.getCart = function (userId) {
		console.log("userId", userId);
		return $http.get('/api/cart/' + userId).then(function (res){
			return res.data;
		})
	}

	return factory;
});