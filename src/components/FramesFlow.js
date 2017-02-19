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
        this.requestRenderFrame()
    }
    _checkValidationOfFrameRate (rate, isGlobalCheck = false) {
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
    setGlobalFPS (rate) {
        try {
            this._checkValidationOfFrameRate(rate, true)
            this.fps = rate
        } catch (e) {
            console.error(e)
        }
        return this
    }
    render (func) {
        const renderer = new Renderer(this, func)
        this.renderers.push(renderer)
        return renderer
    }
    requestRenderFrame () {
        requestAnimFrame(this.requestRenderFrame.bind(this))
        this.frames++
        for (let renderer of this.renderers) renderer.render()
    }
}

export default FramesFlow