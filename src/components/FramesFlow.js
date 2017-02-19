import Renderer from './Renderer'

// Compatibility for all browsers - Paul Irish version
window.requestAnimFrame = (function () {
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60)
          }
})()

// FramesFlow
class FramesFlow {
    constructor () {
        this.frames = 0
        this.fps = 30
        this.renderers = []
        this.requestLoop()
    }
    getAllRenderers () { return this.renderers.filter(renderer => renderer instanceof Renderer) }
    get (id) { return this.getById(id) }
    getById (id) { return this.renderers[id] }
    getAllByClass (className) { return this.getAllRenderers().filter(renderer => renderer.class == className) }
    removeRendererById (id) { this.renderers[id] = undefined }
    checkValidationOfFrameRate (rate, isGlobalCheck = false) {
        let error = null
        const pointer = isGlobalCheck ? 'any' : 'this'
        if (rate < 0) error = 'FPS must not be a negative number!'
        else if (rate < 30 && rate > 0 && (30 / rate) % 1 !== 0) error = 'if FPS is less than 30fps, it have to be like this: (30 / FPS) should be integer'
        else if (rate > 30 && rate % 30 !== 0) error = 'if FPS is more than 30fps, it have to be like this: (FPS % 30 == 0)'
        if (error !== null) throw `can't set ${rate}fps for this renderer. REASON: <${error}>`
    }
    getGlobalFPS () {
        return this.fps
    }
    playAll () {
        for (let renderer of this.getAllRenderers()) renderer.play()
    }
    pauseAll () {
        for (let renderer of this.getAllRenderers()) renderer.pause()
    }
    setGlobalFPS (rate) {
        try {
            this.checkValidationOfFrameRate(rate, true)
            this.fps = rate
        } catch (e) {
            console.error(e)
        }
        return this
    }
    render (className, func) {
        if (typeof className == 'function') {
            func = className
            className = ''
        }
        const renderer = new Renderer(this, {
            id: this.renderers.length,
            class: className
        }, func)
        this.renderers.push(renderer)
        return renderer
    }
    requestLoop () {
        requestAnimFrame(this.requestLoop.bind(this))
        this.frames++
        for (let renderer of this.getAllRenderers()) renderer.render()
    }
}

export default FramesFlow