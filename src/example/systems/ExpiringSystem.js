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
    var systems;
    (function (systems) {
        var Expires = example.components.Expires;
        var Aspect = artemis.Aspect;
        var DelayedEntityProcessingSystem = artemis.systems.DelayedEntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        var ExpiringSystem = (function (_super) {
            __extends(ExpiringSystem, _super);
            function ExpiringSystem() {
                _super.call(this, Aspect.getAspectForAll(Expires));
            }
            ExpiringSystem.prototype.processDelta = function (e, accumulatedDelta) {
                var expires = this.em.get(e);
                expires.delay -= accumulatedDelta;
            };
            ExpiringSystem.prototype.processExpired = function (e) {
                e.deleteFromWorld();
            };
            ExpiringSystem.prototype.getRemainingDelay = function (e) {
                var expires = this.em.get(e);
                return expires.delay;
            };
            __decorate([
                Mapper(Expires)
            ], ExpiringSystem.prototype, "em");
            return ExpiringSystem;
        })(DelayedEntityProcessingSystem);
        systems.ExpiringSystem = ExpiringSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=ExpiringSystem.js.map