'use strict';

app.directive('item', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/item.html',
		scope: {
			data: '='
		}
	};
});