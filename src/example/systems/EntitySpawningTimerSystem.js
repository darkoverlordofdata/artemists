var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var example;
(function (example) {
    var systems;
    (function (systems) {
        var MathUtils = artemis.utils.MathUtils;
        var Layer = example.components.Layer;
        var Constants = example.core.Constants;
        var VoidEntitySystem = artemis.systems.VoidEntitySystem;
        var Timer = artemis.utils.Timer;
        var EntitySpawningTimerSystem = (function (_super) {
            __extends(EntitySpawningTimerSystem, _super);
            function EntitySpawningTimerSystem(game) {
                var _this = this;
                _super.call(this);
                this.game = game;
                this.timer1 = new Timer(2, true);
                this.timer1.execute = function () {
                    _this.world.createEntityFromTemplate('enemy', "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20).addToWorld();
                    //EntityFactory.createEnemyShip(this.game, this.world, "enemy1", Layer.ACTORS_3, 10, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 200, 0, -40, 20).addToWorld();
                };
                this.timer2 = new Timer(6, true);
                this.timer2.execute = function () {
                    _this.world.createEntityFromTemplate('enemy', "enemy2", Layer.ACTORS_2, 20, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 100, 0, -30, 40).addToWorld();
                    //EntityFactory.createEnemyShip(this.game, this.world, "enemy2", Layer.ACTORS_2, 20, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 100, 0, -30, 40).addToWorld();
                };
                this.timer3 = new Timer(12, true);
                this.timer3.execute = function () {
                    _this.world.createEntityFromTemplate('enemy', "enemy3", Layer.ACTORS_1, 60, MathUtils.nextInt(Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 - 50, 0, -20, 70).addToWorld();
                    //EntityFactory.createEnemyShip(this.game, this.world, "enemy3", Layer.ACTORS_1, 60, MathUtils.nextInt(Constants.FRAME_WIDTH/2), Constants.FRAME_HEIGHT / 2 - 50, 0, -20, 70).addToWorld();
                };
            }
            EntitySpawningTimerSystem.prototype.processSystem = function () {
                this.timer1.update(this.world.delta);
                this.timer2.update(this.world.delta);
                this.timer3.update(this.world.delta);
            };
            return EntitySpawningTimerSystem;
        })(VoidEntitySystem);
        systems.EntitySpawningTimerSystem = EntitySpawningTimerSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=EntitySpawningTimerSystem.js.map