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
        "run": [0, 7, "run", 1.3],
        "back": [8, 15, "back", 1.3]
      }
    });
    this.grant = new createjs.Sprite(spriteSheet, "run");
    this.grant.x = 50;
    this.grant.y = obj.y;

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
      this.grant.gotoAndPlay(animation);
    }
  };
  return (Character);
}
]);
