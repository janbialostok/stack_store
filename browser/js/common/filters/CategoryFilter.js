'use strict';

app.filter('catFilter', function() {
	return function(tags) {
		tags = tags.split(' ');
		tags.shift();
		return tags.join(' > ');
	};
});