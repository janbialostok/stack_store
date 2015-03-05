"use strict";
app.factory("SingleItemFactory", function($http){
	return {
		getItem: function (productId){
			var query = {};
			if (productId) {
				query.productId = productId;
				return $http.get('/api/item/id', { params: query }).then(function (res){
					return res.data;
				});
			}
		},
		getUser: function (userId){
			var query = {};
			if (userId){
				query.userId = userId;
				return $http.get('/api/user/id', { params: query }).then(function (res){
					return res.data.name;
				});
			}
		}
	}
});