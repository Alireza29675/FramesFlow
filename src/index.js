const renderManager = require('./components/renderManager')

class FramesFlow {

    /**
     * Represents a FramesFlow
     * @constructor
     */
    constructor () {

    }

    /**
     * adds a function to main renderer
     * @param {function} renderFunction 
     */
    render (renderFunction) {
        // if it was a function let's add it to render-manager
        if (typeof renderFunction === 'function') {
            renderManager.add(renderFunction);
        }
    }

}

const framesFlow = new FramesFlow

module.exports = framesFlow;