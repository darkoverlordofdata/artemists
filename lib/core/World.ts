module artemis {
	
	import Bag = artemis.utils.Bag;
	import ImmutableBag = artemis.utils.ImmutableBag;
	import HashMap = artemis.utils.HashMap;
	import Map = artemis.utils.Map;
	import Mapper = artemis.annotations.Mapper;

	/**
	* The primary instance for the framework. It contains all the managers.
	* 
	* You must use this to create, delete and retrieve entities.
	* 
	* It is also important to set the delta each game loop iteration, and initialize before game loop.
	* 
	* @author Arni Arent
	* 
	*/
	export class World {
		private em_:EntityManager;
		private cm_:ComponentManager;
	
		public delta:number;
		private added_:Bag<Entity>;
		private changed_:Bag<Entity>;
		private deleted_:Bag<Entity>;
		private enable_:Bag<Entity>;
		private disable_:Bag<Entity>;
	
		private managers_:Map<Function, Manager> ;
		private managersBag_:Bag<Manager>;
		
		private systems_:Map<Function, EntitySystem>;
		private systemsBag_:Bag<EntitySystem>;
	
		constructor() {
			this.managers_ = new HashMap<Function, Manager>();
			this.managersBag_ = new Bag<Manager>();
			
			this.systems_ = new HashMap<Function, EntitySystem>();
			this.systemsBag_ = new Bag<EntitySystem>();
	
			this.added_ = new Bag<Entity>();
			this.changed_ = new Bag<Entity>();
			this.deleted_ = new Bag<Entity>();
			this.enable_ = new Bag<Entity>();
			this.disable_ = new Bag<Entity>();
	
			this.cm_ = new ComponentManager();
			this.setManager(this.cm_);
			
			this.em_ = new EntityManager();
			this.setManager(this.em_);
		}
	
		
		/**
		* Makes sure all managers systems are initialized in the order they were added.
		*/
		public initialize() {
			for (var i = 0; i < this.managersBag_.size(); i++) {
				this.managersBag_.get(i).initialize();
			}
			
			for (var i = 0; i < this.systemsBag_.size(); i++) {
				ComponentMapperInitHelper.config(this.systemsBag_.get(i), this);
				this.systemsBag_.get(i).initialize();
			}
		}
		
		
		/**
		* Returns a manager that takes care of all the entities in the world.
		* entities of this world.
		* 
		* @return entity manager.
		*/
		public getEntityManager():EntityManager {
			return this.em_;
		}
		
		/**
		* Returns a manager that takes care of all the components in the world.
		* 
		* @return component manager.
		*/
		public getComponentManager():ComponentManager {
			return this.cm_;
		}
		
		
		
	
		/**
		* Add a manager into this world. It can be retrieved later.
		* World will notify this manager of changes to entity.
		* 
		* @param manager to be added
		*/
		public setManager(manager:Manager):Manager {
			this.managers_.put(manager.constructor, manager);
			this.managersBag_.add(manager);
			manager.setWorld(this);
			return manager;
		}
	
		/**
		* Returns a manager of the specified type.
		* 
		* @param <T>
		* @param managerType
		*            class type of the manager
		* @return the manager
		*/
		public getManager<T extends Manager>(managerType:Function):T {
			return this.managers_.get(managerType);
		}
		
		/**
		* Deletes the manager from this world.
		* @param manager to delete.
		*/
		public deleteManager(manager:Manager) {
			this.managers_.remove(manager);
			this.managersBag_.remove(manager);
		}
	
		
		
		
		/**
		* Time since last game loop.
		* 
		* @return delta time since last game loop.
		*/
		public getDelta() {
			return this.delta;
		}
	
		/**
		* You must specify the delta for the game here.
		* 
		* @param delta time since last game loop.
		*/
		public setDelta(delta:number) {
			this.delta = delta;
		}
		
	
	
		/**
		* Adds a entity to this world.
		* 
		* @param e entity
		*/
		public addEntity(e:Entity) {
			this.added_.add(e);
		}
		
		/**
		* Ensure all systems are notified of changes to this entity.
		* If you're adding a component to an entity after it's been
		* added to the world, then you need to invoke this method.
		* 
		* @param e entity
		*/
		public changedEntity(e:Entity) {
			this.changed_.add(e);
		}
		
		/**
		* Delete the entity from the world.
		* 
		* @param e entity
		*/
		public deleteEntity(e:Entity) {
			if (!this.deleted_.contains(e)) {
				this.deleted_.add(e);
			}
		}
	
		/**
		* (Re)enable the entity in the world, after it having being disabled.
		* Won't do anything unless it was already disabled.
		*/
		public enable(e:Entity) {
			this.enable_.add(e);
		}
	
		/**
		* Disable the entity from being processed. Won't delete it, it will
		* continue to exist but won't get processed.
		*/
		public disable(e:Entity) {
			this.disable_.add(e);
		}
	
	
		/**
		* Create and return a new or reused entity instance.
		* Will NOT add the entity to the world, use World.addEntity(Entity) for that.
		* 
		* @return entity
		*/
		public createEntity():Entity {
			return this.em_.createEntityInstance();
		}
	
		/**
		* Get a entity having the specified id.
		* 
		* @param entityId
		* @return entity
		*/
		public getEntity(entityId:number):Entity {
			return this.em_.getEntity(entityId);
		}
	
		
	
	
		/**
		* Gives you all the systems in this world for possible iteration.
		* 
		* @return all entity systems in world.
		*/
		public getSystems():ImmutableBag<EntitySystem> {
			return this.systemsBag_;
		}
	
		/**
		* Adds a system to this world that will be processed by World.process()
		* 
		* @param system the system to add.
		* @return the added system.
		*/
		// public setSystem(system:T):<T extends EntitySystem> T  {
		// 	return this.setSystem(system, false);
		// }
	
		/**
		* Will add a system to this world.
		*  
		* @param system the system to add.
		* @param passive wether or not this system will be processed by World.process()
		* @return the added system.
		*/
		//	public <T extends EntitySystem> T setSystem(T system, boolean passive) {

		public setSystem<T extends EntitySystem>(system:T, passive:boolean=false):T {
			system.setWorld(this);
			system.setPassive(passive);
			
			this.systems_.put(system.constructor, system);
			this.systemsBag_.add(system);
			
			return system;
		}
		
		/**
		* Removed the specified system from the world.
		* @param system to be deleted from world.
		*/
		public deleteSystem(system:EntitySystem) {
			this.systems_.remove(system.constructor);
			this.systemsBag_.remove(system);
		}
		
		private notifySystems(performer:Performer, e:Entity) {
			for(var i = 0, s=this.systemsBag_.size(); s > i; i++) {
				performer.perform(this.systemsBag_.get(i), e);
			}
		}
	
		private notifyManagers(performer:Performer, e:Entity) {
			for(var a = 0; this.managersBag_.size() > a; a++) {
				performer.perform(this.managersBag_.get(a), e);
			}
		}
		
		/**
		* Retrieve a system for specified system type.
		* 
		* @param type type of system.
		* @return instance of the system in this world.
		*/
		public getSystem(type:Function):EntitySystem {
			return this.systems_.get(type);
		}

		/**
		* Performs an action on each entity.
		* @param entities
		* @param performer
		*/
		private check(entities:Bag<Entity>, performer:Performer) {
			if (!entities.isEmpty()) {
				for (var i = 0; entities.size() > i; i++) {
					var e:Entity = entities.get(i);
					this.notifyManagers(performer, e);
					this.notifySystems(performer, e);
				}
				entities.clear();
			}
		}
	
		
		/**
		* Process all non-passive systems.
		*/
		public process() {

      this.check(this.added_, {
				
				perform: function(observer:EntityObserver, e:Entity) {
					observer.added(e);
				}
			});
			
			this.check(this.changed_, {
				
				perform: function(observer:EntityObserver, e:Entity) {
					observer.changed(e);
				}
			});
			
			this.check(this.disable_, {
				
				perform: function(observer:EntityObserver, e:Entity) {
					observer.disabled(e);
				}
			});
			
			this.check(this.enable_, {
				
				perform: function(observer:EntityObserver, e:Entity) {
					observer.enabled(e);
				}
			});
			
			this.check(this.deleted_, {
				
				perform: function(observer:EntityObserver, e:Entity) {
					observer.deleted(e);
				}
			});
			
			this.cm_.clean();
			
			for(var i = 0; this.systemsBag_.size() > i; i++) {
				var system:EntitySystem = this.systemsBag_.get(i);
				if(!system.isPassive()) {
					system.process();
				}
			}
		}
		
	
		/**
		* Retrieves a ComponentMapper instance for fast retrieval of components from entities.
		* 
		* @param type of component to get mapper for.
		* @return mapper for specified component type.
		*/
		public getMapper<T extends Component>(type:Function):ComponentMapper<T>  {
			return ComponentMapper.getFor<T>(type, this);
		}
		
	}
	
	/*
	* Only used internally to maintain clean code.
	*/
	interface Performer {
		perform(observer:EntityObserver, e:Entity);
	}



	class ComponentMapperInitHelper {

		public static config(target:Object, world:World) {
			
			try {
				
				var clazz:any = target.constructor;
				var className = clazz.className || clazz.name;
				
				for (var fieldIndex in clazz.declaredFields) {
					var field = clazz.declaredFields[fieldIndex];
					if (!target.hasOwnProperty(field)) {
						
						var componentType = clazz.prototype[field]
						target[field] = world.getMapper(componentType);
					}
				}
				
			} catch (e) {
				throw new Error("Error while setting component mappers");
			}
		}
	}
	
}

