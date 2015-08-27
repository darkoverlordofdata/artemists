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
        /**
        * This system has an empty aspect so it processes no entities, but it still gets invoked.
        * You can use this system if you need to execute some game logic and not have to concern
        * yourself about aspects or entities.
        *
        * @author Arni Arent
        *
        */
        var VoidEntitySystem = (function (_super) {
            __extends(VoidEntitySystem, _super);
            function VoidEntitySystem() {
                _super.call(this, artemis.Aspect.getEmpty());
            }
            VoidEntitySystem.prototype.processEntities = function (entities) {
                this.processSystem();
            };
            VoidEntitySystem.prototype.processSystem = function () { };
            VoidEntitySystem.prototype.checkProcessing = function () {
                return true;
            };
            return VoidEntitySystem;
        })(artemis.EntitySystem);
        systems.VoidEntitySystem = VoidEntitySystem;
    })(systems = artemis.systems || (artemis.systems = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=VoidEntitySystem.js.map