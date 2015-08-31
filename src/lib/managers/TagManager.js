var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var managers;
    (function (managers) {
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * If you need to tag any entity, use this. A typical usage would be to tag
        * entities such as "PLAYER", "BOSS" or something that is very unique.
        *
        * @author Arni Arent
        *
        */
        var TagManager = (function (_super) {
            __extends(TagManager, _super);
            function TagManager() {
                _super.call(this);
                this.entitiesByTag_ = new HashMap();
                this.tagsByEntity_ = new HashMap();
            }
            TagManager.prototype.register = function (tag, e) {
                this.entitiesByTag_.put(tag, e);
                this.tagsByEntity_.put(e, tag);
            };
            TagManager.prototype.unregister = function (tag) {
                this.tagsByEntity_.remove(this.entitiesByTag_.remove(tag));
            };
            TagManager.prototype.isRegistered = function (tag) {
                return this.entitiesByTag_.containsKey(tag);
            };
            TagManager.prototype.getEntity = function (tag) {
                return this.entitiesByTag_.get(tag);
            };
            TagManager.prototype.getRegisteredTags = function () {
                return this.tagsByEntity_.values();
            };
            TagManager.prototype.deleted = function (e) {
                var removedTag = this.tagsByEntity_.remove(e);
                if (removedTag != null) {
                    this.entitiesByTag_.remove(removedTag);
                }
            };
            TagManager.prototype.initialize = function () {
            };
            return TagManager;
        })(Manager);
        managers.TagManager = TagManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TagManager.js.map