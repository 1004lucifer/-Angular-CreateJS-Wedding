'use strict';

/**
 * @ngdoc directive
 * @name weddingApp.directive:spriteSheetGame
 * @description
 * # spriteSheetGame
 */
angular.module('weddingApp')
  .directive('spriteSheetGame', ['loaderSvc', 'Ground', 'Hill', 'Husband', function (loaderSvc, Ground, Hill, Husband) {
    return {
      template: '<canvas></canvas>',
      replace: true,
      restrict: 'E',
      scope: {
        width: '=width',
        height: '=height'
      },
      link: function postLink(scope, element, attrs) {
        var w, h, husband, ground, hill, hill2,
          distance = 0,   // distance of character movement
          distanceCountFlag = true,
          move = false,   // flag animation move (Event)
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

          hill = new Hill({width:w, height:h, scaleFactor: 4, assetName: 'hill', groundHeight: ground.getHeight()});
          hill.setAlpha(0.5);
          hill.addToStage(scope.stage);
          hill2 = new Hill({width:w, height:h, scaleFactor: 3, assetName: 'hill2', groundHeight: ground.getHeight()});
          hill2.addToStage(scope.stage);

          husband = new Husband({characterAssetName: 'husband', y: 200});
          husband.addToStage(scope.stage);

          createjs.Ticker.timingMode = createjs.Ticker.RAF;

          // decide Derection of touchEvent/mouseEvent
          decideEventDirection();

          // First Rendering
          scope.stage.update();
        }

        function tick(event) {
          if (direction == 'left' && distance == 1) {
            createjs.Ticker.removeEventListener("tick", tick);
          }

          changeCharacterDirection();

          checkDistance();

          var deltaS = event.delta / 1000;
          var plusMinus = (direction == 'right' ? -1 : 1);

          // move Ground
          var groundMove = plusMinus * (deltaS * 150);
          if (move){
            ground.setX((ground.getX() + groundMove) % ground.getTileWidth());
          }

          // move Hill
          var hill1Move = plusMinus * (deltaS * 30);
          var hill2Move = plusMinus * (deltaS * 45);
          hill.move(hill1Move, 0);
          if (hill.getX() + hill.getImageWidth() * hill.getScaleX() <= 0) {
            hill.setX(w);
          }
          hill2.move(hill2Move, 0);
          if (hill2.getX() + hill2.getImageWidth() * hill2.getScaleX() <= 0) {
            hill2.setX(w);
          }

          scope.stage.update(event);
        }

        function changeCharacterDirection() {
          if (direction == 'left' && husband.getAnimationStatus() == 'right') {
            husband.playAnimation('left');
          }
          if (direction == 'right' && husband.getAnimationStatus() == 'left') {
            husband.playAnimation('right');
          }
        }

        function checkDistance() {
          if (distanceCountFlag) {
            distanceCountFlag = false;
            setTimeout(function() {
              distance += (direction == 'left') ? (distance > 0 ? -1 : 0) : 1;
              console.log('distance: ' + distance);
              distanceCountFlag = true;
            }, 200);
          }
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
            if (direction == 'right' || (direction == 'left' && distance > 0)) {
              createjs.Ticker.addEventListener("tick", tick);
            }
          }
          function touchend(event) {
            move = false;
            createjs.Ticker.removeEventListener("tick", tick);
          }
          function touchmove(event) {
            direction = selectDirection(event);
            if (distance == 0 && direction == 'left') {
              createjs.Ticker.removeEventListener("tick", tick);
            }
          }
          function selectDirection(event) {
            locationX = event.offsetX ? event.offsetX : event.touches[0].clientX;
            return locationX > 100 ? 'right' : 'left';
          }
        }

      }
    };
  }]);
