let CANVAS_WIDTH = 0;
let CANVAS_HEIGHT = 0;

export const getCanvasWidth = () => CANVAS_WIDTH;
export const getCanvasHeight = () => CANVAS_HEIGHT;
export const rem = () => Math.min(getCanvasHeight(), getCanvasWidth());

export default (canvas) => {
  function updateCanvasDimensions() {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }

  updateCanvasDimensions();

  if (typeof window !== 'undefined') {
    window.addEventListener("resize", updateCanvasDimensions);
  }
}

