'use strict';

module.exports = function (Post) {

	Post.createFakeData = function (faker) {
		return Post.create({
			title: faker.lorem.sentence(),
			content: faker.lorem.paragraph(),
			image: faker.image.imageUrl()
		});
	};

	Post.on('dataSourceAttached', function(obj) {
		var find = Post.find;
		Post.find = function(filter, cb) {
			return find.apply(this, arguments);
		};
	});

	Post.getRaw = function(page, limit, cb) {
		var page = page || 0;
		var limit = limit || 50;
		var skip = page * limit;

		return Post.find({label: "none"}, { skip: skip, limit: limit });
	}

	Post.getRawPost = function(page, limit) {
		return Post.getRaw(page, limit);
	}

	Post.addLabelById = function(id, label, cb) {
		Post.update({id: id}, {label: label}, cb);
	}

	Post.remoteMethod(
		'getRaw', 
		{
			accepts: [
				{ arg: 'page', type: 'number', default: 0 }, 
				{ arg: 'limit', type: 'number', default: 50 }
			],
			http: {
				verb: 'get'
			}
		}
	);
};
