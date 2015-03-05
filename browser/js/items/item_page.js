"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, SingleItemFactory) {
	SingleItemFactory.getItem($stateParams.productId).then(function (data){
		$scope.item = data;
		$scope.showDescription = $scope.item.description != "";
		SingleItemFactory.getUser(data.sellerID).then(function (username){
			$scope.item.sellerName = username;
		});
	});
});