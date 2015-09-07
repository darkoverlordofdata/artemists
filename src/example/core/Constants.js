var example;
(function (example) {
    var core;
    (function (core) {
        var Constants = (function () {
            function Constants() {
            }
            Constants.FRAME_WIDTH = 800;
            Constants.FRAME_HEIGHT = 450;
            Constants.Groups = {
                PLAYER_BULLETS: "player bullets",
                PLAYER_SHIP: "player ship",
                ENEMY_SHIPS: "enemy ships",
                ENEMY_BULLETS: "enemy bullets"
            };
            return Constants;
        })();
        core.Constants = Constants;
    })(core = example.core || (example.core = {}));
})(example || (example = {}));
//# sourceMappingURL=Constants.js.map