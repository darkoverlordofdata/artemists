var artemis;
(function (artemis) {
    var Pooled = artemis.annotations.Pooled;
    (function (Taxonomy) {
        Taxonomy[Taxonomy["BASIC"] = 0] = "BASIC";
        Taxonomy[Taxonomy["POOLED"] = 1] = "POOLED"; //, PACKED
    })(artemis.Taxonomy || (artemis.Taxonomy = {}));
    var Taxonomy = artemis.Taxonomy;
    var ComponentType = (function () {
        function ComponentType(type, index) {
            this.index_ = 0;
            if (index !== undefined) {
                this.index_ = ComponentType.INDEX++;
            }
            else {
                this.index_ = index;
            }
            this.type_ = type;
            if (Pooled['pooledComponents'][artemis.getClassName(type)] === type) {
                this.taxonomy_ = Taxonomy.POOLED;
            }
            else {
                this.taxonomy_ = Taxonomy.BASIC;
            }
        }
        ComponentType.prototype.getName = function () {
            return artemis.getClassName(this.type_);
        };
        ComponentType.prototype.getIndex = function () {
            return this.index_;
        };
        ComponentType.prototype.getTaxonomy = function () {
            return this.taxonomy_;
        };
        ComponentType.prototype.toString = function () {
            return "ComponentType[" + artemis.getClassName(ComponentType) + "] (" + this.index_ + ")";
        };
        ComponentType.INDEX = 0;
        return ComponentType;
    })();
    artemis.ComponentType = ComponentType;
})(artemis || (artemis = {}));
//# sourceMappingURL=ComponentType.js.map