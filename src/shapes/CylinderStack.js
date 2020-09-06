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
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    for(let lyr=0; lyr < height; lyr++) {
      ctx.save();
      ctx.scale(1, 0.5);
      ctx.beginPath();
      ctx.arc(x, y-lyr, r, startAngle, endAngle);
      ctx.lineTo(x, y-lyr);
      // ctx.lineTo(x + r*Math.cos(startAngle), y-lyr + r*Math.sin(endAngle));
      ctx.closePath();
      ctx.restore();
      lyr < height - 2 && ctx.stroke();
      ctx.fill();
    }
    ctx.restore();
  }
}