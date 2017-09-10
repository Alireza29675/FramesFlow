'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _FramesFlow = require('./components/FramesFlow');

var _FramesFlow2 = _interopRequireDefault(_FramesFlow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// defining framesFlow as a global object
if (!(window.framesFlow instanceof _FramesFlow2.default)) {
    // if it didn't define before
    window.framesFlow = new _FramesFlow2.default();
}

// export
exports.default = window.framesFlow;