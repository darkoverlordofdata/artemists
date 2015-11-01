/**
 * Cocos2d-js dev wrappers
 * Use for intellisene and typechecking
 */
class CCNode extends cc.Node {
    _super() {}
}
class CCLayer extends cc.Layer {
    _super() {}
}
class CCLayerColor extends cc.LayerColor {
    _super(color?:cc.Color, width?:number, height?:number){}
}
class CCScene extends cc.Scene {
    _super() {}
}
class CCSprite extends cc.Sprite {
    _super(fileName?: string, rect?: cc.Rect, rotated?: boolean) {}
}
