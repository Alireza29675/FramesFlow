const requestAnimationFrame = require('./components/requestAnimationFrame')

class FramesFlow {

    /**
     * Represents a FramesFlow
     * @constructor
     */
    constructor () {
        this.fps = 0;   
    }

    /**
     * renders all renderers
     */
    render () {

        requestAnimationFrame(() => this.render())
    }

}

const framesFlow = new FramesFlow

module.exports = framesFlow;