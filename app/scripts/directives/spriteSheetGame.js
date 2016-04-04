'use strict';

/**
 * @ngdoc directive
 * @name weddingApp.directive:spriteSheetGame
 * @description
 * # spriteSheetGame
 */
angular.module('weddingApp')
  .directive('spriteSheetGame', ['loaderSvc', 'Ground', 'Husband', function (loaderSvc, Ground, Husband) {
    return {
      template: '<canvas></canvas>',
      replace: true,
      restrict: 'E',
      scope: {
        width: '=width',
        height: '=height'
      },
      link: function postLink(scope, element, attrs) {
        var w, h, husband, ground,
          move = false,
          direction = 'right';

        element[0].width = $(element[0]).parent().width();
        element[0].height = scope.height;

        drawGame();


        function drawGame() {
          if (scope.stage) {
            scope.stage.autoClear = true;
            scope.stage.removeAllChildren();
            scope.stage.update();
          } else {
            scope.stage = new createjs.Stage(element[0]);
          }
          w = scope.stage.canvas.width;
          h = scope.stage.canvas.height;
          loaderSvc.getLoader().addEventListener("complete", handleComplete);
          loaderSvc.loadAssets();
        }

        function handleComplete() {
          ground = new Ground({width:w, height:h});
          ground.addToStage(scope.stage);

          husband = new Husband({characterAssetName: 'husband', y: 200});
          husband.addToStage(scope.stage);

          createjs.Ticker.timingMode = createjs.Ticker.RAF;
          createjs.Ticker.addEventListener("tick", tick);

          // decide Derection of touchEvent/mouseEvent
          decideEventDirection();

        }

        function tick(event) {
          var deltaS = event.delta / 1000;

          var groundMove = deltaS * 150;
          if (move){
            ground.setX((ground.getX() + (direction == 'right' ? -groundMove : groundMove)) % ground.getTileWidth());
          }

          scope.stage.update(event);
        }

        function decideEventDirection() {
          scope.stage.canvas.addEventListener('touchstart', touchstart);
          scope.stage.canvas.addEventListener('mousedown', touchstart);
          scope.stage.canvas.addEventListener('touchmove', touchmove);
          scope.stage.canvas.addEventListener('mousemove', touchmove);
          scope.stage.canvas.addEventListener('touchend', touchend);
          scope.stage.canvas.addEventListener('touchcancel', touchend);
          scope.stage.canvas.addEventListener('mouseup', touchend);
          var locationX;
          function touchstart(event) {
            direction = selectDirection(event);
            move = true;
          }
          function touchend(event) {
            move = false;
          }
          function touchmove(event) {
            direction = selectDirection(event);
          }
          function selectDirection(event) {
            locationX = event.offsetX ? event.offsetX : event.touches[0].clientX;
            return locationX > 100 ? 'right' : 'left';
          }
        }

      }
    };
  }]);
