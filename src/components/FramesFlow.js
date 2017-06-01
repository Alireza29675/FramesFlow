import RendererArray from './RendererArray'
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
        this._fps = 30
        this.options = {
            minimumAcceptableFPS: 30
        }
        this.renderers = new RendererArray
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
        }
        this.requestLoop()
    }
    get (id) {
        return this.renderers.get(id)
    }
    getAll () {
        return this.renderers
    }
    getAllByClass (className) {
        return this.renderers.filter(renderer => renderer.class == className)
    }
    removeRendererById (id) {
        this.renderers.remove(id)
    }
    checkValidationOfFrameRate (rate, isGlobalCheck = false) {
        let error = null
        const pointer = isGlobalCheck ? 'any' : 'this'
        if (rate < 0) error = 'FPS must not be a negative number!'
        else if (rate < 30 && rate > 0 && (30 / rate) % 1 !== 0) error = 'if FPS is less than 30fps, it have to be like this: (30 / FPS) should be integer'
        else if (rate > 30 && rate % 30 !== 0) error = 'if FPS is more than 30fps, it have to be like this: (FPS % 30 == 0)'
        if (error !== null) throw `can't set ${rate}fps for this renderer. REASON: <${error}>`
    }
    get fps () {
        return this._fps
    }
    set fps (newFPS) {
        try {
            this.checkValidationOfFrameRate(rate, true)
            this._fps = newFPS
        } catch (e) {
            console.error(e)
        }
    }
    playAll () {
        for (let renderer of this.getAllRenderers()) renderer.play()
    }
    pauseAll () {
        for (let renderer of this.getAllRenderers()) renderer.pause()
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
    onLag (minimumFPS, callback) {
        if (typeof minimumFPS == 'function') callback = minimumFPS
        else this.options.minimumAcceptableFPS = minimumFPS
        this.onLagCallback = callback
    }
    registerPerformanceLog (renderTime) {
        // Calculating fps
        this.performance.lastFrameFPS = 1000 / renderTime
        // Calculating lags
        if (this.performance.lastFrameFPS < this.options.minimumAcceptableFPS) if (typeof this.onLagCallback === 'function') this.onLagCallback(this.performance.lastFrameFPS)
        // logging
        this.performance.logs[this.performance.logsPointer] = this.performance.lastFrameFPS
        this.performance.logsPointer = (this.performance.logsPointer + 1) % 100
        // analyzing logs
        this.analyzePerformance()
    }
    analyzePerformance () {
        const allData = this.performance.logs.filter(data => typeof data == 'number')
        // Calculating average of data
        let FPSSum = 0
        for (let data of allData) FPSSum += data
        this.performance.average.fps = FPSSum / allData.length
        // Calculating performance percentage
        this.performance.ratio = this.performance.lastFrameFPS / 30
        this.performance.average.ratio = this.performance.average.fps / 30
        // defining status
        this.performance.status = this._getStatusOfFPS(this.performance.lastFrameFPS)
        this.performance.average.status = this._getStatusOfFPS(this.performance.average.fps)
    }
    _getStatusOfFPS (fps) {
        const ratio = fps / this.fps
        let status = -3 // WORST
        if (ratio > 0.3) status = -2 // BAD
        if (ratio > 0.6) status = -1 // NOT BAD
        if (ratio > 0.9) status = 0 // OK
        if (ratio > 1.3) status = 1 // GOOD
        if (ratio > 1.6) status = 2 // EXCELLENT
        if (ratio > 2) status = 3 // BEST
        return status
    }
    requestLoop () {
        requestAnimFrame(this.requestLoop.bind(this))
        this.frames++
        this.renderers.each(renderer => renderer.render())
        if (this.performance.lastTimeStamp !== undefined) this.registerPerformanceLog(Date.now() - this.performance.lastTimeStamp)
        this.performance.lastTimeStamp = Date.now()
    }
}

export default FramesFlow