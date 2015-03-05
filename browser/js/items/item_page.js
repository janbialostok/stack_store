"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

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



app.controller('ItemCtrl', function($scope, $state, $stateParams, SingleItemFactory) {
	SingleItemFactory.getItem($stateParams.productId).then(function (data){
		console.log(data);
		$scope.product = {
			imgSrc: data.image,
			productName: data.name,
			price: data.price,
			description: data.description,
			quantity: data.quantity,
			size: data.size,
			tags: data.tags,
			reviews: data.reviews
		}
		if ($scope.product.description === "") $scope.product.showDescription = false;
		else $scope.product.showDescription = true;
		SingleItemFactory.getUser(data.sellerID).then(function (username){
			$scope.product.sellerName = username;
		});
	});
});