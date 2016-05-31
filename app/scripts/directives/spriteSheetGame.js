'use strict';

/**
 * @ngdoc directive
 * @name weddingApp.directive:spriteSheetGame
 * @description
 * # spriteSheetGame
 */
angular.module('weddingApp')
  .directive('spriteSheetGame', ['loaderSvc', 'Ground', 'Sky', 'Hill', 'Background', 'Frame', 'Character', 'Husband', function (loaderSvc, Ground, Sky, Hill, Background, Frame, Character, Husband) {
    return {
      template: '<canvas></canvas>',
      replace: true,
      restrict: 'E',
      scope: {
        width: '=width',
        height: '=height'
      },
      link: function postLink(scope, element, attrs) {
        var w, h, husband, sky, ground, hill, hill2,
          picture = [],
          frame = [],
          character = [],

          speed = 700,        // running speed

          frameDis = 600,     // Picture Frame Distance
          characterDis = 50,  // Picture Character Distance

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
          loaderSvc.getLoader2().addEventListener("complete", handleComplete2); // picture, character load
          loaderSvc.getLoader3().addEventListener("complete", handleComplete3); // picture, character load (etc)
          loaderSvc.loadAssets();
        }

        function handleComplete() {
          loaderSvc.loadAssets2();  // parallel images download

          sky = new Sky({width:w, height:h});
          sky.addToStage(scope.stage);

          ground = new Ground({width:w, height:h});
          ground.addToStage(scope.stage);

          hill = new Hill({width:w, height:h, scaleFactor: 4, assetName: 'hill', groundHeight: ground.getHeight()});
          hill.setAlpha(0.5);
          hill.addToStage(scope.stage);
          hill2 = new Hill({width:w, height:h, scaleFactor: 3, assetName: 'hill2', groundHeight: ground.getHeight()});
          hill2.addToStage(scope.stage);


          // add Character, Picture
          frame[0] = new Frame({width:w + frameDis, height:h, scaleFactor: 1, assetName: 'wife', groundHeight: ground.getHeight()});
          frame[0].addToStage(scope.stage);
          picture[0] = new Background({width:w + frameDis, height:h, scaleFactor: 1, assetName: 'wife', groundHeight: ground.getHeight()});
          picture[0].addToStage(scope.stage);
          character[0] = new Character({width:w, height:h, scaleFactor: 1, assetName: 'school', groundHeight: ground.getHeight()});
          character[0].addToStage(scope.stage);

          husband = new Husband({characterAssetName: 'husband', y: 200});
          husband.addToStage(scope.stage);

          createjs.Ticker.timingMode = createjs.Ticker.RAF;

          // decide Derection of touchEvent/mouseEvent
          decideEventDirection();

          // First Rendering
          scope.stage.update();
        }

        function handleComplete2(){
          loaderSvc.loadAssets3();  // parallel images download (etc)

          for (var i = 1; i <= 11; i++){
            frame[i] = new Frame({width:w + frameDis*(i+1), height:h, scaleFactor: 1, assetName: 'picture'+i, groundHeight: ground.getHeight()});
            frame[i].addToStage(scope.stage);
            picture[i] = new Background({width:w + frameDis*(i+1), height:h, scaleFactor: 1, assetName: 'picture'+i, groundHeight: ground.getHeight()});
            picture[i].addToStage(scope.stage);
            character[i] = new Character({width:w + frameDis*(i+1) - characterDis, height:h, scaleFactor: 1, assetName: 'friend'+i, groundHeight: ground.getHeight()});
            character[i].addToStage(scope.stage);
          }

          frame[12] = new Frame({width:w + frameDis*13, height:h, scaleFactor: 1, assetName: 'picture12', groundHeight: ground.getHeight()});
          frame[12].addToStage(scope.stage);
          picture[12] = new Background({width:w + frameDis*13, height:h, scaleFactor: 1, assetName: 'picture12', groundHeight: ground.getHeight()});
          picture[12].addToStage(scope.stage);

          // Rerendering for z-index
          husband.addToStage(scope.stage);
        }

        function handleComplete3(){

          for (var i = 13; i <= 28; i++){
            frame[i] = new Frame({width:w + frameDis*(i+1), height:h, scaleFactor: 1, assetName: 'etc'+(i-12), groundHeight: ground.getHeight()});
            frame[i].addToStage(scope.stage);
            picture[i] = new Background({width:w + frameDis*(i+1), height:h, scaleFactor: 1, assetName: 'etc'+(i-12), groundHeight: ground.getHeight()});
            picture[i].addToStage(scope.stage);
          }

          frame[29] = new Frame({width:w + frameDis*40, height:h, scaleFactor: 1, assetName: 'etc17', groundHeight: ground.getHeight()});
          frame[29].addToStage(scope.stage);
          picture[29] = new Background({width:w + frameDis*40, height:h, scaleFactor: 1, assetName: 'etc17', groundHeight: ground.getHeight()});
          picture[29].addToStage(scope.stage);

          // Rerendering for z-index
          husband.addToStage(scope.stage);
        }


        function tick(event) {
          if ((direction == 'left' && distance == 0) || (direction == 'right' && (frame[29] ? frame[29].getX() < 0 : false))) {
            createjs.Ticker.removeEventListener("tick", tick);
          }

          changeCharacterDirection();

          checkDistance();

          var deltaS = event.delta / speed;
          var plusMinus = (direction == 'right' ? -1 : 1);

          // move Ground
          var groundMove = plusMinus * (deltaS * 100);
          if (move){
            ground.setX((ground.getX() + groundMove) % ground.getTileWidth());
          }

          // move Hill
          var hill1Move = plusMinus * (deltaS * 30);
          var hill2Move = plusMinus * (deltaS * 50);
          hill.move(hill1Move, 0);
          if (hill.getX() + hill.getImageWidth() * hill.getScaleX() <= 0) {
            hill.setX(w);
          }
          hill2.move(hill2Move, 0);
          if (hill2.getX() + hill2.getImageWidth() * hill2.getScaleX() <= 0) {
            hill2.setX(w);
          }

          // move Pictire, Character
          var curMove = plusMinus * (deltaS * 100);
          for (var i = 0; i < picture.length; i++){
            picture[i].move(curMove, 0);
            frame[i].move(curMove, 0);
          }
          for (var i = 0; i < character.length; i++){
            character[i].move(curMove, 0);
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
            distance += (direction == 'left') ? (distance > 0 ? -1 : 0) : 1;
            // console.log('distance: ' + distance);
            setTimeout(function() {
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
            if ((direction == 'right' && (frame[29] ? frame[29].getX() > 0 : true)) || (direction == 'left' && distance > 0)) {
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
