"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, SingleItemFactory, CurrentFactory) {
	SingleItemFactory.getItem($stateParams.productId).then(function (data){
		$scope.item = data;
		$scope.showDescription = $scope.item.description != "";
		SingleItemFactory.getUser(data._id, data.sellerID).then(function (user){
			$scope.item.sellerName = user.name;
			SingleItemFactory.getReviews($stateParams.productId).then(function (reviews){
				$scope.item.reviews = reviews;
			});
		});
	});
	CurrentFactory.updateCurrentUser().then(function (current){
		$scope.currentUser = current;
	});
});