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
        var Health = (function (_super) {
            __extends(Health, _super);
            function Health() {
                _super.apply(this, arguments);
            }
            Health.prototype.initialize = function (health, maximumHealth) {
                if (health === void 0) { health = 0; }
                if (maximumHealth === void 0) { maximumHealth = 0; }
                this.health = health;
                this.maximumHealth = maximumHealth;
            };
            Health.className = 'Health';
            return Health;
        })(Component);
        components.Health = Health;
        Health.prototype.health = 0;
        Health.prototype.maximumHealth = 0;
    })(components = example.components || (example.components = {}));
})(example || (example = {}));
//# sourceMappingURL=Health.js.map