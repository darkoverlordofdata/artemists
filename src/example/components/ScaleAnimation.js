var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var example;
(function (example) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var ScaleAnimation = (function (_super) {
            __extends(ScaleAnimation, _super);
            function ScaleAnimation() {
                _super.apply(this, arguments);
            }
            ScaleAnimation.prototype.initialize = function (lambda) {
                if (lambda !== undefined) {
                    lambda(this);
                }
            };
            ScaleAnimation.className = 'ScaleAnimation';
            return ScaleAnimation;
        })(Component);
        components.ScaleAnimation = ScaleAnimation;
        ScaleAnimation.prototype.min = 0;
        ScaleAnimation.prototype.max = 0;
        ScaleAnimation.prototype.speed = 0;
        ScaleAnimation.prototype.repeat = false;
        ScaleAnimation.prototype.active = false;
    })(components = example.components || (example.components = {}));
})(example || (example = {}));
//# sourceMappingURL=ScaleAnimation.js.map