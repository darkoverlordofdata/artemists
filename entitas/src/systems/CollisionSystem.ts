module shmup {

  const Tau = Math.PI*2;
  declare var viewContainer;

  import Text = PIXI.Text;
  import Rnd = bosco.utils.Rnd;
  import Layer = shmup.Layer;
  import Groups = shmup.Groups;
  import Entity = artemis.Entity;
  import ImmutableBag = artemis.utils.ImmutableBag;
  import GroupManager = artemis.managers.GroupManager;
  import VoidEntitySystem = artemis.systems.VoidEntitySystem;

  import EnemyComponent = artemis.components.EnemyComponent;
  import BulletComponent = artemis.components.BulletComponent;
  import HealthComponent = artemis.components.HealthComponent;
  import PositionComponent = artemis.components.PositionComponent;
  import BoundsComponent = artemis.components.BoundsComponent;
  import ScoreComponent = artemis.components.ScoreComponent;

  export class CollisionSystem extends VoidEntitySystem {
    private collisionPairs:Array<CollisionPair>;
    public label:Text;

    /**
     * Check for Collision
     */
    public processSystem() {
      var collisionPairs = this.collisionPairs;
      for (var i = 0, l = collisionPairs.length; l > i; i++) {
        collisionPairs[i].checkForCollisions();
      }
    }

    /**
     * Create collision handlers
     */
    public initialize() {

      this.label = new Text('Score', { font: 'bold 50px Arial', fill: 'white' });
      this.label.position.set((bosco.config.width - this.label.width) / 2, 10);
      viewContainer.addChild(this.label);
      this.world.setScore(0);
      /** Check for bullets hitting enemy ship */
      this.collisionPairs = [];
      this.collisionPairs.push(new CollisionPair(this, Groups.PLAYER_BULLETS, Groups.ENEMY_SHIPS, {

        handleCollision: (bullet:Entity, ship:Entity) => {
          var bp:PositionComponent = bullet.position;
          var health:HealthComponent = ship.health;
          var position:PositionComponent = ship.position;
          var x = bp.x;
          var y = bp.y;

          this.explode("small", .1, x, y);
          var i = 5;
          while (--i > 0) this.hit(x, y);

          bullet.isDestroy = true;
          health.health -= 1;
          if (health.health < 0) {
            this.world.score.value += health.maximumHealth;
            this.label.text = 'Score '+this.world.score.value;
            ship.isDestroy = true;
            this.explode("big", 0.5, position.x, position.y);
          }
        }
      }));
    }

    /**
     * Create an explosion
     * @param name
     * @param size
     * @param x
     * @param y
     */
    protected explode(name:string, size:number, x:number, y:number)  {
      this.world.createEntity(name)
        .addResource("explosion")
        .addLayer(Layer.PARTICLES)
        .addExpires(0.5)
        .addScale(size, size)
        .addScaleAnimation(size, size/100, -3, false, true)
        .addTint(0xffd80080)
        .addPosition(~~x, ~~y)
        .setAddView(true)
        .start();
    }

    /**
     * Bullet hit - create some shrapnel
     * @param x
     * @param y
     */
    protected hit(x:number, y:number) {
      var radians:number = Math.random()*Tau;
      var magnitude:number = Rnd.random(200);
      var velocityX = magnitude * Math.cos(radians);
      var velocityY = magnitude * Math.sin(radians);
      var scale = Rnd.random(0.5, 1);

      this.world.createEntity("particle")
        .setParticle(true)
        .addResource("particle")
        .addLayer(Layer.PARTICLES)
        .addExpires(.5)
        .addTint(0xffd800ff)
        .addScale(scale, scale)
        .addVelocity(velocityX, velocityY)
        .addPosition(x, y)
        .setAddView(true)
        .start();
    }

  }

  class CollisionPair {
    private groupEntitiesA:ImmutableBag<Entity>;
    private groupEntitiesB:ImmutableBag<Entity>;
    private handler:CollisionHandler;
    private cs:CollisionSystem;

    constructor(cs:CollisionSystem, group1:Groups, group2:Groups, handler:CollisionHandler) {
      this.groupEntitiesA = cs.world.getManager<GroupManager>(GroupManager).getEntities(group1);
      this.groupEntitiesB = cs.world.getManager<GroupManager>(GroupManager).getEntities(group2);
      this.handler = handler;
      this.cs = cs;
    }

    public checkForCollisions() {
      for(var a = 0; this.groupEntitiesA.size() > a; a++) {
        for(var b = 0; this.groupEntitiesB.size() > b; b++) {
          var entityA:Entity = this.groupEntitiesA.get(a);
          var entityB:Entity = this.groupEntitiesB.get(b);
          if(this.collisionExists(entityA, entityB)) {
            this.handler.handleCollision(entityA, entityB);
          }
        }
      }
    }

    private collisionExists(e1:Entity, e2:Entity):boolean {

      if(e1 === null || e2 === null) return false;

      //NPE!!!
      var p1:PositionComponent = e1.position;
      var p2:PositionComponent = e2.position;

      var b1:BoundsComponent = e1.bounds;
      var b2:BoundsComponent = e2.bounds;

      var a = p1.x - p2.x;
      var b = p1.y - p2.y;
      return Math.sqrt(a * a + b * b) - (b1.radius) < (b2.radius);
    }
  }

  interface CollisionHandler {
    handleCollision(a:Entity, b:Entity);
  }

}