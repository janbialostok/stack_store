'use strict';

app.filter('fixUnderscores', function() {
	return function(tag) {
		return tag.replace('_', ' ');
	};
});