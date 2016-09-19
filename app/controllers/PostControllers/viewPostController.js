'use strict';

app.controller('ViewPostController', [
    '$scope',
    'postService',
    'commentService',
    '$location',
    '$routeParams',
    'ngToast',
    function($scope, postService, commentService, $location, $routeParams, ngToast) {

        postService.getPostById($routeParams.id)
            .then(function(post) {
                $scope.post = post;
                if (post.comments !== undefined) {
                    $scope.comments = post.comments.map(function(comment) {
                        return comment._obj;
                    });
                }
            }, function(err) {
                ngToast.danger(err);
            });

        $scope.addComment = function(commentData) {
            commentService.addComment(commentData)
                .then(function(comment) {
                    postService.getPostById($routeParams.id)
                        .then(function(currentPost) {
                            if (currentPost.comments === undefined) {
                                currentPost.comments = [];
                            }

                            currentPost.comments.push({
                                _type: 'KinveyRef',
                                _id: comment._id,
                                _collection: 'comments'
                            });
                            postService.updatePost(currentPost);
                        }, function(err) {
                            ngToast.danger(err.data);
                        });

                }, function(err) {
                    ngToast.danger(err.data);
                });
        };
    }
]);
