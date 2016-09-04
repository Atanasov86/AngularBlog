'use strict';

app.factory('postService', [
    '$kinvey',
    '$q',
    function($kinvey, $q) {

        function getAllPosts() {
            let deferred = $q.defer();

            let dataStore = $kinvey.DataStore.collection('posts');

            let stream = dataStore.find();
            stream.subscribe(
                function onSuccess(entities) {
                    deferred.resolve(entities)
                },
                function onError(err) {
                    deferred.reject(err);
                });


            return deferred.promise;
        }
        
        function getPostById(postId) {
        	let deferred = $q.defer();

        	let dataStore = $kinvey.DataStore.collection('posts');

        	let stream = dataStore.findById(postId);

        	stream.subscribe(
        		function onSuccess(entity){
        			deferred.resolve(entity);
        		}, function onError(err){
        			deferred.reject(err);
        		})

        	return deferred.promise;
        }

        return {
            getAllPosts: getAllPosts,
            getPostById: getPostById
        };
    }
])
