var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var ColorAnimation = (function (_super) {
            __extends(ColorAnimation, _super);
            function ColorAnimation() {
                _super.apply(this, arguments);
            }
            ColorAnimation.className = 'ColorAnimation';
            return ColorAnimation;
        })(Component);
        components.ColorAnimation = ColorAnimation;
        ColorAnimation.prototype.redMin = 0;
        ColorAnimation.prototype.redMax = 0;
        ColorAnimation.prototype.redSpeed = 0;
        ColorAnimation.prototype.redAnimate = false;
        ColorAnimation.prototype.greenMin = 0;
        ColorAnimation.prototype.greenMax = 0;
        ColorAnimation.prototype.greenSpeed = 0;
        ColorAnimation.prototype.greenAnimate = false;
        ColorAnimation.prototype.blueMin = 0;
        ColorAnimation.prototype.blueMax = 0;
        ColorAnimation.prototype.blueSpeed = 0;
        ColorAnimation.prototype.blueAnimate = false;
        ColorAnimation.prototype.alphaMin = 0;
        ColorAnimation.prototype.alphaMax = 0;
        ColorAnimation.prototype.alphaSpeed = 0;
        ColorAnimation.prototype.alphaAnimate = false;
        ColorAnimation.prototype.repeat = false;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ColorAnimation.js.map