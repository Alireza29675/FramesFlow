'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
    function Renderer(framesFlow, options, func) {
        _classCallCheck(this, Renderer);

        this.id = options.id;
        this.class = options.class || '';
        this.props = {
            isDebuging: false
        };
        this.framesFlow = framesFlow;
        this._fps = undefined;
        this.func = func;
        this.frames = 0;
        this.shouldGoNext = false;
        this.render();
    }
    // Render next frame


    _createClass(Renderer, [{
        key: 'next',
        value: function next() {
            this.shouldGoNext = true;
        }
    }, {
        key: 'remove',
        value: function remove() {
            this.framesFlow.removeRendererById(this.id);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.props.isDebuging = true;
        }
    }, {
        key: 'play',
        value: function play() {
            this.props.isDebuging = false;
        }
    }, {
        key: 'shouldRenderThisFrame',
        value: function shouldRenderThisFrame() {
            // all conditions to pause or play rendering
            var conditions = [!this.props.isDebuging, this.framesFlow.frames % (30 / Math.min(this.fps, 30)) == 0];
            var ret = true;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = conditions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cond = _step.value;
                    ret = ret && cond;
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

            return ret;
        }
    }, {
        key: 'getFrameObjectToReturn',
        value: function getFrameObjectToReturn() {
            return {
                renderer: this,
                index: this.frames,
                fps: this.fps,
                performance: {
                    fps: this.framesFlow.performance.lastFrameFPS,
                    ratio: this.framesFlow.performance.ratio,
                    status: this.framesFlow.performance.status,
                    average: this.framesFlow.performance.average
                }
            };
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.shouldRenderThisFrame() || this.shouldGoNext) {
                var iteration = 0;
                if (this.fps > 30) iteration = Math.max(this.fps, 30) / 30;else iteration = 30 / this.fps;
                for (var i = 0; i < iteration; i++) {
                    this.frames++;
                    this.shouldGoNext = false;
                    this.func(this.getFrameObjectToReturn());
                }
            }
        }
    }, {
        key: 'fps',
        set: function set(newFPS) {
            if (newFPS == undefined) return this._fps = newFPS;
            try {
                this.framesFlow.checkValidationOfFrameRate(newFPS);
                this._fps = newFPS;
            } catch (e) {
                console.error(e);
            }
        },
        get: function get() {
            return this._fps || this.framesFlow.fps;
        }
    }]);

    return Renderer;
}();

exports.default = Renderer;