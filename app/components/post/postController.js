'use strict';

app.controller("PostController", [
    '$scope',
    'postService',
    'userService',
    'commentService',
    '$location',
    '$routeParams',
    'ngToast',
    '$route',
    function($scope, postService, userService, commentService, $location, $routeParams, ngToast, $route) {

        $scope.userService = userService;

        $scope.getPostById = function($routeParams) {
            postService.getPostById($routeParams.id)
                .then(function(post) {
                    $scope.post = post;
                    commentService.getCommentsByPostId($routeParams.id)
                        .then(function(comments) {
                            $scope.comments = comments;
                        }, function(err) {
                            ngToast.danger(err);
                        });
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.getRecentPost = function() {
            postService.getRecentPosts()
                .then(function onSuccess(recentPosts) {
                    $scope.recentPosts = recentPosts;
                }, function onError(err) {
                    ngToast.danger(err);
                });
        };


        $scope.addComment = function(commentData) {
            commentService.addComment($routeParams.id, commentData)
                .then(function(response) {
                    ngToast.success("You are succeessfully added comment.");
                    $route.reload();
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.createPost = function(post) {
            postService.createPost(post)
                .then(function(response) {
                    console.log(response);
                    ngToast.success("You are successfully added post");
                    $location.path('/');
                }, function(err) {
                    ngToast.danger(err);
                });
        }

        $scope.getPostById($routeParams);
    }
]);
