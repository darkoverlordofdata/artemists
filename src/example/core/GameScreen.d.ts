declare module brokenspork.core {
    class GameScreen {
        game: CCLayer;
        private world;
        private spriteRenderSystem;
        private healthRenderSystem;
        private hudRenderSystem;
        private viewport;
        private static ASPECT_RATIO;
        constructor(game: CCLayer);
        render(delta: number): void;
    }
}
