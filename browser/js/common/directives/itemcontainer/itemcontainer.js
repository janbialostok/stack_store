'use strict';

app.directive('itemContainer', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/itemcontainer/itemcontainer.html',
		scope: {
			itemarray: '='
		}
	};
});