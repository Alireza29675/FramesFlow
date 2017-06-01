class Renderer {
    constructor (framesFlow, options, func) {
        this.id = options.id
        this.class = options.class || ''
        this.props = {
            isDebuging: false
        }
        this.framesFlow = framesFlow
        this._fps = undefined
        this.func = func
        this.frames = 0
        this.shouldGoNext = false
        this.render()
    }
    // Render next frame
    next () {
        this.shouldGoNext = true
    }
    remove () {
        this.framesFlow.removeRendererById(this.id)
    }
    pause () {
        this.props.isDebuging = true
    }
    play () {
        this.props.isDebuging = false
    }
    set fps (newFPS) {
        if (newFPS == undefined) return this._fps = newFPS
        try {
            this.framesFlow.checkValidationOfFrameRate(newFPS)
            this._fps = newFPS
        } catch (e) {
            console.error(e)
        }
    }
    get fps () {
        return this._fps || this.framesFlow.fps
    }
    shouldRenderThisFrame () {
        // all conditions to pause or play rendering
        const conditions = [
            !this.props.isDebuging,
            this.framesFlow.frames % (30 / Math.min(this.fps, 30)) == 0,
        ]
        let ret = true
        for (let cond of conditions) ret = ret && cond
        return ret
    }
    getFrameObjectToReturn () {
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
        }
    }
    render () {
        if (this.shouldRenderThisFrame() || this.shouldGoNext) {
            let iteration = 0
            if (this.fps > 30) iteration = (Math.max(this.fps, 30) / 30)
            else iteration = 30 / this.fps
            for (let i = 0; i < iteration; i++) {
                this.frames++
                this.shouldGoNext = false
                this.func(this.getFrameObjectToReturn())
            }
        }
    }
}

export default Renderer