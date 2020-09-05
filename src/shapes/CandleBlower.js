import Shape from "./Shape";
import radians from "../utils/radians";
import getMouseCoords from "../utils/mouseCoords";

const FAN_COLOR = '#777777';

export default class CandleBlower extends Shape {
  constructor(
    x, y
  ) {
    super();
    this.x = x;
    this.y = y;
    this.fillColor = FAN_COLOR;
  }

  update() {
    const { mouseX, mouseY } = getMouseCoords();
    if(mouseX && mouseY) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  getPosition() {
    const { x, y } = this;
    return { x, y };
  }

  activate() {
    this.fillColor = "#00a0fe";
  }

  draw() {
    const { 
      x, y, ctx, fillColor
    } = this;

    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0 ,0 , 10, 0, radians(360));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}