app.directive('validateTag', function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, elem, attr, ctrl) {
			ctrl.$validators.validTag= function(val) {
				console.log('hi', scope.item.tags)

				// return !!scope.item.tags.length;
				return !!val.length;
				// return true;
			}

			// ctrl.$parsers.push(function(val) {
			// 	console.log(val);
			// 	console.log(scope.item);
			// 	console.log('ctrl:', ctrl)
			// 	scope.item.tags;
			// 	ctrl.$setValidity('validateTag', !!scope.item.tags.length);
			// 	return val;
			// });
			// ctrl.$formatters.push(function(val) {
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