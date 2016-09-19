'use strict';

app.factory('userService', [
    '$http',
    'BASE_URL',
    'KINVEY_PARAMS',
    '$localStorage',
    'guestUser',
    '$q',
    function($http, BASE_URL, KINVEY_PARAMS, $localStorage, guestUser, $q) {

        let userRequestUrl = BASE_URL + 'user/' + KINVEY_PARAMS.appKey;

        function login(user) {
            let deferred = $q.defer();

            let requestUrl = userRequestUrl + '/login';

            setAuthHeaders(true, false);

            $http.post(requestUrl, JSON.stringify(user))
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        function register(user) {
            let deferred = $q.defer();

            let requestUrl = userRequestUrl;

            setAuthHeaders(true, false);

            $http.post(requestUrl, JSON.stringify(user))
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        function loginWithFacebook() {
            let deferred = $q.defer();

            setAuthHeaders(true, false);

            $http.post(userRequestUrl, null)
                .then(function(response) {
                    console.log(response);
                    deferred.resolve(response);
                }, function(err) {
                    console.log(err);
                    deferred.reject(err);
                });

            return deferred.promise;
        }
        //
        // function loginWithGooglePlus() {
        //     let deferred = $q.defer();
        //
        //     let requestUrl = BASE_URL + 'user/' + KINVEY_PARAMS.appKey;
        //     return deferred.promise;
        // }

        function logout() {
            let deferred = $q.defer();

            let requestUrl = userRequestUrl + '/_logout';

            setAuthHeaders(false, true);

            $http.post(requestUrl, null)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        function resetPassword(email) {
            let deferred = $q.defer();

            let requestUrl = BASE_URL + 'rpc/' + KINVEY_PARAMS.appKey + '/' + email + '/user-password-reset-initiate';

            setAuthHeaders(false, false);
            $http.post(requestUrl, null)
                .then(function(response) {
                    deferred.resolve(response.data);
                }, function(err) {
                    deferred.reject(err.data);
                });

            return deferred.promise;
        }

        function setAuthHeaders(isJSON, useSession) {
            let token;


            if (isJSON) {
                $http.defaults.headers.common['Content-type'] = 'application/json';
            }

            if (useSession) {
                if (isLoggedIn()) {
                    token = $localStorage.currentUser.authToken;
                    $http.defaults.headers.common.Authorization = 'Kinvey ' + token;
                } else {
                    // if dont have logged user, we are using guestUser for Authorization
                    token = btoa(guestUser.username + ":" + guestUser.password);
                    $http.defaults.headers.common.Authorization = 'Basic ' + token;
                }
            } else {
                token = KINVEY_PARAMS.appKey + ':' + KINVEY_PARAMS.appSecret;
                $http.defaults.headers.common.Authorization = 'Basic ' + btoa(token);
            }
        }

        function setUserCredentials(user) {
            let currentUser = {
                id: user._id,
                username: user.username,
                fullName: user.firstName + ' ' + user.lastName,
                email: user.email,
                role: user.roles,
                authToken: user._kmd.authtoken

            };

            $localStorage.currentUser = currentUser;
        }

        function clearUserCredentials() {
            $localStorage.$reset();
        }

        function getCurrentUser() {
            var user = $localStorage.currentUser;
            if (user) {
                return user;
            }
        }

        function isLoggedIn() {
            return !!$localStorage.currentUser;
        }

        function isAdmin() {
            let user = getCurrentUser();
            return (user !== undefined) && (user.role === 'administrator');
        }


        return {
            login: login,
            loginWithFacebook: loginWithFacebook,
            // loginWithGooglePlus: loginWithGooglePlus,
            register: register,
            logout: logout,
            resetPassword: resetPassword,
            setAuthHeaders: setAuthHeaders,
            setUserCredentials: setUserCredentials,
            clearUserCredentials: clearUserCredentials,
            getCurrentUser: getCurrentUser,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };
    }
]);
