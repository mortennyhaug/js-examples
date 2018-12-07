/** application.js */

// module
const app = angular.module('jsdtApp', ['ngRoute']);

//configure routes
app.config(($routeProvider, $locationProvider) => {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'mainController'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'aboutController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactController'
    });
});

//controllers with injected angular $scope
app.controller('mainController', function ($scope) {
  // create a message to display in our view
	console.log('visiting mainController');
	$scope.greeting = 'Hello, rainbow world!';
  $scope.message = 'Learn more about JSDT at https://wiki.eclipse.org/JSDT';
});

app.controller('aboutController', function ($scope) {
	console.log('visiting aboutController');
  $scope.message = 'The JavaScript Development Tools (JSDT) \
        provide plug-ins for an IDE supporting JavaScript development.';
});

app.controller('contactController', function ($scope) {
	console.log('visiting contactController');
  $scope.message = 'Please, get in touch with open source development.';
});