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

	factory.getUser = function (itemId, userId){
		return $http.get('/api/item/' + itemId + '/user/' + userId).then(function (res){
			return res.data.sellerID;
		});
	};
	factory.getReviews = function (itemId){
		return $http.get('/api/item/' + itemId + '/reviews').then(function (res){
			return res.data.reviews;
		});
	};
	factory.getReviewUser = function (userId){
		return $http.get('/api/review/user/' + userId).then(function (res){
			return res.data;
		});
	};

	factory.getBySearchString = function(searchStr) {
		return $http.get('/api/item/findBy/search/' + searchStr)
			.then(function(res) {
				return res.data;
			});
	};

	return factory;
});
