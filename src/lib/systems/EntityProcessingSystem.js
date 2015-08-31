var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var systems;
    (function (systems) {
        var EntitySystem = artemis.EntitySystem;
        /**
        * A typical entity system. Use this when you need to process entities possessing the
        * provided component types.
        *
        * @author Arni Arent
        *
        */
        var EntityProcessingSystem = (function (_super) {
            __extends(EntityProcessingSystem, _super);
            function EntityProcessingSystem(aspect) {
                _super.call(this, aspect);
            }
            /**
            * Process a entity this system is interested in.
            * @param e the entity to process.
            */
            EntityProcessingSystem.prototype.processEach = function (e) {
            };
            EntityProcessingSystem.prototype.processEntities = function (entities) {
                for (var i = 0, s = entities.size(); s > i; i++) {
                    this.processEach(entities.get(i));
                }
            };
            EntityProcessingSystem.prototype.checkProcessing = function () {
                return true;
            };
            return EntityProcessingSystem;
        })(EntitySystem);
        systems.EntityProcessingSystem = EntityProcessingSystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=EntityProcessingSystem.js.map