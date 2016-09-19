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
    '$route',
    function($scope, postService, userService, commentService, tagService, $location, $routeParams, ngToast, $route) {

        $scope.userService = userService;

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
        //
        // $scope.getPostByTag = function($routeParams) {
        //     tagService.getPostByTag($routeParams.id)
        //         .then(function(reponse){
        //             console.log(response);
        //         })
        // };
        //
        // $scope.getTags = function(query){
        //     tagService.getTags();
        // };
        //
        // $scope.addComment = function(commentData) {
        //     commentService.addComment($routeParams.id, commentData)
        //         .then(function(response) {
        //             console.log(response);
        //             ngToast.success("You are succeessfully added comment.");
        //             $route.reload();
        //         }, function(err) {
        //             ngToast.danger(err);
        //         });
        // };
        //
        // $scope.createPost = function(post) {
        //     postService.createPost(post)
        //         .then(function(response) {
        //             console.log(response);
        //             ngToast.success("You are successfully added post");
        //             $location.path('/');
        //         }, function(err) {
        //             ngToast.danger(err);
        //         });
        // };
        //

        $scope.viewPost = function(postId) {
            $location.path('/post/' + postId);
        };
    }
]);
