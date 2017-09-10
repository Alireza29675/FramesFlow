import './style.css'
import '../../src/index.js' // FramesFlow

framesFlow = window.framesFlow;

// console.clear()

const firstCircle = document.querySelector('.circle:nth-child(1)');
const secondCircle = document.querySelector('.circle:nth-child(2)');
const thirdCircle = document.querySelector('.circle:nth-child(3)');

framesFlow.onLag(30, fps => console.log('LAGGED WITH ' + fps + 'fps speed'));

framesFlow.render(frame => {
    const W = window.innerWidth, H = window.innerHeight;
    firstCircle.style.left = W/2 + Math.sin(frame.index / 100) * W/3 + "px";
    firstCircle.style.top = H/2 + Math.sin(frame.index / 25) * 100 + "px"
}).fps = 2;

framesFlow.render(frame => {
    const W = window.innerWidth, H = window.innerHeight;
    thirdCircle.style.left = W/2 + Math.sin(frame.index / 100) * W/3 + "px";
    thirdCircle.style.top = H/2 + Math.sin(frame.index / 25) * 100 + "px"
}).fps = 1;

framesFlow.render(frame => {
    const W = window.innerWidth, H = window.innerHeight;
    secondCircle.style.left = W/2 + Math.sin(frame.index / 100) * W/3 + "px";
    secondCircle.style.top = H/2 + Math.sin(frame.index / 25) * 100 + "px"
});