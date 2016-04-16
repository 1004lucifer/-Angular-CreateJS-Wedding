angular.module('weddingApp')
  .factory("Frame", ['loaderSvc', function (loaderSvc) {
    function Frame(obj) {
      var bitmap = new createjs.Bitmap(loaderSvc.getResult(obj.assetName));
      var frameWidth = bitmap.image.width+10;
      var frameHeight = bitmap.image.height+10;
      this.Frame = new createjs.Shape();
      this.Frame.graphics
        .beginFill("white")
        .drawRect(0, 0, frameWidth, frameHeight)
        .setStrokeStyle(5)
        .beginStroke("#fff")
        .moveTo(frameWidth / 2, frameHeight)
        .lineTo(frameWidth / 2, frameHeight + 50)
        .moveTo(0, frameHeight + 50)
        .lineTo(frameWidth, frameHeight + 50)
        ;
      this.Frame.x = obj.width - 5;
      this.Frame.y = obj.height - frameHeight - obj.groundHeight - 50;
      this.Frame.shadow = new createjs.Shadow('#000', 4, 4, 10);
    }
    Frame.prototype = {
        addToStage: function (stage) {
            stage.addChild(this.Frame);
        },
        removeFromStage: function (stage) {
            stage.removeChild(this.Frame);
        },
        setAlpha: function (val) {
            this.Frame.alpha = val;
        },
        getImageWidth: function () {
            return this.Frame.image.width;
        },
        getScaleX: function () {
            return this.Frame.scaleX;
        },
        getX: function () {
            return this.Frame.x;
        },
        getY: function () {
            return this.Frame.y;
        },
        setX: function (val) {
            this.Frame.x = val;
        },
        move: function (x, y) {
            this.Frame.x = this.Frame.x + x;
            this.Frame.y = this.Frame.y + y;
        }
    };
    return (Frame);
}
]);
