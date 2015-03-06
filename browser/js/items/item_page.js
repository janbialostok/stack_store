"use strict";

app.config(function($stateProvider) {
	$stateProvider.state('single_item', {
		url: '/item/:productId',
		controller: 'ItemCtrl',
		templateUrl: 'js/items/item_page.html'
	});
});

app.controller('ItemCtrl', function($scope, $state, $stateParams, ItemFactory, ReviewFactory, UserFactory) {
	ItemFactory.getItem($stateParams.productId).then(function (data){
		$scope.item = data;
		$scope.showDescription = $scope.item.description !== "";
		return UserFactory.getSellerId(data._id, data.sellerID);
	}).then(function (user){
		$scope.item.sellerName = user.name;
	}).then(function() {
		return ReviewFactory.getReviewsForItem($stateParams.productId);
	}).then(function(reviews) {
		reviews.forEach(function(review) {
			UserFactory.getReviewUser(review.userId).then(function(user) {
				review.username = user.name;
			});
		});
		$scope.item.reviews = reviews;
	});
});