angular.module('weddingApp')
  .factory("Background", ['loaderSvc', function (loaderSvc) {
    function Background(obj) {
        this.Background = new createjs.Bitmap(loaderSvc.getResult(obj.assetName));
        this.Background.setTransform(obj.width,
                               obj.height - this.Background.image.height * obj.scaleFactor - obj.groundHeight - 55,
                               obj.scaleFactor, obj.scaleFactor);
    }
    Background.prototype = {
        addToStage: function (stage) {
            stage.addChild(this.Background);
        },
        removeFromStage: function (stage) {
            stage.removeChild(this.Background);
        },
        setAlpha: function (val) {
            this.Background.alpha = val;
        },
        getImageWidth: function () {
            return this.Background.image.width;
        },
        getScaleX: function () {
            return this.Background.scaleX;
        },
        getX: function () {
            return this.Background.x;
        },
        getY: function () {
            return this.Background.y;
        },
        setX: function (val) {
            this.Background.x = val;
        },
        move: function (x, y) {
            this.Background.x = this.Background.x + x;
            this.Background.y = this.Background.y + y;
        }
    };
    return (Background);
}
]);
