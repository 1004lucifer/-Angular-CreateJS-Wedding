'use strict';

/**
 * @ngdoc function
 * @name weddingApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the weddingApp
 */
angular.module('weddingApp')
  .controller('GameCtrl', ['$scope', '$window', function ($scope, $window) {
    $scope.windowWidth = $window.innerWidth;
    $scope.gameHeight = 400;
  }]);
