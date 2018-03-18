class RenderManager {

    /**
     * Represents a RenderManager
     * @constructor
     */
    constructor () {
        this.frames = 0;
        this.renderers = [];
    }

    /**
     * renders all renderers
     */
    render () {
        // counting frames
        this.frames++;

        // rendering all renderers
        const renderers = this.renderers.filter(item => typeof item === 'function');
        for (let renderer of renderers) {
            renderer.call(this.frames);
        }

        // requesting a loop again
        requestAnimationFrame(() => this.render());
    }
    
}

const renderManager = new RenderManager;

module.exports = renderManager;