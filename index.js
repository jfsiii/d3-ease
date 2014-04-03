(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        function d3_class(ctor, properties) {
            try {
                for (var key in properties) {
                    Object.defineProperty(ctor.prototype, key, {
                        value: properties[key],
                        enumerable: false
                    });
                }
            } catch (e) {
                ctor.prototype = properties;
            }
        }
        d3.map = function(object) {
            var map = new d3_Map();
            if (object instanceof d3_Map) object.forEach(function(key, value) {
                map.set(key, value);
            }); else for (var key in object) map.set(key, object[key]);
            return map;
        };
        function d3_Map() {}
        d3_class(d3_Map, {
            has: d3_map_has,
            get: function(key) {
                return this[d3_map_prefix + key];
            },
            set: function(key, value) {
                return this[d3_map_prefix + key] = value;
            },
            remove: d3_map_remove,
            keys: d3_map_keys,
            values: function() {
                var values = [];
                this.forEach(function(key, value) {
                    values.push(value);
                });
                return values;
            },
            entries: function() {
                var entries = [];
                this.forEach(function(key, value) {
                    entries.push({
                        key: key,
                        value: value
                    });
                });
                return entries;
            },
            size: d3_map_size,
            empty: d3_map_empty,
            forEach: function(f) {
                for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) f.call(this, key.substring(1), this[key]);
            }
        });
        var d3_map_prefix = "\x00", d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
        function d3_map_has(key) {
            return d3_map_prefix + key in this;
        }
        function d3_map_remove(key) {
            key = d3_map_prefix + key;
            return key in this && delete this[key];
        }
        function d3_map_keys() {
            var keys = [];
            this.forEach(function(key) {
                keys.push(key);
            });
            return keys;
        }
        function d3_map_size() {
            var size = 0;
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) ++size;
            return size;
        }
        function d3_map_empty() {
            for (var key in this) if (key.charCodeAt(0) === d3_map_prefixCode) return false;
            return true;
        }
        var d3_arraySlice = [].slice, d3_array = function(list) {
            return d3_arraySlice.call(list);
        };
        function d3_identity(d) {
            return d;
        }
        var π = Math.PI, τ = 2 * π, halfπ = π / 2, ε = 1e-6, ε2 = ε * ε, d3_radians = π / 180, d3_degrees = 180 / π;
        function d3_sgn(x) {
            return x > 0 ? 1 : x < 0 ? -1 : 0;
        }
        function d3_cross2d(a, b, c) {
            return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
        }
        function d3_acos(x) {
            return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
        }
        function d3_asin(x) {
            return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
        }
        function d3_sinh(x) {
            return ((x = Math.exp(x)) - 1 / x) / 2;
        }
        function d3_cosh(x) {
            return ((x = Math.exp(x)) + 1 / x) / 2;
        }
        function d3_tanh(x) {
            return ((x = Math.exp(2 * x)) - 1) / (x + 1);
        }
        function d3_haversin(x) {
            return (x = Math.sin(x / 2)) * x;
        }
        var d3_ease_default = function() {
            return d3_identity;
        };
        var d3_ease = d3.map({
            linear: d3_ease_default,
            poly: d3_ease_poly,
            quad: function() {
                return d3_ease_quad;
            },
            cubic: function() {
                return d3_ease_cubic;
            },
            sin: function() {
                return d3_ease_sin;
            },
            exp: function() {
                return d3_ease_exp;
            },
            circle: function() {
                return d3_ease_circle;
            },
            elastic: d3_ease_elastic,
            back: d3_ease_back,
            bounce: function() {
                return d3_ease_bounce;
            }
        });
        var d3_ease_mode = d3.map({
            "in": d3_identity,
            out: d3_ease_reverse,
            "in-out": d3_ease_reflect,
            "out-in": function(f) {
                return d3_ease_reflect(d3_ease_reverse(f));
            }
        });
        d3.ease = function(name) {
            var i = name.indexOf("-"), t = i >= 0 ? name.substring(0, i) : name, m = i >= 0 ? name.substring(i + 1) : "in";
            t = d3_ease.get(t) || d3_ease_default;
            m = d3_ease_mode.get(m) || d3_identity;
            return d3_ease_clamp(m(t.apply(null, d3_arraySlice.call(arguments, 1))));
        };
        function d3_ease_clamp(f) {
            return function(t) {
                return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
            };
        }
        function d3_ease_reverse(f) {
            return function(t) {
                return 1 - f(1 - t);
            };
        }
        function d3_ease_reflect(f) {
            return function(t) {
                return .5 * (t < .5 ? f(2 * t) : 2 - f(2 - 2 * t));
            };
        }
        function d3_ease_quad(t) {
            return t * t;
        }
        function d3_ease_cubic(t) {
            return t * t * t;
        }
        function d3_ease_cubicInOut(t) {
            if (t <= 0) return 0;
            if (t >= 1) return 1;
            var t2 = t * t, t3 = t2 * t;
            return 4 * (t < .5 ? t3 : 3 * (t - t2) + t3 - .75);
        }
        function d3_ease_poly(e) {
            return function(t) {
                return Math.pow(t, e);
            };
        }
        function d3_ease_sin(t) {
            return 1 - Math.cos(t * halfπ);
        }
        function d3_ease_exp(t) {
            return Math.pow(2, 10 * (t - 1));
        }
        function d3_ease_circle(t) {
            return 1 - Math.sqrt(1 - t * t);
        }
        function d3_ease_elastic(a, p) {
            var s;
            if (arguments.length < 2) p = .45;
            if (arguments.length) s = p / τ * Math.asin(1 / a); else a = 1, s = p / 4;
            return function(t) {
                return 1 + a * Math.pow(2, -10 * t) * Math.sin((t - s) * τ / p);
            };
        }
        function d3_ease_back(s) {
            if (!s) s = 1.70158;
            return function(t) {
                return t * t * ((s + 1) * t - s);
            };
        }
        function d3_ease_bounce(t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        }
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();