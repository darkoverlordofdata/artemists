var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var example;
(function (example) {
    var components;
    (function (components) {
        var PooledComponent = artemis.PooledComponent;
        var Pooled = artemis.annotations.Pooled;
        var Velocity = (function (_super) {
            __extends(Velocity, _super);
            function Velocity() {
                _super.apply(this, arguments);
            }
            Velocity.prototype.initialize = function (vectorX, vectorY) {
                if (vectorX === void 0) { vectorX = 0; }
                if (vectorY === void 0) { vectorY = 0; }
                this.vectorX = vectorX;
                this.vectorY = vectorY;
            };
            Velocity.className = 'Velocity';
            Velocity = __decorate([
                Pooled()
            ], Velocity);
            return Velocity;
        })(PooledComponent);
        components.Velocity = Velocity;
        Velocity.prototype.vectorX = 0;
        Velocity.prototype.vectorY = 0;
    })(components = example.components || (example.components = {}));
})(example || (example = {}));
//# sourceMappingURL=Velocity.js.map