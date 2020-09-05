import { getCanvasWidth, getCanvasHeight } from "./dimensions";

let mouseX = getCanvasWidth()/2;
let mouseY = getCanvasHeight()/2;

window.addEventListener('mousemove', event => {
  mouseX = event.x;
  mouseY = event.y;
});

export default () => ({ mouseX, mouseY });