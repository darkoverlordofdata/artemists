var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    var EntityTemplate = artemis.annotations.EntityTemplate;
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
    var World = (function () {
        function World() {
            this.managers_ = new HashMap();
            this.managersBag_ = new Bag();
            this.systems_ = new HashMap();
            this.systemsBag_ = new Bag();
            this.added_ = new Bag();
            this.changed_ = new Bag();
            this.deleted_ = new Bag();
            this.enable_ = new Bag();
            this.disable_ = new Bag();
            this.cm_ = new artemis.ComponentManager();
            this.setManager(this.cm_);
            this.em_ = new artemis.EntityManager();
            this.setManager(this.em_);
        }
        /**
        * Makes sure all managers systems are initialized in the order they were added.
        */
        World.prototype.initialize = function () {
            for (var i = 0; i < this.managersBag_.size(); i++) {
                this.managersBag_.get(i).initialize();
            }
            for (var i = 0; i < this.systemsBag_.size(); i++) {
                ComponentMapperInitHelper.config(this.systemsBag_.get(i), this);
                this.systemsBag_.get(i).initialize();
            }
            this.entityTemplates = {};
            for (var component in EntityTemplate['entityTemplates']) {
                var Template = EntityTemplate['entityTemplates'][component];
                this.setEntityTemplate(component, new Template);
            }
        };
        /**
        * Returns a manager that takes care of all the entities in the world.
        * entities of this world.
        *
        * @return entity manager.
        */
        World.prototype.getEntityManager = function () {
            return this.em_;
        };
        /**
        * Returns a manager that takes care of all the components in the world.
        *
        * @return component manager.
        */
        World.prototype.getComponentManager = function () {
            return this.cm_;
        };
        /**
        * Add a manager into this world. It can be retrieved later.
        * World will notify this manager of changes to entity.
        *
        * @param manager to be added
        */
        World.prototype.setManager = function (manager) {
            this.managers_.put(manager.constructor, manager);
            this.managersBag_.add(manager);
            manager.setWorld(this);
            return manager;
        };
        /**
        * Returns a manager of the specified type.
        *
        * @param <T>
        * @param managerType
        *            class type of the manager
        * @return the manager
        */
        World.prototype.getManager = function (managerType) {
            return this.managers_.get(managerType);
        };
        /**
        * Deletes the manager from this world.
        * @param manager to delete.
        */
        World.prototype.deleteManager = function (manager) {
            this.managers_.remove(manager);
            this.managersBag_.remove(manager);
        };
        /**
        * Time since last game loop.
        *
        * @return delta time since last game loop.
        */
        World.prototype.getDelta = function () {
            return this.delta;
        };
        /**
        * You must specify the delta for the game here.
        *
        * @param delta time since last game loop.
        */
        World.prototype.setDelta = function (delta) {
            this.delta = delta;
        };
        /**
        * Adds a entity to this world.
        *
        * @param e entity
        */
        World.prototype.addEntity = function (e) {
            this.added_.add(e);
        };
        /**
        * Ensure all systems are notified of changes to this entity.
        * If you're adding a component to an entity after it's been
        * added to the world, then you need to invoke this method.
        *
        * @param e entity
        */
        World.prototype.changedEntity = function (e) {
            this.changed_.add(e);
        };
        /**
        * Delete the entity from the world.
        *
        * @param e entity
        */
        World.prototype.deleteEntity = function (e) {
            if (!this.deleted_.contains(e)) {
                this.deleted_.add(e);
            }
        };
        /**
        * (Re)enable the entity in the world, after it having being disabled.
        * Won't do anything unless it was already disabled.
        */
        World.prototype.enable = function (e) {
            this.enable_.add(e);
        };
        /**
        * Disable the entity from being processed. Won't delete it, it will
        * continue to exist but won't get processed.
        */
        World.prototype.disable = function (e) {
            this.disable_.add(e);
        };
        /**
        * Create and return a new or reused entity instance.
        * Will NOT add the entity to the world, use World.addEntity(Entity) for that.
        *
        * @return entity
        */
        World.prototype.createEntity = function () {
            return this.em_.createEntityInstance();
        };
        /**
        * Get a entity having the specified id.
        *
        * @param entityId
        * @return entity
        */
        World.prototype.getEntity = function (entityId) {
            return this.em_.getEntity(entityId);
        };
        /**
        * Gives you all the systems in this world for possible iteration.
        *
        * @return all entity systems in world.
        */
        World.prototype.getSystems = function () {
            return this.systemsBag_;
        };
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
        World.prototype.setSystem = function (system, passive) {
            if (passive === void 0) { passive = false; }
            system.setWorld(this);
            system.setPassive(passive);
            this.systems_.put(system.constructor, system);
            this.systemsBag_.add(system);
            return system;
        };
        /**
        * Removed the specified system from the world.
        * @param system to be deleted from world.
        */
        World.prototype.deleteSystem = function (system) {
            this.systems_.remove(system.constructor);
            this.systemsBag_.remove(system);
        };
        World.prototype.notifySystems = function (performer, e) {
            for (var i = 0, s = this.systemsBag_.size(); s > i; i++) {
                performer.perform(this.systemsBag_.get(i), e);
            }
        };
        World.prototype.notifyManagers = function (performer, e) {
            for (var a = 0; this.managersBag_.size() > a; a++) {
                performer.perform(this.managersBag_.get(a), e);
            }
        };
        /**
        * Retrieve a system for specified system type.
        *
        * @param type type of system.
        * @return instance of the system in this world.
        */
        World.prototype.getSystem = function (type) {
            return this.systems_.get(type);
        };
        /**
        * Performs an action on each entity.
        * @param entities
        * @param performer
        */
        World.prototype.check = function (entities, performer) {
            if (!entities.isEmpty()) {
                for (var i = 0; entities.size() > i; i++) {
                    var e = entities.get(i);
                    this.notifyManagers(performer, e);
                    this.notifySystems(performer, e);
                }
                entities.clear();
            }
        };
        /**
        * Process all non-passive systems.
        */
        World.prototype.process = function () {
            this.check(this.added_, {
                perform: function (observer, e) {
                    observer.added(e);
                }
            });
            this.check(this.changed_, {
                perform: function (observer, e) {
                    observer.changed(e);
                }
            });
            this.check(this.disable_, {
                perform: function (observer, e) {
                    observer.disabled(e);
                }
            });
            this.check(this.enable_, {
                perform: function (observer, e) {
                    observer.enabled(e);
                }
            });
            this.check(this.deleted_, {
                perform: function (observer, e) {
                    observer.deleted(e);
                }
            });
            this.cm_.clean();
            for (var i = 0; this.systemsBag_.size() > i; i++) {
                var system = this.systemsBag_.get(i);
                if (!system.isPassive()) {
                    system.process();
                }
            }
        };
        /**
        * Retrieves a ComponentMapper instance for fast retrieval of components from entities.
        *
        * @param type of component to get mapper for.
        * @return mapper for specified component type.
        */
        World.prototype.getMapper = function (type) {
            return artemis.ComponentMapper.getFor(type, this);
        };
        /**
         * Set an Entity Template
         *
         * @param entityTag
         * @param entityTemplate
         */
        World.prototype.setEntityTemplate = function (entityTag, entityTemplate) {
            this.entityTemplates[entityTag] = entityTemplate;
        };
        /**
         * Creates a entity from template.
         *
         * @param name
         * @param args
         * @returns {Entity}
         * EntityTemplate
         */
        World.prototype.createEntityFromTemplate = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return (_a = this.entityTemplates[name]).buildEntity.apply(_a, [this.createEntity(), this].concat(args));
            var _a;
        };
        return World;
    })();
    artemis.World = World;
    var ComponentMapperInitHelper = (function () {
        function ComponentMapperInitHelper() {
        }
        ComponentMapperInitHelper.config = function (target, world) {
            try {
                var clazz = target.constructor;
                for (var fieldIndex in clazz.declaredFields) {
                    var field = clazz.declaredFields[fieldIndex];
                    if (!target.hasOwnProperty(field)) {
                        var componentType = clazz.prototype[field];
                        target[field] = world.getMapper(componentType);
                    }
                }
            }
            catch (e) {
                throw new Error("Error while setting component mappers");
            }
        };
        return ComponentMapperInitHelper;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=World.js.map