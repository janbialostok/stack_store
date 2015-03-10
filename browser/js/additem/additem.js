'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('addItem', {
		url: '/itemData',
		controller: 'AddItemCtrl',
		templateUrl: 'js/additem/additem.html'
	});

	$stateProvider.state('addItem.edit', {
		url: '/:itemId/edit',
		controller: 'EditItemCtrl',
		templateUrl: 'js/additem/additem.html'
	});
});

app.controller('EditItemCtrl', function($scope, $stateParams, ItemFactory) {
	console.log('in');
	ItemFactory.getItem($stateParams.itemId).then(function(item) {
		console.log(item);
		$scope.item = item;
	});
});

app.controller('AddItemCtrl', function($scope, CurrentFactory, $state, CategoryFactory, ItemFactory, $timeout) {
	CurrentFactory.updateCurrentUser().then(function() {
		if (!CurrentFactory.current.user.permLevel
			|| CurrentFactory.current.user.permLevel === 'Guest')
			$state.go('home');
	});

	$scope.availTags = CategoryFactory.getFirstLevelOptions();
	$scope.item = {
		tags: []
	};

	var tagDisplay = 'Available Tags';
	$scope.singleTag = tagDisplay;
	$scope.success = false;

	$scope.showSuccess = function() {
		$scope.success = true;
		$timeout(function() {
			$scope.success = false;
			$scope.$apply();
		}, 2000);
	};

	$scope.addTag = function(tag) {
		if ($scope.availTags.indexOf(tag) === -1) return;
		$scope.item.tags.push(tag);
		$scope.singleTag = tagDisplay;
		$scope.availTags = CategoryFactory.getChildrenFor(tag);
	};

	$scope.removeTag = function() {
		if (!$scope.item.tags.length) return;
		$scope.item.tags.pop();
		var tag = $scope.item.tags[$scope.item.tags.length - 1];
		$scope.singleTag = tagDisplay;
		if ($scope.item.tags.length) $scope.availTags = CategoryFactory.getChildrenFor(tag);
		else $scope.availTags = CategoryFactory.getFirstLevelOptions();
	};

	$scope.$watch('item.tags.length', function(newVal) {
		if (newVal) $scope.addItemForm.tagForm.$setValidity('validateTag', true);
		else $scope.addItemForm.tagForm.$setValidity('validateTag', false);
	});

	$scope.addItem = function(item) {
		item.sellerID = CurrentFactory.current.user._id;
		ItemFactory.addItem(item).then(function() {
			$scope.item = {
				tags: []
			};
			$scope.showSuccess();
		});
	};
});