'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('itemData', {
		abstract: true,
		url: '/itemData',
		controller: 'ItemDataCtrl',
		template: '<ui-view></ui-view>'
	});

	$stateProvider.state('itemData.add', {
		url: '/add',
		controller: 'AddItemCtrl',
		templateUrl: 'js/itemdata/itemdata.html'
	});

	$stateProvider.state('itemData.edit', {
		url: '/edit/:itemId',
		controller: 'EditItemCtrl',
		templateUrl: 'js/itemdata/itemdata.html'
	});
});

app.controller('AddItemCtrl', function($scope, CategoryFactory, CurrentFactory, ItemFactory, $state, $timeout) {
	$scope.title = 'Add a New Item';
	$scope.buttonData = 'Add New Item';
	$scope.item = {
		tags: []
	};
	$scope.tagData = {
		availTags: CategoryFactory.getFirstLevelOptions(),
		singleTag: $scope.tagDisplay
	};

	$timeout(function() {
		$scope.checkTagValidity($scope.item.tags.length);
	});

	$scope.submitItem = function(item) {
		item.sellerID = CurrentFactory.current.user._id;
		ItemFactory.addItem(item).then(function() {
			$state.go('inventory');
		});
	};
});

app.controller('EditItemCtrl', function($scope, $stateParams, ItemFactory, CategoryFactory, $state) {
	$scope.title = 'Edit Existing Item';
	$scope.buttonData = 'Submit Changes';

	ItemFactory.getItem($stateParams.itemId).then(function(item) {
		$scope.item = item;
		$scope.tagData = {
			availTags: CategoryFactory.getChildrenFor($scope.item.tags[$scope.item.tags.length - 1]),
			singleTag: $scope.tagDisplay
		};
		$scope.checkTagValidity($scope.item.tags.length);
	});

	$scope.submitItem = function(item) {
		ItemFactory.updateItem(item).then(function() {
			$state.go('inventory');
		});
	};
});

app.controller('ItemDataCtrl', function($scope, CurrentFactory, $state, CategoryFactory, ItemFactory) {
	CurrentFactory.updateCurrentUser().then(function() {
		if (!CurrentFactory.current.user.permLevel
			|| CurrentFactory.current.user.permLevel === 'Guest')
			$state.go('home');
	});

	$scope.tagDisplay = 'Available Tags';
	
	$scope.setForm = function(form) {
		$scope.form = form;
	};

	$scope.checkTagValidity = function(tagLength) {
		$scope.form.tagForm.$setValidity('validateTag', !!tagLength);
	};

	$scope.addTag = function(item, tagData) {
		var tag = tagData.singleTag;
		if (tagData.availTags.indexOf(tag) === -1) return;
		item.tags.push(tag);
		tagData.singleTag = $scope.tagDisplay;
		tagData.availTags = CategoryFactory.getChildrenFor(tag);
		$scope.checkTagValidity(item.tags.length);
	};

	$scope.removeTag = function(item, tagData) {
		if (!item.tags.length) return;
		item.tags.pop();
		var tag = item.tags[item.tags.length - 1];
		tagData.singleTag = $scope.tagDisplay;
		if (item.tags.length) tagData.availTags = CategoryFactory.getChildrenFor(tag);
		else tagData.availTags = CategoryFactory.getFirstLevelOptions();
		$scope.checkTagValidity(item.tags.length);
	};
});