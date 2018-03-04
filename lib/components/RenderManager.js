'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderManager = function () {

    /**
     * Represents a RenderManager
     * @constructor
     */
    function RenderManager() {
        _classCallCheck(this, RenderManager);

        this.frames = 0;
        this.renderers = [];
    }

    /**
     * renders all renderers
     */


    _createClass(RenderManager, [{
        key: 'render',
        value: function render() {
            var _this = this;

            // counting frames
            this.frames++;

            // rendering all renderers
            var renderers = this.renderers.filter(function (item) {
                return typeof item === 'function';
            });
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = renderers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var renderer = _step.value;

                    renderer.call();
                }

                // requesting a loop again
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

            requestAnimationFrame(function () {
                return _this.render();
            });
        }
    }]);

    return RenderManager;
}();

var renderManager = new RenderManager();

module.exports = renderManager;