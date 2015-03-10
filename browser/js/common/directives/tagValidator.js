app.directive('validateTag', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			ctrl.$validators.validTag= function() {
				return false;
			}

			// ctrl.$parsers.unshift(function(val) {
			// 	console.log(val);
			// 	console.log(scope.item);
			// 	console.log('ctrl:', ctrl)
			// 	scope.item.tags;
			// 	ctrl.$setValidity('validateTag', false);
			// 	return val;
			// });
		}
	}
})