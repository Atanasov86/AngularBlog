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

        function getRecentPosts () {
            let deferred = $q.defer();

            let dataStore = $kinvey.DataStore.collection('posts');

            let query = new $kinvey.Query();
            query.ascending('_kmd.ect');
            let stream = dataStore.find(query);
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

        function createPost(post) {
            let deferred = $q.defer();

            let author = JSON.parse(localStorage['kid_SJ6T9biKkinvey_user']);

            post.author = author.firstName + " " + author.lastName;

            let dataStore = $kinvey.DataStore.collection('posts');

            dataStore.save(post)
                .then(function (response){
                    console.log(response);
                }, function (err){
                    console.log(err);
                });

            return deferred.promise;
        }

        return {
            getAllPosts: getAllPosts,
            getPostById: getPostById,
            getRecentPosts: getRecentPosts,
            createPost: createPost
        };
    }
])
