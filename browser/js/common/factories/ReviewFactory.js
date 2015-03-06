'use strict';

app.factory('ReviewFactory', function ($http){
	var factory = {};
	factory.submitReview = function (review){
		return $http.post('/api/review/create', review).then(function (res){
			return res.data;
		});
	};
	return factory;
});