angular.module('weddingApp')
  .factory("School", ['loaderSvc', function (loaderSvc) {
    function School(obj) {
        this.School = new createjs.Bitmap(loaderSvc.getResult(obj.assetName));
        this.School.setTransform(obj.width,
                               obj.height - this.School.image.height * obj.scaleFactor - obj.groundHeight,
                               obj.scaleFactor, obj.scaleFactor);
    }
    School.prototype = {
        addToStage: function (stage) {
            stage.addChild(this.School);
        },
        removeFromStage: function (stage) {
            stage.removeChild(this.School);
        },
        setAlpha: function (val) {
            this.School.alpha = val;
        },
        getImageWidth: function () {
            return this.School.image.width;
        },
        getScaleX: function () {
            return this.School.scaleX;
        },
        getX: function () {
            return this.School.x;
        },
        getY: function () {
            return this.School.y;
        },
        setX: function (val) {
            this.School.x = val;
        },
        move: function (x, y) {
            this.School.x = this.School.x + x;
            this.School.y = this.School.y + y;
        }
    };
    return (School);
}
]);
