'use strict';

app.factory('userService', [
    '$kinvey',
    '$q',
    function($kinvey, $q) {

        function login(user) {
            let deferred = $q.defer();

            $kinvey.User.login(user.email, user.password)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.message);
                });

            return deferred.promise;
        }

        function loginWithFacebook() {
            let deferred = $q.defer();

            var promise = $kinvey.User.connectFacebook('907455829364709');
            promise = promise.then(function(user) {
            	deferred.resolve(user);
                console.log(user);
            }).catch(function(error) {
            	deferred.reject(error);                
            });

            return deferred.promise;
        }

        function loginWithGooglePlus() {
            let deferred = $q.defer();

            var promise = $kinvey.User.connectGoogle('110791464890-1fm920gtadjljom0v1qkai63gtvuhjgo.apps.googleusercontent.com');
            promise = promise.then(function (user) {
            	deferred.resolve(user);
                console.log(user);
            }).catch(function (error) {
            	deferred.reject(error);                
            });

            return deferred.promise;
        }

        function register(user) {
            let deferred = $q.defer();            

            $kinvey.User.signup(user)
                .then(function(response) {                    
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.message);
                });

            return deferred.promise;
        }

        function logout() {
            let deferred = $q.defer();

            let promise = $q(function(resolve) {
                resolve($kinvey.User.getActiveUser());
            });
            promise.then(function(user) {
                if (user) {
                    return user.logout();
                }
            }).then(function(success) {
                deferred.resolve(success.data);
            }).catch(function(err) {
                deferred.reject(err.message);
            });

            return deferred.promise;
        }

        function resetPassword() {
        	// TODO: 
        }

        function changePassword() {
        	// TODO:
        }

        function getCurrentUser() {
            var user = JSON.parse(localStorage['kid_SJ6T9biKkinvey_user']);
            if (user) {
                return user;
            }
        }

        function isLoggedIn() {
            return !!localStorage['kid_SJ6T9biKkinvey_user'];
        }

        function isAdmin() {
            let user = localStorage['kid_SJ6T9biKkinvey_user'];
            
            if (user) {
                let userData = JSON.parse(user);                              
                return userData.roles === 'administrator'; 
            }
        }


        return {
            login: login,
            loginWithFacebook: loginWithFacebook,
            loginWithGooglePlus: loginWithGooglePlus,
            register: register,
            logout: logout,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };
    }
]);
