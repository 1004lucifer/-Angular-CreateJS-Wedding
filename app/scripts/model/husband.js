/**
 * Created by 1004lucifer on 16. 3. 22.
 */

angular.module('weddingApp')
  .factory("Husband", ['loaderSvc', function (loaderSvc) {
  function Character(obj) {
    var spriteSheet = new createjs.SpriteSheet({
      framerate: 8,
      "images": [loaderSvc.getResult(obj.characterAssetName)],
      "frames": {"width": 108, "height": 140, "count": 16},
      "animations": {
        "right": [0, 7, "right", 1.3],
        "left": [8, 15, "left", 1.3]
      }
    });
    this.grant = new createjs.Sprite(spriteSheet, "right");
    this.grant.x = 50;
    this.grant.y = obj.y;
    this.animationStatus = 'right';

  }
  Character.prototype = {
    addToStage: function (stage) {
      stage.addChild(this.grant);
    },
    removeFromStage: function (stage) {
      stage.removeChild(this.grant);
    },
    getWidth: function () {
      return this.grant.getBounds().width * this.grant.scaleX;
    },
    getX: function () {
      return this.grant.x;
    },
    setX: function (val) {
      this.grant.x =  val;
    },
    playAnimation: function (animation) {
      this.animationStatus = animation;
      this.grant.gotoAndPlay(animation);
    },
    getAnimationStatus: function() {
      return this.animationStatus;
    }
  };
  return (Character);
}
]);
