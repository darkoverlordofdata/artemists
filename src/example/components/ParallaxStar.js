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
        var ParallaxStar = (function (_super) {
            __extends(ParallaxStar, _super);
            function ParallaxStar() {
                _super.apply(this, arguments);
            }
            ParallaxStar.className = 'ParallaxStar';
            return ParallaxStar;
        })(Component);
        components.ParallaxStar = ParallaxStar;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=ParallaxStar.js.map