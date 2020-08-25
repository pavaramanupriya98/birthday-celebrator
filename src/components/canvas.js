import initCanvasDimensions, { getCanvasWidth, getCanvasHeight } from "../utils/dimensions";
import cake from "../shapes/cake";
import knife from "../shapes/knife";
import radians from "../utils/radians";

export default () => {
  const canvas = document.querySelector('canvas');
  initCanvasDimensions(canvas);
  let mouseX = getCanvasWidth()/2;
  let mouseY = getCanvasHeight()/2;

  window.addEventListener('mousemove', event => {
    mouseX = event.x;
    mouseY = event.y;
  });

  let step = 1;

  window.addEventListener('mouseup', () => {
    step = 1 - step;
  });

  const ctx = canvas.getContext('2d');

  function background() {
    ctx.save();
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, getCanvasWidth(), getCanvasHeight());
    ctx.restore();
  }

  function draw() {
    requestAnimationFrame(draw);
    background();
    cake(ctx, radians(180), 0);
    step === 0 && knife(ctx, getCanvasWidth()/2 + 150, mouseY, step);
    cake(ctx, 0, radians(45));
    step === 1 && knife(ctx, getCanvasWidth()/2 + 150, mouseY, step);
    cake(ctx, radians(45), radians(180));
  }

  draw();
}