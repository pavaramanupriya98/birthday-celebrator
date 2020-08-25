import radians from "../utils/radians";

const knifeColor = '#555555';

export default function knife(ctx, x, y, step) {
    ctx.save();
    ctx.fillStyle = knifeColor;
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