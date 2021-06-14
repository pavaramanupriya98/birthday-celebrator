const MAX_CANVAS_WIDTH = 1200;
const MAX_CANVAS_HEIGHT = 800;
let CANVAS_WIDTH = 0;
let CANVAS_HEIGHT = 0;
let SCALE_X = 1;
let SCALE_Y = 1;

export const getCanvasWidth = () => CANVAS_WIDTH;
export const getCanvasHeight = () => CANVAS_HEIGHT;
export const getScaleX = () => SCALE_X;
export const getScaleY = () => SCALE_Y;
export const rem = () => Math.min(getCanvasHeight(), getCanvasWidth());

export default (canvas) => {
  function updateCanvasDimensions() {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    SCALE_X = Math.max(CANVAS_WIDTH / MAX_CANVAS_WIDTH, 0.5);
    SCALE_Y = 0.5 * (CANVAS_HEIGHT / MAX_CANVAS_HEIGHT);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }

  updateCanvasDimensions();

  if (typeof window !== 'undefined') {
    window.addEventListener("resize", updateCanvasDimensions);
  }
}

