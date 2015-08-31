var brokenspork;
(function (brokenspork) {
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
    })(core = brokenspork.core || (brokenspork.core = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Constants.js.map