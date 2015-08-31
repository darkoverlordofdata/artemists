var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var core;
    (function (core) {
        var SpaceshipWarrior = (function (_super) {
            __extends(SpaceshipWarrior, _super);
            /**
             *
             * @constructor
             * @extends {cc.Layer}
             * @param {cc.Scene} scene
             */
            function SpaceshipWarrior(scene) {
                _super.call(this);
                this.scene = scene;
                return new (cc.Layer.extend(this));
            }
            /**
              * Start the menu
              * @return {cc.Scene} the menu scene
              */
            SpaceshipWarrior.start = function () {
                var scene = new cc.Scene();
                scene.addChild(new SpaceshipWarrior(scene));
                return scene;
            };
            SpaceshipWarrior.prototype.ctor = function () {
                this._super();
                this.gameScreen = new core.GameScreen(this);
                //setScreen(gameScreen);
                this.scheduleUpdate();
            };
            SpaceshipWarrior.prototype.update = function (time) {
                this.gameScreen.render(time);
            };
            return SpaceshipWarrior;
        })(CCLayer);
        core.SpaceshipWarrior = SpaceshipWarrior;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpaceshipWarrior.js.map