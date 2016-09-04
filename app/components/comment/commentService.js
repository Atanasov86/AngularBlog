'use strict'

app.factory('commentService', [
	'$kinvey',
	'$q',
	function ($kinvey, $q) {
		
		function getCommentsByPostId (postId) {
			let deferred = $q.defer();

			let dataStore = $kinvey.DataStore.collection('comments');

			let query = new $kinvey.Query();

			query.equalTo('type._id', postId);

            dataStore.find(query)
            	.subscribe(function (data){
            		deferred.resolve(data);
            	}, function (err){
            		deferred.reject(err);
            	});

            return deferred.promise;
		}

		function addCommentByPostId (postId, commentData) {
			let deferred = $q.defer();

			let dataStore = $kinvey.DataStore.collection('comments');

			let data = {
				name: commentData.name,
				email: commentData.email,
				content: commentData.comment,
				type: {
					_type: 'KinveyRef',
					_id: postId,
					_collection: 'comments'
				}
			}

			let promise = dataStore.save(data)
				.then(function onSuccess(entity){
					deferred.resolve(entity);
				}, function onError(err){
					deferred.reject(err);
				})

			return deferred.promise;
		}

	return {
		getCommentsByPostId: getCommentsByPostId,
		addCommentByPostId: addCommentByPostId
	};
}])