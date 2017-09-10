'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RendererArray = function () {
    function RendererArray() {
        _classCallCheck(this, RendererArray);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        if (typeof args[0] === 'array') this.arr = args[0];else this.arr = new (Function.prototype.bind.apply(Array, [null].concat(args)))();
    }

    _createClass(RendererArray, [{
        key: 'get',
        value: function get(i) {
            return this.arr[i];
        }
    }, {
        key: 'set',
        value: function set(i, val) {
            this.arr[i] = val;
            return this;
        }
    }, {
        key: 'push',
        value: function push(val) {
            this.arr.push(val);
            return this;
        }
    }, {
        key: 'remove',
        value: function remove(i) {
            this.arr[i] = undefined;
            this.arr.splice(i, 1);
            return this;
        }
    }, {
        key: 'filter',
        value: function filter(condFunc) {
            return new RendererArray(this.arr.filter(condFunc));
        }
    }, {
        key: 'each',
        value: function each(cb) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;
                    cb(item);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'toArray',
        value: function toArray() {
            return this.arr;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.each(function (renderer) {
                return renderer.remove();
            });
        }
    }, {
        key: 'next',
        value: function next() {
            this.each(function (renderer) {
                return renderer.next();
            });
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.each(function (renderer) {
                return renderer.pause();
            });
        }
    }, {
        key: 'play',
        value: function play() {
            this.each(function (renderer) {
                return renderer.play();
            });
        }
    }, {
        key: 'length',
        get: function get() {
            return this.arr.length;
        }
    }, {
        key: 'fps',
        set: function set(newFPS) {
            this.each(function (renderer) {
                return renderer.fps = newFPS;
            });
        }
    }]);

    return RendererArray;
}();

exports.default = RendererArray;