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
	factory.getBySearchString = function(searchStr) {
		return $http.get('/api/item/findBy/search/' + searchStr)
			.then(function(res) {
				return res.data;
			});
	};
	factory.sendItemToCart = function (item) {
		return $http.post('/api/cart/add/', item).then(function (res){
			return res.data;
		})
	};

	return factory;
});
