import './style.css'
import ff from '../../src/index.js'

console.clear()

const circle = document.querySelector('#circle')

ff.setGlobalFPS(60)
ff.onLag(50, fps => console.log('LAGGED WITH ' + fps + 'fps speed'))
ff.render('myclass', frame => {
    const W = window.innerWidth, H = window.innerHeight
    circle.style.left = W/2 + Math.sin(frame.index / 100) * W/3 + "px"
})