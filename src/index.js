import FramesFlow from './components/FramesFlow'

// defining framesFlow as a global object
if (!(window.framesFlow instanceof FramesFlow)) { // if it didn't define before
    window.framesFlow = new FramesFlow()
}

// export
export default window.framesFlow