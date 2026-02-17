// Render overlay first for fast first paint
import './overlay/main.jsx'

// Load 3D experience in background after overlay is visible
const canvas = document.querySelector('canvas.webgl')
if (canvas) {
  import('./Experience/Experience.js').then(({ default: Experience }) => {
    new Experience(canvas)
  })
}
