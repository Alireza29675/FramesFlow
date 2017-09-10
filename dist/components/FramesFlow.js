'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RendererArray = require('./RendererArray');

var _RendererArray2 = _interopRequireDefault(_RendererArray);

var _Renderer = require('./Renderer');

var _Renderer2 = _interopRequireDefault(_Renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Compatibility for all browsers - Paul Irish version
window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
}();

// FramesFlow

var FramesFlow = function () {
    function FramesFlow() {
        _classCallCheck(this, FramesFlow);

        this.frames = 0;
        this._fps = 30;
        this.options = {
            minimumAcceptableFPS: 30
        };
        this.renderers = new _RendererArray2.default();
        this.performance = {
            logs: new Array(100),
            logsPointer: 0,
            lastTimeStamp: undefined,
            lastFrameFPS: 30,
            ratio: 1,
            status: 0,
            average: {
                fps: 30,
                ratio: 1,
                status: 0
            }
        };
        this.requestLoop();
    }

    _createClass(FramesFlow, [{
        key: 'get',
        value: function get(id) {
            return this.renderers.get(id);
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            return this.renderers;
        }
    }, {
        key: 'getAllByClass',
        value: function getAllByClass(className) {
            return this.renderers.filter(function (renderer) {
                return renderer.class == className;
            });
        }
    }, {
        key: 'removeRendererById',
        value: function removeRendererById(id) {
            this.renderers.remove(id);
        }
    }, {
        key: 'checkValidationOfFrameRate',
        value: function checkValidationOfFrameRate(rate) {
            var isGlobalCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var error = null;
            var pointer = isGlobalCheck ? 'any' : 'this';
            if (rate < 0) error = 'FPS must not be a negative number!';else if (rate < 30 && rate > 0 && 30 / rate % 1 !== 0) error = 'if FPS is less than 30fps, it have to be like this: (30 / FPS) should be integer';else if (rate > 30 && rate % 30 !== 0) error = 'if FPS is more than 30fps, it have to be like this: (FPS % 30 == 0)';
            if (error !== null) throw 'can\'t set ' + rate + 'fps for this renderer. REASON: <' + error + '>';
        }
    }, {
        key: 'playAll',
        value: function playAll() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.getAllRenderers()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var renderer = _step.value;
                    renderer.play();
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
        key: 'pauseAll',
        value: function pauseAll() {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.getAllRenderers()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var renderer = _step2.value;
                    renderer.pause();
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'render',
        value: function render(className, func) {
            if (typeof className == 'function') {
                func = className;
                className = '';
            }
            var renderer = new _Renderer2.default(this, {
                id: this.renderers.length,
                class: className
            }, func);
            this.renderers.push(renderer);
            return renderer;
        }
    }, {
        key: 'onLag',
        value: function onLag(minimumFPS, callback) {
            if (typeof minimumFPS == 'function') callback = minimumFPS;else this.options.minimumAcceptableFPS = minimumFPS;
            this.onLagCallback = callback;
        }
    }, {
        key: 'registerPerformanceLog',
        value: function registerPerformanceLog(renderTime) {
            // Calculating fps
            this.performance.lastFrameFPS = 1000 / renderTime;
            // Calculating lags
            if (this.performance.lastFrameFPS < this.options.minimumAcceptableFPS) if (typeof this.onLagCallback === 'function') this.onLagCallback(this.performance.lastFrameFPS);
            // logging
            this.performance.logs[this.performance.logsPointer] = this.performance.lastFrameFPS;
            this.performance.logsPointer = (this.performance.logsPointer + 1) % 100;
            // analyzing logs
            this.analyzePerformance();
        }
    }, {
        key: 'analyzePerformance',
        value: function analyzePerformance() {
            var allData = this.performance.logs.filter(function (data) {
                return typeof data == 'number';
            });
            // Calculating average of data
            var FPSSum = 0;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = allData[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var data = _step3.value;
                    FPSSum += data;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            this.performance.average.fps = FPSSum / allData.length;
            // Calculating performance percentage
            this.performance.ratio = this.performance.lastFrameFPS / 30;
            this.performance.average.ratio = this.performance.average.fps / 30;
            // defining status
            this.performance.status = this._getStatusOfFPS(this.performance.lastFrameFPS);
            this.performance.average.status = this._getStatusOfFPS(this.performance.average.fps);
        }
    }, {
        key: '_getStatusOfFPS',
        value: function _getStatusOfFPS(fps) {
            var ratio = fps / this.fps;
            var status = -3; // WORST
            if (ratio > 0.3) status = -2; // BAD
            if (ratio > 0.6) status = -1; // NOT BAD
            if (ratio > 0.9) status = 0; // OK
            if (ratio > 1.3) status = 1; // GOOD
            if (ratio > 1.6) status = 2; // EXCELLENT
            if (ratio > 2) status = 3; // BEST
            return status;
        }
    }, {
        key: 'requestLoop',
        value: function requestLoop() {
            requestAnimFrame(this.requestLoop.bind(this));
            this.frames++;
            this.renderers.each(function (renderer) {
                return renderer.render();
            });
            if (this.performance.lastTimeStamp !== undefined) this.registerPerformanceLog(Date.now() - this.performance.lastTimeStamp);
            this.performance.lastTimeStamp = Date.now();
        }
    }, {
        key: 'fps',
        get: function get() {
            return this._fps;
        },
        set: function set(newFPS) {
            try {
                this.checkValidationOfFrameRate(rate, true);
                this._fps = newFPS;
            } catch (e) {
                console.error(e);
            }
        }
    }]);

    return FramesFlow;
}();

exports.default = FramesFlow;