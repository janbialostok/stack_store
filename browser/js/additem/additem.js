'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('addItem', {
		url: '/addItem',
		controller: 'AddItemCtrl',
		templateUrl: 'js/additem/additem.html'
	});
});

app.controller('AddItemCtrl', function($scope, CurrentFactory, $state, CategoryFactory) {
	if (!CurrentFactory.current.user.permLevel
		|| CurrentFactory.current.user.permLevel === 'Guest')
		$state.go('home');

	$scope.availTags = CategoryFactory.getFirstLevelOptions();
	$scope.item = {
		tags: []
	};

	$scope.addTag = function(tag) {
		if ($scope.availTags.indexOf(tag) === -1) return;
		$scope.item.tags.push(tag);
		$scope.availTags = CategoryFactory.getChildrenFor(tag);
	};
});