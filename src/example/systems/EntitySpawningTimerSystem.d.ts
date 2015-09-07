declare module brokenspork.systems {
    import VoidEntitySystem = artemis.systems.VoidEntitySystem;
    class EntitySpawningTimerSystem extends VoidEntitySystem {
        private game;
        private timer1;
        private timer2;
        private timer3;
        constructor(game: CCLayer);
        protected processSystem(): void;
    }
}
