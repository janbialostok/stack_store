'use strict';

app.factory('ReviewFactory', function ($http){
	var factory = {};
	factory.submitReview = function (review){
		return $http.post('/api/review/create', review).then(function (res){
			return res.data;
		});
	};
	factory.getReviewsForItem = function (productId){
		return $http.get('/api/item/' + productId + '/reviews').then(function (res){
			return res.data.reviews;
		});
	};
	return factory;
});