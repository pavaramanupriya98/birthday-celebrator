export default function cylinder(ctx, x, y, r, height, startAngle, endAngle) {
    ctx.save();
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