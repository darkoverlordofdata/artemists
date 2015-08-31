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
        var Bag = artemis.utils.Bag;
        var HashMap = artemis.utils.HashMap;
        var Manager = artemis.Manager;
        /**
        * You may sometimes want to specify to which player an entity belongs to.
        *
        * An entity can only belong to a single player at a time.
        *
        * @author Arni Arent
        *
        */
        var PlayerManager = (function (_super) {
            __extends(PlayerManager, _super);
            function PlayerManager() {
                _super.call(this);
                this.playerByEntity_ = new HashMap();
                this.entitiesByPlayer_ = new HashMap();
            }
            PlayerManager.prototype.setPlayer = function (e, player) {
                this.playerByEntity_.put(e, player);
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                    this.entitiesByPlayer_.put(player, entities);
                }
                entities.add(e);
            };
            PlayerManager.prototype.getEntitiesOfPlayer = function (player) {
                var entities = this.entitiesByPlayer_.get(player);
                if (entities == null) {
                    entities = new Bag();
                }
                return entities;
            };
            PlayerManager.prototype.removeFromPlayer = function (e) {
                var player = this.playerByEntity_.get(e);
                if (player !== null) {
                    var entities = this.entitiesByPlayer_.get(player);
                    if (entities !== null) {
                        entities.remove(e);
                    }
                }
            };
            PlayerManager.prototype.getPlayer = function (e) {
                return this.playerByEntity_.get(e);
            };
            PlayerManager.prototype.initialize = function () {
            };
            PlayerManager.prototype.deleted = function (e) {
                this.removeFromPlayer(e);
            };
            return PlayerManager;
        })(Manager);
        managers.PlayerManager = PlayerManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=PlayerManager.js.map