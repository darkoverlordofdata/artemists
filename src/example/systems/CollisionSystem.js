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
        var Bag = artemis.utils.Bag;
        var Bounds = brokenspork.components.Bounds;
        var Expires = brokenspork.components.Expires;
        var Health = brokenspork.components.Health;
        var Position = brokenspork.components.Position;
        var Constants = brokenspork.core.Constants;
        var EntityFactory = brokenspork.core.EntityFactory;
        var Mapper = artemis.annotations.Mapper;
        var EntitySystem = artemis.EntitySystem;
        var Aspect = artemis.Aspect;
        var GroupManager = artemis.managers.GroupManager;
        var CollisionSystem = (function (_super) {
            __extends(CollisionSystem, _super);
            function CollisionSystem(game) {
                _super.call(this, Aspect.getAspectForAll(Position, Bounds));
                this.game = game;
            }
            CollisionSystem.prototype.initialize = function () {
                var self = this;
                this.collisionPairs = new Bag();
                this.collisionPairs.add(new CollisionPair(this, Constants.Groups.PLAYER_BULLETS, Constants.Groups.ENEMY_SHIPS, {
                    handleCollision: function (bullet, ship) {
                        var bp = self.pm.get(bullet);
                        EntityFactory.createSmallExplosion(self.game, self.world, bp.x, bp.y).addToWorld();
                        for (var i = 0; 4 > i; i++)
                            EntityFactory.createParticle(self.game, self.world, bp.x, bp.y).addToWorld();
                        //TODO: calling bullet.deleteFromWorld() was causing null pointer exceptions in ExpiringSystem and CollisionStstem because it did not exist anymore. 
                        //TODO: This did not happen in vanilla artemis.
                        //TODO: is this a Is this a bug in artemis-odb's DelayedEntityProcessingSystem?
                        bullet.deleteFromWorld();
                        //Expires bulletExpires = ex.get(bullet);
                        //if(bulletExpires != null) {
                        //    bulletExpires.delay = -1;
                        //}
                        var health = self.hm.get(ship);
                        var position = self.pm.get(ship);
                        health.health -= 1;
                        if (health.health < 0) {
                            health.health = 0;
                            ship.deleteFromWorld();
                            EntityFactory.createBigExplosion(self.game, self.world, position.x, position.y).addToWorld();
                        }
                    }
                }));
            };
            CollisionSystem.prototype.processEntities = function (entities) {
                for (var i = 0; this.collisionPairs.size() > i; i++) {
                    this.collisionPairs.get(i).checkForCollisions();
                }
            };
            CollisionSystem.prototype.checkProcessing = function () {
                return true;
            };
            __decorate([
                Mapper(Position)
            ], CollisionSystem.prototype, "pm");
            __decorate([
                Mapper(Bounds)
            ], CollisionSystem.prototype, "bm");
            __decorate([
                Mapper(Health)
            ], CollisionSystem.prototype, "hm");
            __decorate([
                Mapper(Expires)
            ], CollisionSystem.prototype, "ex");
            return CollisionSystem;
        })(EntitySystem);
        systems.CollisionSystem = CollisionSystem;
        var CollisionPair = (function () {
            function CollisionPair(cs, group1, group2, handler) {
                this.groupEntitiesA = cs.world.getManager(GroupManager).getEntities(group1);
                this.groupEntitiesB = cs.world.getManager(GroupManager).getEntities(group2);
                this.handler = handler;
                this.cs = cs;
            }
            CollisionPair.prototype.checkForCollisions = function () {
                for (var a = 0; this.groupEntitiesA.size() > a; a++) {
                    for (var b = 0; this.groupEntitiesB.size() > b; b++) {
                        var entityA = this.groupEntitiesA.get(a);
                        var entityB = this.groupEntitiesB.get(b);
                        if (this.collisionExists(entityA, entityB)) {
                            this.handler.handleCollision(entityA, entityB);
                        }
                    }
                }
            };
            CollisionPair.prototype.collisionExists = function (e1, e2) {
                if (e1 == null || e2 == null) {
                    return false;
                }
                //NPE!!!
                var p1 = this.cs.pm.get(e1);
                var p2 = this.cs.pm.get(e2);
                var b1 = this.cs.bm.get(e1);
                var b2 = this.cs.bm.get(e2);
                var a = p1.x - p2.x;
                var b = p1.y - p2.y;
                return Math.sqrt(a * a + b * b) - b1.radius < b2.radius;
                //return Utils.distance(p1.x, p1.y, p2.x, p2.y)-b1.radius < b2.radius;
            };
            return CollisionPair;
        })();
    })(systems = brokenspork.systems || (brokenspork.systems = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=CollisionSystem.js.map