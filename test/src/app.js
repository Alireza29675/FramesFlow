import './style.css'
import ff from '../../src/index.js'

const circle = document.querySelector('#circle')

ff.setGlobalFPS(60)
window.a = ff.render(frame => {
    circle.style.left = 100 + frame.index * 5 + "px"
}).setFPS(15)