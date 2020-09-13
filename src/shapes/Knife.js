import radians from "../utils/radians";
import getMouseCoords from "../utils/mouseCoords";
import Shape from "./Shape";
import { sendDragEvent, EventLabels, EventNames } from "../utils/analytics";
import callOnce from "../utils/callOnce";

const KNIFE_COLOR = '#555555';

const sendDragEventOnce = callOnce(sendDragEvent);

export default class Knife extends Shape {
  constructor(
    x,
    initY = 0,
    highBound = -100,
    lowBound = 100,
  ) {
    super();
    const { mouseY } = getMouseCoords();
    this.x = x;
    this.initY = initY - 25;
    this.y = this.initY;
    this.initMouseCoords = mouseY;
    this.animate = true;
    this.highBound = highBound;
    this.lowBound = lowBound;
  }

  update() {
    if(!this.animate) return;
    const { mouseY } = getMouseCoords();
    if(this.y !== mouseY) {
      sendDragEventOnce(EventLabels.CAKE, EventNames.KNIFE_DRAGGED);
    }

    this.y = Math.max(this.highBound, Math.min(mouseY, this.initY + this.lowBound));
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