app.factory('BearerAuthInterceptor', ['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($localStorage.currentUser.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.currentUser.token;
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
                $location.path('login');
            }
            return response || $q.when(response);
        }
    };
}]);

// Register the previously created AuthInterceptor.
app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('BearerAuthInterceptor');
});