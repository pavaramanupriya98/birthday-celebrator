import Shape from "./Shape";
import getMouseCoords from "../../utils/mouseCoords";
import Arrow from "./Arrow";

import { sendDragEvent, EventLabels, EventNames } from "../../utils/analytics";
import Circle from "./Circle";
import { callOnce, convertDegreeToRadians } from "../../utils/helpers";

const sendDragEventOnce = callOnce(sendDragEvent);

const FAN_COLOR = '#777777';

export default class CandleBlower extends Shape {
  constructor(
    x, y
  ) {
    super();
    this.x = x;
    this.y = y;
    this.radius = 24;
    this.fillColor = FAN_COLOR;
    this.showArrow = true;
    this.rotation = 0;
  }

  update() {
    const { mouseX, mouseY } = getMouseCoords();

    this.updateMouseInteractionStatus();

    if(mouseX && mouseY && this.isBeingDragged) {
      if(
        this.x !== mouseX ||
        this.y !== mouseY
      ) {
        sendDragEventOnce(EventLabels.CAKE, EventNames.BLOWER_DRAGGED);
      }

      this.showArrow = false;
      this.x = mouseX;
      this.y = mouseY;
      this.rotation += convertDegreeToRadians(10);
    } else {
      this.showArrow = true;
    }
  }

  getPosition() {
    const { x, y } = this;
    return { x, y };
  }

  hitBoxOptions() {
    return {
      type: 'circle',
      x: this.x,
      y: this.y,
      radius: this.radius,
    }
  }

  draw() {
    const { 
      x, y, rotation, ctx, fillColor, showArrow
    } = this;
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.translate(x, y);
    showArrow && Arrow(ctx, 0, -120 + 10*Math.sin(Date.now()/150), true, 0.5);
    
    ctx.rotate(rotation);
    for(let i=0; i < 4; i++) {
      ctx.rotate(i*convertDegreeToRadians(90));
      Circle({
        ctx, x: 12, y: 0, radius: 12, endAngle: convertDegreeToRadians(180),
      });
    }
    Circle({ctx, x: 0, y: 0, radius: 4});
    ctx.restore();

  }
}