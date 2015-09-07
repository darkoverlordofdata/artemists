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
        (function (EFFECT) {
            EFFECT[EFFECT["PEW"] = 0] = "PEW";
            EFFECT[EFFECT["ASPLODE"] = 1] = "ASPLODE";
            EFFECT[EFFECT["SMALLASPLODE"] = 2] = "SMALLASPLODE";
        })(components.EFFECT || (components.EFFECT = {}));
        var EFFECT = components.EFFECT;
        var SoundEffect = (function (_super) {
            __extends(SoundEffect, _super);
            function SoundEffect() {
                _super.apply(this, arguments);
            }
            SoundEffect.prototype.initialize = function (effect) {
                if (effect === void 0) { effect = EFFECT.PEW; }
                this.effect = effect;
            };
            SoundEffect.className = 'SoundEffect';
            SoundEffect = __decorate([
                Pooled()
            ], SoundEffect);
            return SoundEffect;
        })(PooledComponent);
        components.SoundEffect = SoundEffect;
        SoundEffect.prototype.effect = EFFECT.PEW;
    })(components = example.components || (example.components = {}));
})(example || (example = {}));
//# sourceMappingURL=SoundEffect.js.map