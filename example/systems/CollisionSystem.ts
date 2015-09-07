module example.systems {
	
	import ImmutableBag = artemis.utils.ImmutableBag;
	
	import Bag = artemis.utils.Bag;
	import Bounds = example.components.Bounds;
	import ColorAnimation = example.components.ColorAnimation;
	import Expires = example.components.Expires;
	import Health = example.components.Health;
	import ParallaxStar = example.components.ParallaxStar;
	import Player = example.components.Player;
	import Position = example.components.Position;
	import ScaleAnimation = example.components.ScaleAnimation;
	import SoundEffect = example.components.SoundEffect;
	import Sprite = example.components.Sprite;
	import Velocity = example.components.Velocity;
	import Constants = example.core.Constants;
	import Mapper = artemis.annotations.Mapper;

	import EntitySystem = artemis.EntitySystem;
	import ComponentMapper = artemis.ComponentMapper;
	import Aspect = artemis.Aspect;
	import Entity = artemis.Entity;
	import GroupManager = artemis.managers.GroupManager;
	
	
	
	export class CollisionSystem extends EntitySystem {
		@Mapper(Position) pm:ComponentMapper<Position>;
		@Mapper(Bounds) bm:ComponentMapper<Bounds>;
		@Mapper(Health) hm:ComponentMapper<Health>;
		@Mapper(Expires) ex:ComponentMapper<Expires>;
		
		private collisionPairs:Bag<CollisionPair>;
		private game:CCLayer;
	
		constructor(game:CCLayer) {
			super(Aspect.getAspectForAll(Position, Bounds));
			this.game = game;
		}
	
		
		public initialize() {
			this.collisionPairs = new Bag<CollisionPair>();
			this.collisionPairs.add(new CollisionPair(this, Constants.Groups.PLAYER_BULLETS, Constants.Groups.ENEMY_SHIPS,
				{
				
				handleCollision: (bullet:Entity, ship:Entity) => {
					var bp:Position = this.pm.get(bullet);
          this.world.createEntityFromTemplate('small', bp.x, bp.y).addToWorld();
					for(var i = 0; 4 > i; i++) {
            this.world.createEntityFromTemplate('particle', bp.x, bp.y).addToWorld();

          }

					//TODO: calling bullet.deleteFromWorld() was causing null pointer exceptions in ExpiringSystem and CollisionStstem because it did not exist anymore. 
					//TODO: This did not happen in vanilla artemis.
					//TODO: is this a Is this a bug in artemis-odb's DelayedEntityProcessingSystem?
						bullet.deleteFromWorld();
					var health:Health = this.hm.get(ship);
					var position:Position = this.pm.get(ship);
					health.health -= 1;
					if(health.health < 0) {
						health.health = 0;
						ship.deleteFromWorld();
            this.world.createEntityFromTemplate('big', position.x, position.y).addToWorld();
					}
				}
			}));
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
		private cs:CollisionSystem;

		constructor(cs:CollisionSystem, group1:string, group2:string, handler:CollisionHandler) {
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
			var p1:Position = this.cs.pm.get(e1);
			var p2:Position = this.cs.pm.get(e2);

			var b1:Bounds = this.cs.bm.get(e1);
			var b2:Bounds = this.cs.bm.get(e2);

      var a = p1.x - p2.x;
			var b = p1.y - p2.y;
			return Math.sqrt(a*a+b*b)-b1.radius < b2.radius;
			//return Utils.distance(p1.x, p1.y, p2.x, p2.y)-b1.radius < b2.radius;
		}
	}
	
	interface CollisionHandler {
		handleCollision(a:Entity, b:Entity);
	}
}

