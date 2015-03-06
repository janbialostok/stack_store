'use strict';

app.factory('UserFactory', function($http) {
	var factory = {};
	factory.getReviewUser = function (userId){
		return $http.get('/api/user/' + userId).then(function (res){
			return res.data;
		});
	};
	factory.getSellerId = function (productId, userId){
		return $http.get('/api/item/' + productId + '/user/' + userId).then(function (res){
			return res.data.sellerID;
		});
	};
	return factory;
});