'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('category', {
		url: '/category/:tags',
		controller: 'CategoryCtrl',
		templateUrl: 'js/category/category.html'
	});
});

app.controller('CategoryCtrl', function($scope, $stateParams) {
	$scope.categoryTags = $stateParams.tags;
});