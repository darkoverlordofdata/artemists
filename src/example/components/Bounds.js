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
        var Bounds = (function (_super) {
            __extends(Bounds, _super);
            function Bounds() {
                _super.apply(this, arguments);
            }
            Bounds.className = 'Bounds';
            return Bounds;
        })(Component);
        components.Bounds = Bounds;
        Bounds.prototype.radius = 0;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Bounds.js.map