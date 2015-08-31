var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var artemis;
(function (artemis) {
    var Bag = artemis.utils.Bag;
    var Manager = artemis.Manager;
    var ComponentManager = (function (_super) {
        __extends(ComponentManager, _super);
        function ComponentManager() {
            _super.call(this);
            this.componentsByType_ = new Bag();
            this.deleted_ = new Bag();
        }
        ComponentManager.prototype.initialize = function () {
        };
        ComponentManager.prototype.removeComponentsOfEntity = function (e) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                this.componentsByType_.get(i).set(e.getId(), null);
            }
            componentBits.clear();
        };
        ComponentManager.prototype.addComponent = function (e, type, component) {
            this.componentsByType_.ensureCapacity(type.getIndex());
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            components.set(e.getId(), component);
            e.getComponentBits().set(type.getIndex());
        };
        ComponentManager.prototype.removeComponent = function (e, type) {
            if (e.getComponentBits().get(type.getIndex())) {
                this.componentsByType_.get(type.getIndex()).set(e.getId(), null);
                e.getComponentBits().clear(type.getIndex());
            }
        };
        ComponentManager.prototype.getComponentsByType = function (type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components == null) {
                components = new Bag();
                this.componentsByType_.set(type.getIndex(), components);
            }
            return components;
        };
        ComponentManager.prototype.getComponent = function (e, type) {
            var components = this.componentsByType_.get(type.getIndex());
            if (components != null) {
                return components.get(e.getId());
            }
            return null;
        };
        ComponentManager.prototype.getComponentsFor = function (e, fillBag) {
            var componentBits = e.getComponentBits();
            for (var i = componentBits.nextSetBit(0); i >= 0; i = componentBits.nextSetBit(i + 1)) {
                fillBag.add(this.componentsByType_.get(i).get(e.getId()));
            }
            return fillBag;
        };
        ComponentManager.prototype.deleted = function (e) {
            this.deleted_.add(e);
        };
        ComponentManager.prototype.clean = function () {
            if (this.deleted_.size() > 0) {
                for (var i = 0; this.deleted_.size() > i; i++) {
                    this.removeComponentsOfEntity(this.deleted_.get(i));
                }
                this.deleted_.clear();
            }
        };
        return ComponentManager;
    })(Manager);
    artemis.ComponentManager = ComponentManager;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentManager.js.map