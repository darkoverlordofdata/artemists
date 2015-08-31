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
        * Use this class together with PlayerManager.
        *
        * You may sometimes want to create teams in your game, so that
        * some players are team mates.
        *
        * A player can only belong to a single team.
        *
        * @author Arni Arent
        *
        */
        var TeamManager = (function (_super) {
            __extends(TeamManager, _super);
            function TeamManager() {
                _super.call(this);
                this.playersByTeam_ = new HashMap();
                this.teamByPlayer_ = new HashMap();
            }
            TeamManager.prototype.initialize = function () {
            };
            TeamManager.prototype.getTeam = function (player) {
                return this.teamByPlayer_.get(player);
            };
            TeamManager.prototype.setTeam = function (player, team) {
                this.removeFromTeam(player);
                this.teamByPlayer_.put(player, team);
                var players = this.playersByTeam_.get(team);
                if (players == null) {
                    players = new Bag();
                    this.playersByTeam_.put(team, players);
                }
                players.add(player);
            };
            TeamManager.prototype.getPlayers = function (team) {
                return this.playersByTeam_.get(team);
            };
            TeamManager.prototype.removeFromTeam = function (player) {
                var team = this.teamByPlayer_.remove(player);
                if (team != null) {
                    var players = this.playersByTeam_.get(team);
                    if (players != null) {
                        players.remove(player);
                    }
                }
            };
            return TeamManager;
        })(Manager);
        managers.TeamManager = TeamManager;
    })(managers = artemis.managers || (artemis.managers = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=TeamManager.js.map