var artemis;
(function (artemis) {
    var HashMap = artemis.utils.HashMap;
    var ComponentType = (function () {
        function ComponentType(type) {
            this.index_ = ComponentType.INDEX++;
            this.type_ = type;
        }
        ComponentType.prototype.getIndex = function () {
            return this.index_;
        };
        ComponentType.prototype.toString = function () {
            var klass = ComponentType;
            return "ComponentType[" + klass.name + "] (" + this.index_ + ")";
            // return "ComponentType["+klass.getSimpleName()+"] ("+this.index_+")";
        };
        ComponentType.getTypeFor = function (c) {
            var type = ComponentType.componentTypes.get(c);
            if (type == null) {
                type = new ComponentType(c);
                ComponentType.componentTypes.put(c, type);
            }
            return type;
        };
        ComponentType.getIndexFor = function (c) {
            return ComponentType.getTypeFor(c).getIndex();
        };
        ComponentType.INDEX = 0;
        ComponentType.componentTypes = new HashMap();
        return ComponentType;
    })();
    artemis.ComponentType = ComponentType;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentType.js.map