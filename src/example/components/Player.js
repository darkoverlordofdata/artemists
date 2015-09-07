var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var example;
(function (example) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player() {
                _super.apply(this, arguments);
            }
            Player.className = 'Player';
            return Player;
        })(Component);
        components.Player = Player;
    })(components = example.components || (example.components = {}));
})(example || (example = {}));
//# sourceMappingURL=Player.js.map