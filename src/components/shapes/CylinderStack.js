import { getScaleX, getScaleY } from "../../utils/dimensions";
import Shape from "./Shape";

export default class CylinderStack extends Shape {
  constructor(
    x, y, r, height, startAngle, endAngle, fillColor, strokeColor
  ) {
    super();
    Object.assign(this, { x, y, r, height, startAngle, endAngle, fillColor, strokeColor })
  }

  draw() {
    const { ctx, x, y, r, height, startAngle, endAngle, fillColor, strokeColor } = this;
    ctx.save();
    ctx.translate(x,y);
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = 0;
    
    ctx.save();
    // ctx.scale(1, 0.5);
    ctx.scale(getScaleX(), getScaleY());
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(r*Math.cos(startAngle), r*Math.sin(startAngle));
    ctx.lineTo(r*Math.cos(startAngle), r*Math.sin(startAngle)+height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.restore();
    ctx.fill();

    ctx.save();
    // ctx.scale(1, 0.5);
    ctx.scale(getScaleX(), getScaleY());
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(r*Math.cos(endAngle), r*Math.sin(endAngle));
    ctx.lineTo(r*Math.cos(endAngle), r*Math.sin(endAngle)+height);
    ctx.lineTo(0, height);
    ctx.restore();
    ctx.closePath();
    // ctx.fill();

    ctx.save();
    // ctx.scale(1, 0.5);
    ctx.scale(getScaleX(), getScaleY());
    ctx.beginPath();
    ctx.moveTo(r*Math.cos(startAngle), r*Math.sin(startAngle));
    ctx.lineTo(r*Math.cos(startAngle), r*Math.sin(startAngle)+height);
    ctx.arc(0, height, r, startAngle, endAngle);
    ctx.lineTo(r*Math.cos(endAngle), r*Math.sin(endAngle));
    ctx.arc(0, 0, r, endAngle, startAngle, true);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
    
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = fillColor;
    ctx.lineWidth = 0;
    ctx.save();
    // ctx.scale(1, 0.5);
    ctx.scale(getScaleX(), getScaleY());
    ctx.beginPath();
    ctx.moveTo(r*Math.cos(startAngle), r*Math.sin(startAngle));
    ctx.arc(0, 0, r, startAngle, endAngle);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }
}