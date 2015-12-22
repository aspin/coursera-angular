'use strict';

var app = angular.module('confusionApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/contactus', {
      templateUrl: '../contact.html',
      controller: 'ContactController'
    })
    .when('/menu', {
      templateUrl: 'menu.html',
      controller: 'MenuController'
    })
    .when('/menu/:id', {
      templateUrl: 'dishdetail.html',
      controller: 'DishDetailController'
    })
    .otherwise({ redirectTo: '/contactus'});
});
