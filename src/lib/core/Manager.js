var artemis;
(function (artemis) {
    /**
    * Manager.
    *
    * @author Arni Arent
    *
    */
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.initialize = function () {
        };
        Manager.prototype.setWorld = function (world) {
            this.world_ = world;
        };
        Manager.prototype.getWorld = function () {
            return this.world_;
        };
        Manager.prototype.added = function (e) {
        };
        Manager.prototype.changed = function (e) {
        };
        Manager.prototype.deleted = function (e) {
        };
        Manager.prototype.disabled = function (e) {
        };
        Manager.prototype.enabled = function (e) {
        };
        return Manager;
    })();
    artemis.Manager = Manager;
})(artemis || (artemis = {}));
//# sourceMappingURL=Manager.js.map