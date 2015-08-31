var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var brokenspork;
(function (brokenspork) {
    var components;
    (function (components) {
        var Component = artemis.Component;
        (function (Layer) {
            Layer[Layer["DEFAULT"] = 0] = "DEFAULT";
            Layer[Layer["BACKGROUND"] = 1] = "BACKGROUND";
            Layer[Layer["ACTORS_1"] = 2] = "ACTORS_1";
            Layer[Layer["ACTORS_2"] = 3] = "ACTORS_2";
            Layer[Layer["ACTORS_3"] = 4] = "ACTORS_3";
            Layer[Layer["PARTICLES"] = 5] = "PARTICLES";
        })(components.Layer || (components.Layer = {}));
        var Layer = components.Layer;
        ;
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            // public int getLayerId() {
            // 	return ordinal();
            // }
            function Sprite() {
                _super.call(this);
                this.sprite_ = new cc.Sprite();
            }
            Object.defineProperty(Sprite.prototype, "name", {
                get: function () { return this.name_; },
                set: function (value) {
                    this.name_ = value;
                    this.sprite_.initWithSpriteFrameName(value + ".png");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "scaleX", {
                get: function () { return this.sprite_.getScaleX(); },
                set: function (value) { this.sprite_.setScaleX(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "scaleY", {
                get: function () { return this.sprite_.getScaleY(); },
                set: function (value) { this.sprite_.setScaleY(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "rotation", {
                get: function () { return this.sprite_.getRotation(); },
                set: function (value) { this.sprite_.setRotation(value); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "r", {
                get: function () { return this.r_; },
                set: function (value) {
                    this.r_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "g", {
                get: function () { return this.g_; },
                set: function (value) {
                    this.g_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "b", {
                get: function () { return this.b_; },
                set: function (value) {
                    this.b_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite.prototype, "a", {
                get: function () { return this.a_; },
                set: function (value) {
                    this.a_ = value;
                    this.sprite_.setColor(cc.color(this.r_, this.g_, this.b_, this.a_));
                },
                enumerable: true,
                configurable: true
            });
            Sprite.className = 'Sprite';
            return Sprite;
        })(Component);
        components.Sprite = Sprite;
        Sprite.prototype.layer = Layer.DEFAULT;
        Sprite.prototype.name_ = '';
        Sprite.prototype.scaleX_ = 1;
        Sprite.prototype.scaleY_ = 1;
        Sprite.prototype.rotation_ = 0;
        Sprite.prototype.r_ = 255;
        Sprite.prototype.g_ = 255;
        Sprite.prototype.b_ = 255;
        Sprite.prototype.a_ = 255;
        Sprite.prototype.sprite_ = null;
    })(components = brokenspork.components || (brokenspork.components = {}));
})(brokenspork || (brokenspork = {}));
//# sourceMappingURL=Sprite.js.map