"use strict";
app.factory("SingleItemFactory", function($http){
	return {
		getItem: function (productId){
			return $http.get('/api/item/' + productId).then(function (res){
				return res.data;
			});
		},
		getUser: function (productId, userId){
			return $http.get('/api/item/' + productId + '/user/' + userId).then(function (res){
				return res.data.sellerID;
			});
		},
		getReviews: function (productId){
			return $http.get('/api/item/' + productId + '/reviews').then(function (res){
				return res.data.reviews;
			});
		},
		submitReview: function (review){
			return $http.post('/api/review/create').then(function (res){
				return res.data;
			});
		}
	}
});