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
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var SoundEffect = brokenspork.components.SoundEffect;
        var EFFECT = brokenspork.components.EFFECT;
        var Aspect = artemis.Aspect;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Mapper = artemis.annotations.Mapper;
        // import  = badlogic.gdx.Gdx;
        // import  = badlogic.gdx.audio.Sound;
        var SoundEffectSystem = (function (_super) {
            __extends(SoundEffectSystem, _super);
            //@SuppressWarnings("unchecked")
            function SoundEffectSystem() {
                _super.call(this, Aspect.getAspectForAll(SoundEffect));
            }
            // pew:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/pew.wav"));
            // asplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/asplode.wav"));
            // smallasplode:Sound = Gdx.audio.newSound(Gdx.files.internal("sounds/smallasplode.wav"));
            SoundEffectSystem.prototype.initialize = function () {
            };
            SoundEffectSystem.prototype.process = function (e) {
                var soundEffect = this.se.get(e);
                switch (soundEffect.effect) {
                    case EFFECT.PEW:
                        //pew.play();
                        break;
                    case EFFECT.ASPLODE:
                        //asplode.play();
                        break;
                    case EFFECT.SMALLASPLODE:
                        //smallasplode.play();
                        break;
                    default:
                        break;
                }
                e.removeComponentInstance(soundEffect);
                e.changedInWorld();
            };
            __decorate([
                Mapper
            ], SoundEffectSystem.prototype, "SoundEffect");
            return SoundEffectSystem;
        })(EntityProcessingSystem);
        systems.SoundEffectSystem = SoundEffectSystem;
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SoundEffectSystem.js.map