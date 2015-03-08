// Define any routes for the app
// Note that this app is a single page app, and each partial is routed to using the URL fragment. For example, to select the 'home' route, the URL is http://localhost:8080/jboss-as-kitchensink-angularjs-bootstrap/#/home
angular.module('kitchensink', [ 'ngRoute', 'membersService' ])
    .config( [ '$httpProvider','$routeProvider', function($httpProvider, $routeProvider) {
        /*
         * Use a HTTP interceptor to add a nonce to every request to prevent MSIE from caching responses.
         */
        $httpProvider.interceptors.push('ajaxNonceInterceptor');

        $routeProvider.
        // if URL fragment is /home, then load the home partial, with the MembersCtrl controller
        when('/home', {
            templateUrl : 'partials/home.html',
            controller : MembersCtrl
        // Add a default route
        }).otherwise({
            redirectTo : '/home'
        });
    } ])
    .factory('ajaxNonceInterceptor', function() {
        // This interceptor is equivalent to the behavior induced by $.ajaxSetup({cache:false});

        var param_start = /\?/;

        return {
            request : function(config) {
                if (config.method == 'GET') {
                    // Add a query parameter named '_' to the URL, with a value equal to the current timestamp
                    config.url += (param_start.test(config.url) ? "&" : "?") + '_=' + new Date().getTime();
                }
                return config;
            }
        }
    });