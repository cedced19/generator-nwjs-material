<% if (angular) { %>
angular.module('<%= _.camelize(title) %>', ['ngRoute'])
.config(['$routeProvider', function ($routeProvider) {
        $.material.init();
        $routeProvider
        .when('/', {
            templateUrl: 'vendor/views/index.html',
            controller: '<%= _.camelize(title) %>IndexCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}])
.controller('<%= _.camelize(title) %>IndexCtrl', ['$scope', function($scope) {

}]);
<% } else { %>
$(document).ready(function () {
    $.material.init();
});
<% } %>
