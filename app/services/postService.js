'use strict';

app.factory('postService', [
    '$http',
    'BASE_URL',
    'userService',
    'KINVEY_PARAMS',
    '$q',
    '$route',
    'ngToast',
    function($http, BASE_URL, userService, KINVEY_PARAMS, $q, $route, ngToast) {

        let postRequestUrl = BASE_URL + 'appdata/' + KINVEY_PARAMS.appKey + '/posts';

        function getAllPosts() {
            let deferred = $q.defer();

            let requestUrl = postRequestUrl;

            userService.setAuthHeaders(false, true);

            $http.get(postRequestUrl)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });


            return deferred.promise;
        }

        function getRecentPosts() {
            let deferred = $q.defer();

            let requestUrl = postRequestUrl + '?query={}&sort={"_kmd.ect": -1}';

            userService.setAuthHeaders(false, true);

            $http.get(requestUrl)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });


            return deferred.promise;
        }

        function getPostById(postId) {
            let deferred = $q.defer();

            let requestUrl = postRequestUrl + '/' + postId + '?resolve=comments';

            userService.setAuthHeaders(false, true);

            $http.get(requestUrl)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });


            return deferred.promise;
        }

        function updatePost(post) {
            let requestUrl = postRequestUrl + '/' + post._id;

            userService.setAuthHeaders(false, true);

            $http.put(requestUrl, post)
                .then(function(response) {
                    $route.reload();
                    ngToast.success('You are successful added comment.');

                }, function(err) {
                    ngToast.danger(err.data);
                });
        }

        function createPost(post) {
            let deferred = $q.defer();

            userService.setAuthHeaders(true, true);

            $http.post(postRequestUrl, post)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        return {
            getAllPosts: getAllPosts,
            getPostById: getPostById,
            getRecentPosts: getRecentPosts,
            updatePost: updatePost,
            createPost: createPost
        };
    }
]);
