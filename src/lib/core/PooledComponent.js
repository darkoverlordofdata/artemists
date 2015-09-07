var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    /**
     * Component type that recycles instances.
     * <p>
     * Expects no <code>final</code> fields.
     */
    var PooledComponent = (function (_super) {
        __extends(PooledComponent, _super);
        function PooledComponent() {
            _super.apply(this, arguments);
        }
        PooledComponent.prototype.reset = function () { };
        return PooledComponent;
    })(artemis.Component);
    artemis.PooledComponent = PooledComponent;
})(artemis || (artemis = {}));
//# sourceMappingURL=PooledComponent.js.map