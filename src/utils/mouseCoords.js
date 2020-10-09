import { getCanvasWidth, getCanvasHeight } from "./dimensions";

let mouseX = getCanvasWidth()/2;
let mouseY = getCanvasHeight()/2;
let clickX = 0;
let clickY = 0;
let isDragging = false;

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', event => {
    mouseX = event.x;
    mouseY = event.y;
  });

  window.addEventListener('mousedown', event => {
    if(isDragging === false) {
      clickX = event.x;
      clickY = event.y;
    }
    isDragging = true;
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

export default () => ({ mouseX, mouseY, clickX, clickY, isDragging });
export function resetDrag () { isDragging = false };