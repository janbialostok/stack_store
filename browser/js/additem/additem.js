'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('addItem', {
		url: '/addItem',
		controller: 'AddItemCtrl',
		templateUrl: 'js/additem/additem.html'
	});
});

app.controller('AddItemCtrl', function($scope, CurrentFactory, $state, CategoryFactory) {
	CurrentFactory.updateCurrentUser().then(function() {
		if (!CurrentFactory.current.user.permLevel
			|| CurrentFactory.current.user.permLevel === 'Guest')
			$state.go('home');
	});

	$scope.availTags = CategoryFactory.getFirstLevelOptions();
	$scope.item = {
		tags: []
	};

	var tagDisplay = 'Available Tags'
	$scope.singleTag = tagDisplay

	$scope.addTag = function(tag) {
		if ($scope.availTags.indexOf(tag) === -1) return;
		$scope.item.tags.push(tag);
		$scope.singleTag = tagDisplay;
		$scope.availTags = CategoryFactory.getChildrenFor(tag);
	};

	$scope.removeTag = function() {
		if (!$scope.item.tags.length) return;
		$scope.item.tags.pop();
		var tag = $scope.item.tags[$scope.item.tags.length - 1]
		$scope.singleTag = tagDisplay;
		if ($scope.item.tags.length) $scope.availTags = CategoryFactory.getChildrenFor(tag);
		else $scope.availTags = CategoryFactory.getFirstLevelOptions();
	}

	$scope.$watch('item.tags.length', function(newVal) {
		console.log('hi')
		console.log(newVal)
		

		if (newVal) $scope.addItemForm.tagForm.$setValidity('validateTag', true);
		else $scope.addItemForm.tagForm.$setValidity('validateTag', false);
	});
});