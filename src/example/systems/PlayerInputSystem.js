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
        var Player = example.components.Player;
        var Position = example.components.Position;
        var Velocity = example.components.Velocity;
        var Aspect = artemis.Aspect;
        var Mapper = artemis.annotations.Mapper;
        var EntityProcessingSystem = artemis.systems.EntityProcessingSystem;
        var Constants = example.core.Constants;
        var PlayerInputSystem = (function (_super) {
            __extends(PlayerInputSystem, _super);
            function PlayerInputSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Velocity, Player));
                this.timeToFire = 0;
                this.game = game;
            }
            PlayerInputSystem.prototype.initialize = function () {
                var _this = this;
                var listener = cc.EventListener.create({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: function (touch, event) {
                        _this.shoot = true;
                        _this.mouseVector = touch.getLocation();
                        return true;
                    },
                    onTouchMoved: function (touch, event) {
                        _this.shoot = true;
                        _this.mouseVector = touch.getLocation();
                        return true;
                    },
                    onTouchEnded: function (touch, event) {
                        _this.shoot = false;
                        _this.mouseVector = touch.getLocation();
                    }
                });
                cc.eventManager.addListener(listener, this.game);
            };
            PlayerInputSystem.prototype.processEach = function (e) {
                if (this.mouseVector === undefined)
                    return;
                var position = this.pm.get(e);
                var velocity = this.vm.get(e);
                var destinationX = this.mouseVector.x;
                var destinationY = this.mouseVector.y;
                if (destinationX === undefined || destinationY === undefined)
                    return;
                position.x = this.mouseVector.x / 2;
                position.y = Constants.FRAME_HEIGHT - this.mouseVector.y;
                if (this.shoot) {
                    if (this.timeToFire <= 0) {
                        this.world.createEntityFromTemplate('bullet', position.x - 27, position.y + 2).addToWorld();
                        this.world.createEntityFromTemplate('bullet', position.x + 27, position.y + 2).addToWorld();
                        this.timeToFire = PlayerInputSystem.FireRate;
                    }
                }
                if (this.timeToFire > 0) {
                    this.timeToFire -= this.world.delta;
                    if (this.timeToFire < 0) {
                        this.timeToFire = 0;
                    }
                }
            };
            PlayerInputSystem.FireRate = 0.1;
            __decorate([
                Mapper(Position)
            ], PlayerInputSystem.prototype, "pm");
            __decorate([
                Mapper(Velocity)
            ], PlayerInputSystem.prototype, "vm");
            return PlayerInputSystem;
        })(EntityProcessingSystem);
        systems.PlayerInputSystem = PlayerInputSystem;
    })(systems = example.systems || (example.systems = {}));
})(example || (example = {}));
//# sourceMappingURL=PlayerInputSystem.js.map