var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var systems;
    (function (systems) {
        var MathUtils = artemis.utils.MathUtils;
        var Layer = brokenspork.components.Layer;
        var Constants = brokenspork.core.Constants;
        var EntityFactory = brokenspork.core.EntityFactory;
        var Timer = artemis.utils.Timer;
        // import com.artemis.systems.VoidEntitySystem;
        // import com.artemis.utils.Timer;
        // import com.badlogic.gdx.math.MathUtils;
        var EntitySpawningTimerSystem = (function (_super) {
            __extends(EntitySpawningTimerSystem, _super);
            function EntitySpawningTimerSystem() {
                _super.call(this);
                var world = this.world;
                this.timer1 = new Timer(2, true);
                this.timer1.execute = function () {
                    EntityFactory.createEnemyShip(world, "enemy1", Layer.ACTORS_3, 10, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 50, 0, -40, 20).addToWorld();
                };
                this.timer2 = new Timer(6, true);
                this.timer2.execute = function () {
                    EntityFactory.createEnemyShip(world, "enemy2", Layer.ACTORS_2, 20, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 100, 0, -30, 40).addToWorld();
                };
                this.timer3 = new Timer(12, true);
                this.timer3.execute = function () {
                    EntityFactory.createEnemyShip(world, "enemy3", Layer.ACTORS_1, 60, MathUtils.random(-Constants.FRAME_WIDTH / 2, Constants.FRAME_WIDTH / 2), Constants.FRAME_HEIGHT / 2 + 200, 0, -20, 70).addToWorld();
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
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=EntitySpawningTimerSystem.js.map