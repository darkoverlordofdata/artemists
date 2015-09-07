var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var HashMap = artemis.utils.HashMap;
    var BlackBoard = artemis.blackboard.BlackBoard;
    /**
    * The most raw entity system. It should not typically be used, but you can create your own
    * entity system handling by extending this. It is recommended that you use the other provided
    * entity system implementations.
    *
    * @author Arni Arent
    *
    */
    var EntitySystem = (function () {
        /**
        * Creates an entity system that uses the specified aspect as a matcher against entities.
        * @param aspect to match against entities
        */
        function EntitySystem(aspect) {
            this.actives_ = new Bag();
            this.aspect_ = aspect;
            this.systemIndex_ = SystemIndexManager.getIndexFor(this.constructor);
            this.allSet_ = aspect.getAllSet();
            this.exclusionSet_ = aspect.getExclusionSet();
            this.oneSet_ = aspect.getOneSet();
            this.dummy_ = this.allSet_.isEmpty() && this.oneSet_.isEmpty(); // This system can't possibly be interested in any entity, so it must be "dummy"
        }
        /**
        * Called before processing of entities begins.
        */
        EntitySystem.prototype.begin = function () { };
        EntitySystem.prototype.process = function () {
            if (this.checkProcessing()) {
                this.begin();
                this.processEntities(this.actives_);
                this.end();
            }
        };
        /**
        * Called after the processing of entities ends.
        */
        EntitySystem.prototype.end = function () { };
        /**
        * Any implementing entity system must implement this method and the logic
        * to process the given entities of the system.
        *
        * @param entities the entities this system contains.
        */
        EntitySystem.prototype.processEntities = function (entities) { };
        /**
        *
        * @return true if the system should be processed, false if not.
        */
        EntitySystem.prototype.checkProcessing = function () {
            return true;
        };
        /**
        * Override to implement code that gets executed when systems are initialized.
        */
        EntitySystem.prototype.initialize = function () { };
        /**
        * Called if the system has received a entity it is interested in, e.g. created or a component was added to it.
        * @param e the entity that was added to this system.
        */
        EntitySystem.prototype.inserted = function (e) { };
        ;
        /**
        * Called if a entity was removed from this system, e.g. deleted or had one of it's components removed.
        * @param e the entity that was removed from this system.
        */
        EntitySystem.prototype.removed = function (e) { };
        ;
        /**
        * Will check if the entity is of interest to this system.
        * @param e entity to check
        */
        EntitySystem.prototype.check = function (e) {
            if (this.dummy_) {
                return;
            }
            var contains = e.getSystemBits().get(this.systemIndex_);
            var interested = true; // possibly interested, let's try to prove it wrong.
            var componentBits = e.getComponentBits();
            // Check if the entity possesses ALL of the components defined in the aspect.
            if (!this.allSet_.isEmpty()) {
                for (var i = this.allSet_.nextSetBit(0); i >= 0; i = this.allSet_.nextSetBit(i + 1)) {
                    if (!componentBits.get(i)) {
                        interested = false;
                        break;
                    }
                }
            }
            // Check if the entity possesses ANY of the exclusion components, if it does then the system is not interested.
            if (!this.exclusionSet_.isEmpty() && interested) {
                interested = !this.exclusionSet_.intersects(componentBits);
            }
            // Check if the entity possesses ANY of the components in the oneSet. If so, the system is interested.
            if (!this.oneSet_.isEmpty()) {
                interested = this.oneSet_.intersects(componentBits);
            }
            if (interested && !contains) {
                this.insertToSystem(e);
            }
            else if (!interested && contains) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.removeFromSystem = function (e) {
            this.actives_.remove(e);
            e.getSystemBits().clear(this.systemIndex_);
            this.removed(e);
        };
        EntitySystem.prototype.insertToSystem = function (e) {
            this.actives_.add(e);
            e.getSystemBits().set(this.systemIndex_);
            this.inserted(e);
        };
        EntitySystem.prototype.added = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.changed = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.deleted = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.disabled = function (e) {
            if (e.getSystemBits().get(this.systemIndex_)) {
                this.removeFromSystem(e);
            }
        };
        EntitySystem.prototype.enabled = function (e) {
            this.check(e);
        };
        EntitySystem.prototype.setWorld = function (world) {
            this.world = world;
        };
        EntitySystem.prototype.isPassive = function () {
            return this.passive_;
        };
        EntitySystem.prototype.setPassive = function (passive) {
            this.passive_ = passive;
        };
        EntitySystem.prototype.getActive = function () {
            return this.actives_;
        };
        EntitySystem.blackBoard = new BlackBoard();
        return EntitySystem;
    })();
    artemis.EntitySystem = EntitySystem;
    /**
    * Used to generate a unique bit for each system.
    * Only used internally in EntitySystem.
    */
    var SystemIndexManager = (function () {
        function SystemIndexManager() {
        }
        SystemIndexManager.getIndexFor = function (es) {
            var index = SystemIndexManager.indices.get(es);
            if (index === undefined) {
                index = SystemIndexManager.INDEX++;
                SystemIndexManager.indices.put(es, index);
            }
            return index;
        };
        SystemIndexManager.INDEX = 0;
        SystemIndexManager.indices = new HashMap();
        return SystemIndexManager;
    })();
})(artemis || (artemis = {}));
//# sourceMappingURL=EntitySystem.js.map