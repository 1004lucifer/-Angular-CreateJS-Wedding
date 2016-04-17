'use strict';

/**
 * @ngdoc overview
 * @name weddingApp
 * @description
 * # weddingApp
 *
 * Main module of the application.
 */
angular
  .module('weddingApp', [
    'ngRoute'
    //,'weddingApp.services'
    //,'weddingApp.directives'
    //,'weddingApp.uiClasses'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'game'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/game'
      });
  });
//var uiClasses = angular.module('weddingApp.uiClasses', []);
//var myServices = angular.module('weddingApp.services', []);
//var myDirectives = angular.module('weddingApp.directives', []);
