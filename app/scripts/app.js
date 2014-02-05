'use strict';

angular.module('vierGewinntApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/game.html',
        controller: 'gameCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
