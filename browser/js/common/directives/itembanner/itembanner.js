'use strict';

app.directive('itemBanner', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/itembanner/itembanner.html',
		scope: {
			dataArr: '='
		}
	};
});