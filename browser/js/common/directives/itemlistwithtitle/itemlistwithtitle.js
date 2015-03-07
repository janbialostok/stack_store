'use strict';

app.directive('itemsWithTitle', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/itemlistwithtitle/itemlistwithtitle.html',
		scope: {
			title: '@',
			items: '='
		}
	};
});