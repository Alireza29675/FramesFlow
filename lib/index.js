'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var renderManager = require('./components/renderManager');

var FramesFlow = function () {

    /**
     * Represents a FramesFlow
     * @constructor
     */
    function FramesFlow() {
        _classCallCheck(this, FramesFlow);
    }

    /**
     * adds a function to main renderer
     * @param {function} renderFunction 
     */


    _createClass(FramesFlow, [{
        key: 'render',
        value: function render(renderFunction) {
            // if it was a function let's add it to render-manager
            if (typeof renderFunction === 'function') {
                renderManager.add(renderFunction);
            }
        }
    }]);

    return FramesFlow;
}();

var framesFlow = new FramesFlow();

module.exports = framesFlow;