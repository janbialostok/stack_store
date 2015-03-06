'use strict';

app.factory('ItemFactory', function($http) {
	var factory = {};
	factory.getAllItems = function(){
		return $http.get('/api/item/findAll').then(function (res){
			return res.data;
		});
	};
	factory.getByCategory = function(tags) {
		return $http.get('/api/item/findBy/category/' + tags)
			.then(function(res) {
				return res.data;
			});
	};
	factory.getItem = function (productId){
		return $http.get('/api/item/' + productId).then(function (res){
			return res.data;
		});
	};
	factory.getUser = function (productId, userId){
		return $http.get('/api/item/' + productId + '/user/' + userId).then(function (res){
			return res.data.sellerID;
		});
	};
	factory.getReviews = function (productId){
		return $http.get('/api/item/' + productId + '/reviews').then(function (res){
			return res.data.reviews;
		});
	};
	factory.getReviewUser = function (userId){
		console.log('we"re sending this:', userId)
		return $http.get('/api/user/' + userId).then(function (res){
			return res.data;
		});
	};
	return factory;
});
