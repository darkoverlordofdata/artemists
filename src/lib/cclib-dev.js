var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Cocos2d-js dev wrappers
 * Use for intellisene and typechecking
 */
var CCNode = (function (_super) {
    __extends(CCNode, _super);
    function CCNode() {
        _super.apply(this, arguments);
    }
    CCNode.prototype._super = function () { };
    return CCNode;
})(cc.Node);
var CCLayer = (function (_super) {
    __extends(CCLayer, _super);
    function CCLayer() {
        _super.apply(this, arguments);
    }
    CCLayer.prototype._super = function () { };
    return CCLayer;
})(cc.Layer);
var CCLayerColor = (function (_super) {
    __extends(CCLayerColor, _super);
    function CCLayerColor() {
        _super.apply(this, arguments);
    }
    CCLayerColor.prototype._super = function (color, width, height) { };
    return CCLayerColor;
})(cc.LayerColor);
var CCScene = (function (_super) {
    __extends(CCScene, _super);
    function CCScene() {
        _super.apply(this, arguments);
    }
    CCScene.prototype._super = function () { };
    return CCScene;
})(cc.Scene);
var CCSprite = (function (_super) {
    __extends(CCSprite, _super);
    function CCSprite() {
        _super.apply(this, arguments);
    }
    CCSprite.prototype._super = function (fileName, rect, rotated) { };
    return CCSprite;
})(cc.Sprite);
//# sourceMappingURL=cclib-dev.js.map