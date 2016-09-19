'use strict';

app.controller("PostController", [
    '$scope',
    'postService',
    'userService',
    'commentService',
    'tagService',
    '$location',
    '$routeParams',
    'ngToast',
    // 'ckeditor',
    '$route',
    function($scope, postService, userService, commentService, tagService, $location, $routeParams, ngToast, $route) {

        $scope.userService = userService;

        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        $scope.getPostById = function(postId) {
            postService.getPostById(postId)
                .then(function(post) {
                    $scope.post = post;
                    // commentService.getCommentsByPostId($routeParams.id)
                    //     .then(function(comments) {
                    //         $scope.comments = comments;
                    //     }, function(err) {
                    //         ngToast.danger(err);
                    //     });
                }, function(err) {
                    ngToast.danger(err);
                });
        };

        $scope.createPost = function(post) {
            postService.createPost(post)
                .then(function(response) {
                    ngToast.success("You are successfully added post");
                    $location.path('/posts');
                }, function(err) {
                    ngToast.danger(err);
                });
        };


        $scope.viewPost = function(postId) {
            $location.path('/post/' + postId);
        };
    }
]);
