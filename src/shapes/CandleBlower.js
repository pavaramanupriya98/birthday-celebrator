import Shape from "./Shape";
import radians from "../utils/radians";
import getMouseCoords from "../utils/mouseCoords";
import Arrow from "./Arrow";

import { sendDragEvent, EventLabels, EventNames } from "../utils/analytics";
import callOnce from "../utils/callOnce";

const sendDragEventOnce = callOnce(sendDragEvent);

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
    const { x, y } = this;
    if(mouseX && mouseY) {
      if(
        x !== mouseX ||
        y !== mouseY
      ) {
        sendDragEventOnce(EventLabels.CAKE, EventNames.BLOWER_DRAGGED);
      }

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
    ctx.arc(0 , 0, 20, 0, radians(360));
    ctx.closePath();
    ctx.fill();
    Arrow(ctx, 0, -100 + 10*Math.sin(Date.now()/150), true, 0.5);
    ctx.restore();

  }
}