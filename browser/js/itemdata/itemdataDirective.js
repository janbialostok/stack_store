app.directive('itemDataForm', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/itemdata/itemdata.html',
		scope: {
			item: '=',
			title: '@'
		},
		controller: 'ItemDataCtrl'
	};
});