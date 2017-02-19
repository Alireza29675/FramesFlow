class Renderer {
    constructor (framesFlow, func) {
        this.props = {
            isDebuging: false
        }
        this.framesFlow = framesFlow
        this.fps = undefined
        this.func = func
        this.frames = 0
    }
    getFPS () {
        return this.fps || this.framesFlow.getGlobalFPS()
    }
    setFPS (rate) {
        try {
            this.framesFlow._checkValidationOfFrameRate(rate)
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
            index: this.frames
        }
    }
    render () {
        if (this.shouldRenderThisFrame()) for (let i = 0; i < Math.max(this.getFPS(), 30) / 30; i++) {
            this.frames++
            this.func(this.getFrameObjectToReturn())
        }
    }
}

export default Renderer