module example.systems {
	
	import Bag = artemis.utils.Bag;
	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
  import Layer = example.components.Layer;
  import EFFECT = example.components.EFFECT;
  import MathUtils = artemis.utils.MathUtils;
	import Constants = example.core.Constants;
	import EntitySystem = artemis.EntitySystem;
	import ImmutableBag = artemis.utils.ImmutableBag;
	import GroupManager = artemis.managers.GroupManager;
	import BoundsComponent = artemis.components.BoundsComponent;
	import ColorAnimationComponent = artemis.components.ColorAnimationComponent;
	import ExpiresComponent = artemis.components.ExpiresComponent;
	import HealthComponent = artemis.components.HealthComponent;
	import ParallaxStarComponent = artemis.components.ParallaxStarComponent;
	import PlayerComponent = artemis.components.PlayerComponent;
	import PositionComponent = artemis.components.PositionComponent;
	import ScaleAnimationComponent = artemis.components.ScaleAnimationComponent;
	import SoundEffectComponent = artemis.components.SoundEffectComponent;
	import SpriteComponent = artemis.components.SpriteComponent;
	import VelocityComponent = artemis.components.VelocityComponent;

	export class CollisionSystem extends EntitySystem {
		private collisionPairs:Bag<CollisionPair>;
		private sprites:PIXI.Container;
	
		constructor(sprites:PIXI.Container) {
			super(Aspect.getAspectForAll(PositionComponent, BoundsComponent));
			this.sprites = sprites;
		}
	
		
		public initialize() {

			this.collisionPairs = new Bag<CollisionPair>();
			this.collisionPairs.add(new CollisionPair(this, Constants.Groups.PLAYER_BULLETS, Constants.Groups.ENEMY_SHIPS,
				{
				
				handleCollision: (bullet:Entity, ship:Entity) => {
					var bp:PositionComponent = bullet.position;
          this.smallExplosion(bp.x, bp.y);
					for(var i = 0; 4 > i; i++) {
            this.particle(bp.x, bp.y);
          }

					bullet.deleteFromWorld();
					var health:HealthComponent = ship.health;
					var position:PositionComponent = ship.position;
					health.health -= 1;
					if(health.health < 0) {
						health.health = 0;
						ship.deleteFromWorld();
            this.bigExplosion(position.x, position.y);
					}
				}
			}));
		}
		
		protected particle(x:number, y:number) {
      var radians:number = MathUtils.random(2*Math.PI);
      var magnitude:number = MathUtils.random(400);
      var velocityX = magnitude * Math.cos(radians);
      var velocityY = magnitude * Math.sin(radians);
      var scale = MathUtils.random(0.5, 1);

      var options = {
        scale: {x:scale, y:scale},
        position: {x:~~x, y:~~y}
      };

      this.world.createEntity("Particle")
        .addPosition(~~x, ~~y)
        .addVelocity(velocityX, velocityY)
        .addExpires(1)
        .addColorAnimation(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, false, false, false, true, true)
        .addSprite(Layer.PARTICLES, bosco.prefab('particle', this.sprites, options))
        .start();
    }

    protected bigExplosion(x:number, y:number) {
      this.explosion(x, y, 0.5)
        .addSoundEffect(EFFECT.ASPLODE)
        .start();
    }
    protected smallExplosion(x:number, y:number) {
      this.explosion(x, y, 0.1)
        .addSoundEffect(EFFECT.SMALLASPLODE)
        .start();
    }

    protected explosion(x:number, y:number, scale:number):Entity {

      var options = {
        scale: {x:scale, y:scale},
        position: {x:~~x, y:~~y}
      };
      return this.world.createEntity('Explosion')
        .addPosition(~~x, ~~y)
        .addExpires(0.5)
        .addScaleAnimation(scale/100, scale, -3, false, true)
        .addSprite(Layer.PARTICLES, bosco.prefab('explosion', this.sprites, options));
    }

		protected processEntities(entities:ImmutableBag<Entity>) {
			for(var i = 0; this.collisionPairs.size() > i; i++) {
				this.collisionPairs.get(i).checkForCollisions();
			}
		}
	

		protected checkProcessing():boolean {
			return true;
		}
	}

	class CollisionPair {
		private groupEntitiesA:ImmutableBag<Entity>;
		private groupEntitiesB:ImmutableBag<Entity>;
		private handler:CollisionHandler;

		constructor(cs:CollisionSystem, group1:string, group2:string, handler:CollisionHandler) {
			this.groupEntitiesA = cs.world.getManager<GroupManager>(GroupManager).getEntities(group1);
			this.groupEntitiesB = cs.world.getManager<GroupManager>(GroupManager).getEntities(group2);
			this.handler = handler;
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
			return Math.sqrt(a*a+b*b)-(b1.radius/window.devicePixelRatio) < (b2.radius/window.devicePixelRatio);
		}
	}
	
	interface CollisionHandler {
		handleCollision(a:Entity, b:Entity);
	}
}

