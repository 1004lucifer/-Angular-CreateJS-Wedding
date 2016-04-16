angular.module('weddingApp')
  .factory("Character", ['loaderSvc', function (loaderSvc) {
    function Character(obj) {
        this.Character = new createjs.Bitmap(loaderSvc.getResult(obj.assetName));
        this.Character.setTransform(obj.width,
                               obj.height - this.Character.image.height * obj.scaleFactor - obj.groundHeight,
                               obj.scaleFactor, obj.scaleFactor);
    }
    Character.prototype = {
        addToStage: function (stage) {
            stage.addChild(this.Character);
        },
        removeFromStage: function (stage) {
            stage.removeChild(this.Character);
        },
        setAlpha: function (val) {
            this.Character.alpha = val;
        },
        getImageWidth: function () {
            return this.Character.image.width;
        },
        getScaleX: function () {
            return this.Character.scaleX;
        },
        getX: function () {
            return this.Character.x;
        },
        getY: function () {
            return this.Character.y;
        },
        setX: function (val) {
            this.Character.x = val;
        },
        move: function (x, y) {
            this.Character.x = this.Character.x + x;
            this.Character.y = this.Character.y + y;
        }
    };
    return (Character);
}
]);
