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
            function SpaceshipWarrior() {
                _super.apply(this, arguments);
            }
            //@Override
            SpaceshipWarrior.prototype.create = function () {
                this.gameScreen = new core.GameScreen(this);
                //setScreen(gameScreen);
            };
            return SpaceshipWarrior;
        })(Game);
        core.SpaceshipWarrior = SpaceshipWarrior;
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=SpaceshipWarrior.js.map