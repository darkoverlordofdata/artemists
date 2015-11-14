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
  import PositionComponent = artemis.components.PositionComponent;
  import HealthComponent = artemis.components.HealthComponent;

  import Container = PIXI.Container;

	export class CollisionSystem extends EntitySystem {
		private collisionPairs:Bag<CollisionPair>;

		constructor() {
			super(Aspect.getAspectForAll(PositionComponent, BoundsComponent));
		}
	
		
		public initialize() {

			this.collisionPairs = new Bag<CollisionPair>();
			this.collisionPairs.add(new CollisionPair(this, Constants.Groups.PLAYER_BULLETS, Constants.Groups.ENEMY_SHIPS,
				{
				
				handleCollision: (bullet:Entity, ship:Entity) => {
					var bp:PositionComponent = bullet.position;
          this.world.createEntityFromTemplate('small', bp.x, bp.y);
          for(var i = 0; 4 > i; i++) {
            this.world.createEntityFromTemplate('particle', bp.x, bp.y);
          }

					bullet.deleteFromWorld();
					var health:HealthComponent = ship.health;
					var position:PositionComponent = ship.position;
					health.health -= 1;

					if(health.health < 0) {
						health.health = 0;
						ship.deleteFromWorld();
            this.world.createEntityFromTemplate('big', position.x, position.y);
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

