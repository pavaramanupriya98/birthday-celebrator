import { getCanvasWidth, getCanvasHeight } from "./dimensions";
import { isTouchDevice } from "./helpers";

let mouseX = getCanvasWidth()/2;
let mouseY = getCanvasHeight()/2;
let clickX = 0;
let clickY = 0;
let isDragging = false;

if (typeof window !== 'undefined') {
  let mousemove = 'mousemove';
  let mousedown = 'mousedown';
  let mouseup = 'mouseup';
  
  if (isTouchDevice()) {
    mousemove = 'touchmove';
    mousedown = 'touchstart';
    mouseup = 'touchend';
  }

  window.addEventListener(mousemove, event => {
    mouseX = event.x || (event.targetTouches && event.targetTouches[0].clientX);
    mouseY = event.y || (event.targetTouches && event.targetTouches[0].clientY);
  });

  window.addEventListener(mousedown, event => {
    if(isDragging === false) {
      clickX = event.x || (event.targetTouches && event.targetTouches[0].clientX);
      clickY = event.y || (event.targetTouches && event.targetTouches[0].clientY);
    }
    isDragging = true;
  });

  window.addEventListener(mouseup, () => {
    isDragging = false;
  });

}

export default () => ({ mouseX, mouseY, clickX, clickY, isDragging });
export function resetDrag () { isDragging = false };