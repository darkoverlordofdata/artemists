/**
 * Cocos2d-js dev wrappers
 * Use for intellisene and typechecking
 */
declare class CCNode extends cc.Node {
    _super(): void;
}
declare class CCLayer extends cc.Layer {
    _super(): void;
}
declare class CCLayerColor extends cc.LayerColor {
    _super(color?: cc.Color, width?: number, height?: number): void;
}
declare class CCScene extends cc.Scene {
    _super(): void;
}
declare class CCSprite extends cc.Sprite {
    _super(fileName?: string, rect?: cc.Rect, rotated?: boolean): void;
}
