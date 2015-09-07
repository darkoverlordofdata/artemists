declare module brokenspork.core {
    class SpaceshipWarrior extends CCLayer {
        scene: any;
        gameScreen: GameScreen;
        /**
          * Start the menu
          * @return {cc.Scene} the menu scene
          */
        static start(): cc.Scene;
        /**
         *
         * @constructor
         * @extends {cc.Layer}
         * @param {cc.Scene} scene
         */
        constructor(scene: any);
        ctor(): void;
        update(time: number): void;
    }
}
