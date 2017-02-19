class Renderer {
    constructor (framesFlow, options, func) {
        this.id = options.id
        this.class = options.class || ''
        this.props = {
            isDebuging: false
        }
        this.framesFlow = framesFlow
        this.fps = undefined
        this.func = func
        this.frames = 0
        this.shouldGoNext = false
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
    getFPS () {
        return this.fps || this.framesFlow.getGlobalFPS()
    }
    setFPS (rate) {
        try {
            this.framesFlow.checkValidationOfFrameRate(rate)
            this.fps = rate
        } catch (e) {
            console.error(e)
        }
        return this
    }
    unsetFPS () {
        this.fps = undefined
    }
    shouldRenderThisFrame () {
        // all conditions to pause or play rendering
        const conditions = [
            !this.props.isDebuging,
            this.framesFlow.frames % (30 / Math.min(this.getFPS(), 30)) == 0,
        ]
        let ret = true
        for (let cond of conditions) ret = ret && cond
        return ret
    }
    getFrameObjectToReturn () {
        return {
            renderer: this,
            index: this.frames,
            fps: this.fps
        }
    }
    render () {
        if (this.shouldRenderThisFrame() || this.shouldGoNext) for (let i = 0; i < Math.max(this.getFPS(), 30) / 30; i++) {
            this.frames++
            this.shouldGoNext = false
            this.func(this.getFrameObjectToReturn())
        }
    }
}

export default Renderer