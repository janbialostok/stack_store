'use strict';

app.filter('catFilter', function() {
	return function(tags) {
		tags = tags.split(' ').map(function(tag) {
			return tag.replace('_', ' ');
		});
		tags.shift();
		return tags.join(' > ');
	};
});