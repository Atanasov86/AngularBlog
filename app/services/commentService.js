'use strict';

app.factory('commentService', [
    '$http',
    'BASE_URL',
    'KINVEY_PARAMS',
    'userService',
    '$localStorage',
    '$q',
    function($http, BASE_URL, KINVEY_PARAMS, userService, $localStorage, $q) {

        let commentRequestUrl = BASE_URL + 'appdata/' + KINVEY_PARAMS.appKey + '/comments';

        function addComment(commentData) {
            let deferred = $q.defer();

            let data = {};

            if (userService.isLoggedIn()) {
                let currentUser = $localStorage.currentUser;
                data = {
                    author: currentUser.fullName,
                    email: currentUser.email,
                    content: commentData.content
                };

            } else {
                data = {
                    author: commentData.author,
                    email: commentData.email,
                    content: commentData.content
                };
            }

            $http.post(commentRequestUrl, data)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        return {
            addComment: addComment
        };
    }
]);
