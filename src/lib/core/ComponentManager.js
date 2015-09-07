var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var Manager = artemis.Manager;
    var ComponentTypeFactory = artemis.ComponentTypeFactory;
    var ComponentPool = artemis.ComponentPool;
    var Taxonomy = artemis.Taxonomy;
    var ComponentManager = (function (_super) {
        __extends(ComponentManager, _super);
        function ComponentManager() {
            _super.call(this);
            this.componentsByType_ = new Bag();
            this.pooledComponents_ = new ComponentPool();
            this.deleted_ = new Bag();
            this.typeFactory = new ComponentTypeFactory();
        }
        ComponentManager.prototype.initialize = function () {
        };
        ComponentManager.prototype.create = function (owner, componentClass) {
            var type = this.typeFactory.getTypeFor(componentClass);
            var component = null;
            switch (type.getTaxonomy()) {
                case Taxonomy.BASIC:
                    //console.log('create BASIC');
                    component = this.newInstance(componentClass, false);
                    break;
                case Taxonomy.POOLED:
                    //console.log('create POOLED');
                    this.reclaimPooled(owner, type);
                    /**
                     * YUK! <T> is not working here.
                     * It should be ok, since it will be the same as 'type'
                     */
                    component = this.pooledComponents_.obtain(componentClass, type);
                    break;
                default:
                    throw new Error('InvalidComponentException unknown component type:' + type.getTaxonomy());
            }
            this.addComponent(owner, type, component);
            return component;
        };
        ComponentManager.prototype.reclaimPooled = function (owner, type) {
            var components = this.componentsByType_.safeGet(type.getIndex());
            if (components == null)
                return;
            var old = components.safeGet(owner.getId());
            if (old !== undefined && old !== null) {
                this.pooledComponents_.free(old, type);
            }
        };
        ComponentManager.prototype.newInstance = function (constructor, constructorHasWorldParameter) {
            if (constructorHasWorldParameter) {
                return new constructor(this.world_);
            }
            else {
                return new constructor();
            }
        };
        /**
         * Removes all components from the entity associated in this manager.
         *
         * @param e
         *			the entity to remove components from
         */
        ComponentManager.prototype.removeComponentsOfEntity = function (e) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                switch (this.typeFactory.getTaxonomy(i)) {
                    case Taxonomy.BASIC:
                        //console.log('remove BASIC');
                        this.componentsByType_.get(i).set(e.getId(), null);
                        break;
                    case Taxonomy.POOLED:
                        //console.log('remove POOLED');
                        var pooled = this.componentsByType_.get(i).get(e.getId());
                        this.pooledComponents_.freeByIndex(pooled, i);
                        this.componentsByType_.get(i).set(e.getId(), null);
                        break;
                    default:
                        throw new Error('InvalidComponentException' + " unknown component type: " + this.typeFactory.getTaxonomy(i));
                }
            }
            componentBits.clear();
        };
        /**
         * Adds the component of the given type to the entity.
         * <p>
         * Only one component of given type can be associated with a entity at the
         * same time.
         * </p>
         *
         * @param e
         *			the entity to add to
         * @param type
         *			the type of component being added
         * @param component
         *			the component to add
         */
        ComponentManager.prototype.addComponent = function (e, type, component) {
            this.componentsByType_.ensureCapacity(type.getIndex());
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            components.set(e.getId(), component);
            e.getComponentBits().set(type.getIndex());
        };
        /**
         * Removes the component of given type from the entity.
         *
         * @param e
         *			the entity to remove from
         * @param type
         *			the type of component being removed
         */
        ComponentManager.prototype.removeComponent = function (e, type) {
            var index = type.getIndex();
            switch (type.getTaxonomy()) {
                case Taxonomy.BASIC:
                    this.componentsByType_.get(index).set(e.getId(), null);
                    e.getComponentBits().clear(type.getIndex());
                    break;
                case Taxonomy.POOLED:
                    var pooled = this.componentsByType_.get(index).get(e.getId());
                    e.getComponentBits().clear(type.getIndex());
                    this.pooledComponents_.free(pooled, type);
                    this.componentsByType_.get(index).set(e.getId(), null);
                    break;
                default:
                    throw new Error('InvalidComponentException' + type + " unknown component type: " + type.getTaxonomy());
            }
        };
        /**
         * Get all components from all entities for a given type.
         *
         * @param type
         *			the type of components to get
         * @return a bag containing all components of the given type
         */
        ComponentManager.prototype.getComponentsByType = function (type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            return components;
        };
        /**
         * Get a component of an entity.
         *
         * @param e
         *			the entity associated with the component
         * @param type
         *			the type of component to get
         * @return the component of given type
         */
        ComponentManager.prototype.getComponent = function (e, type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components != null) {
                return components.get(e.getId());
            }
            return null;
        };
        /**
         * Get all component associated with an entity.
         *
         * @param e
         *			the entity to get components from
         * @param fillBag
         *			a bag to be filled with components
         * @return the {@code fillBag}, filled with the entities components
         */
        ComponentManager.prototype.getComponentsFor = function (e, fillBag) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                fillBag.add(this.componentsByType_.get(i).get(e.getId()));
            }
            return fillBag;
        };
        ComponentManager.prototype.deleted = function (e) {
            this.deleted_.add(e);
        };
        ComponentManager.prototype.clean = function () {
            if (this.deleted_.size() > 0) {
                for (var i = 0; this.deleted_.size() > i; i++) {
                    this.removeComponentsOfEntity(this.deleted_.get(i));
                }
                this.deleted_.clear();
            }
        };
        return ComponentManager;
    })(Manager);
    artemis.ComponentManager = ComponentManager;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentManager.js.map