import Shape from "./Shape"
import { getCanvasWidth, getCanvasHeight } from "../utils/dimensions";

export default class Background extends Shape {
  draw() {
    const { ctx } = this;
    ctx.save();
    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, getCanvasWidth(), getCanvasHeight());
    ctx.restore();
  }
}