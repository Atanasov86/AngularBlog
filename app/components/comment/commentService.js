'use strict';

app.factory('commentService', [
    '$kinvey',
    '$q',
    function($kinvey, $q) {

        function getCommentsByPostId(postId) {
            let deferred = $q.defer();

            let dataStore = $kinvey.DataStore.collection('comments');

            let query = new $kinvey.Query();

            query.equalTo('post._id', postId);

            dataStore.find(query)
                .subscribe(function(data) {
                    deferred.resolve(data);
                }, function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        function addComment(postId, commentData) {
            let deferred = $q.defer();

            let dataStore = $kinvey.DataStore.collection('comments');

            let user = localStorage['kid_SJ6T9biKkinvey_user'];

            let data = {};

            if (!user) {
                data = {
                    name: commentData.name,
                    email: commentData.email,
                    content: commentData.comment,
                    post: {
                        _type: 'KinveyRef',
                        _id: postId,
                        _collection: 'comments'
                    }
                };
            } else {
                let userData = JSON.parse(user);
                
                data = {
                    name: userData.firstName + " " + userData.lastName,
                    email: userData.email,
                    content: commentData.comment,
                    post: {
                        _type: 'KinveyRef',
                        _id: postId,
                        _collection: 'comments'
                    }
                };
            }



            dataStore.save(data)
                .then(function onSuccess(entity) {
                    deferred.resolve(entity);
                }, function onError(err) {
                    deferred.reject(err);
                })

            return deferred.promise;
        }

        return {
            getCommentsByPostId: getCommentsByPostId,
            addComment: addComment
        };
    }
])
