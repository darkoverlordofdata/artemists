var artemis;
(function (artemis) {
    var utils;
    (function (utils) {
        function decode(key) {
            switch (typeof key) {
                case 'boolean': return '' + key;
                case 'number': return '' + key;
                case 'string': return key;
                case 'function': return key.className | key.name;
                default:
                    return key.uuid = key.uuid ? key.uuid : utils.UUID.randomUUID();
            }
        }
        var HashMap = (function () {
            function HashMap() {
                this.clear();
            }
            HashMap.prototype.clear = function () {
                this.map_ = {};
            };
            HashMap.prototype.values = function () {
                var data = [];
                for (var key in this.map_) {
                    data.push(this.map_[key]);
                }
                return data;
            };
            HashMap.prototype.contains = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.containsKey = function (key) {
                return decode(key) in this.map_;
            };
            HashMap.prototype.containsValue = function (value) {
                for (var key in this.map_) {
                    if (value === this.map_[key]) {
                        return true;
                    }
                }
                return false;
            };
            HashMap.prototype.get = function (key) {
                return this.map_[decode(key)];
            };
            HashMap.prototype.isEmpty = function () {
                return Object.keys(this.map_).length === 0;
            };
            HashMap.prototype.keys = function () {
                return Object.keys(this.map_);
            };
            /**
             * if key is a string, use as is, else use key.id_ or key.name
             */
            HashMap.prototype.put = function (key, value) {
                this.map_[decode(key)] = value;
            };
            HashMap.prototype.remove = function (key) {
                delete this.map_[decode(key)];
            };
            HashMap.prototype.size = function () {
                return Object.keys(this.map_).length;
            };
            return HashMap;
        })();
        utils.HashMap = HashMap;
    })(utils = artemis.utils || (artemis.utils = {}));
})(artemis || (artemis = {}));
//# sourceMappingURL=HashMap.js.map