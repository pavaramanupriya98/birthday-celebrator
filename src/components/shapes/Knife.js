
import getMouseCoords from "../../utils/mouseCoords";
import Shape from "./Shape";
import { sendDragEvent, EventLabels, EventNames } from "../../utils/analytics";
import Arrow from "./Arrow";
import { callOnce, convertDegreeToRadians } from "../../utils/helpers";
import { getScaleX, getScaleY } from "../../utils/dimensions";

const KNIFE_COLOR = '#f1f1f1';

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
    this.highBound = initY - highBound;
    this.lowBound = lowBound;
    this.showPointer = true;
  }

  update() {
    const { mouseY } = getMouseCoords();
    this.updateMouseInteractionStatus();

    if(!this.animate) return;

    if (mouseY && this.isBeingDragged) {
      if(this.y !== mouseY) {
        sendDragEventOnce(EventLabels.CAKE, EventNames.KNIFE_DRAGGED);
      }
      this.y = Math.max(this.highBound, Math.min(mouseY, this.initY + this.lowBound));
      this.showPointer = false;
    } else {
      this.showPointer = true;
    }
  }

  getPosition() {
    const { x, y } = this;
    return { x, y };
  }

  stopAnimating() {
    this.animate = false;
  }

  hitBoxOptions() {
    return this.animate ? {
      type: 'rectangle',
      left: this.x - 150,
      top: this.y - 25,
      width: 330,
      height: 50,
    } : null;
  }

  draw(step) {
    const { ctx, x, y, showPointer } = this;
    ctx.save();
    ctx.fillStyle = KNIFE_COLOR;
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.scale(getScaleX(), getScaleY())
    // step === 1 && ctx.rotate(convertDegreeToRadians(45));
    // step === 1 && ctx.transform(1, -0.32, 0.25, 1, 0, 0);
    ctx.moveTo(150, -25);
    ctx.lineTo(-150, -25);
    // ctx.arc(-100, -25, 50, convertDegreeToRadians(180), convertDegreeToRadians(90), true);
    ctx.quadraticCurveTo(-150, 25, 50, 25);
    // ctx.lineTo(50, 25);
    ctx.lineTo(50,-25);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#e7e7e7";
    // ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(-150, -25);
    ctx.quadraticCurveTo(-150, 25, 50, 25);
    ctx.lineTo(50, -25);
    ctx.quadraticCurveTo(45, 20, 40, 20);
    ctx.quadraticCurveTo(-145, 20, -150, -25);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#cfd2d4";
    ctx.fillRect(50, -23, 10, 30);

    ctx.fillStyle = "#343434";
    ctx.beginPath();
    ctx.moveTo(60, -23);
    ctx.lineTo(145, -23);
    ctx.arc(175, -18, 5, convertDegreeToRadians(270), 0);
    ctx.lineTo(180, 15);
    ctx.arc(175, 15, 5, 0, convertDegreeToRadians(90));

    let i = 0;
    const points = [
      {x: 160, y: 0},
      {x: 120, y: 15},
      {x: 80, y: 0},
      {x: 60, y: 15},
    ];

    for (i = 1; i < points.length - 2; i ++)
    {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
    }
    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);
    ctx.closePath();
    ctx.fill();

    showPointer && Arrow(ctx, 100, -100 + 10 * Math.sin(Date.now()/150), true, 1);
    ctx.restore();
  }
}