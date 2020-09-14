import radians from "../utils/radians";
import getMouseCoords from "../utils/mouseCoords";
import Shape from "./Shape";
import { getCanvasHeight } from "../utils/dimensions";

const KNIFE_COLOR = '#555555';

export default class Knife extends Shape {
  constructor(
    x, 
    y = 0,
  ) {
    super();
    const { mouseY } = getMouseCoords();
    this.x = x;
    this.initY = (getCanvasHeight()/2) - 200;
    this.y = this.initY;
    this.initMouseCoords = mouseY;
    this.animate = true;
  }

  update() {
    if(!this.animate) return;
    const { mouseY } = getMouseCoords();
    this.y = Math.min(mouseY, this.initY + 120);
  }

  getPosition() {
    const { x, y } = this;
    return { x, y };
  }

  stopAnimating() {
    this.animate = false;
  }

  draw(step) {
    const { ctx, x, y } = this;

    ctx.save();
    ctx.fillStyle = KNIFE_COLOR;
    ctx.beginPath();
    ctx.translate(x, y);
    step === 1 && ctx.rotate(radians(45));
    step === 1 && ctx.transform(1, -0.32, 0.25, 1, 0, 0);
    ctx.moveTo(150, -25);
    ctx.lineTo(-150, -25);
    ctx.arc(-100, -25, 50, radians(180), radians(90), true);
    ctx.lineTo(50, 25);
    ctx.lineTo(50,0);
    ctx.lineTo(150,0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}