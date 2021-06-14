export default function Arrow(ctx, x, y, fill, scale = 1) {
    ctx.save();
    ctx.fillStyle = '#00a0fe';
    ctx.strokeStyle = '#00a0fe';
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.scale(scale, scale);
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 0);
    ctx.lineTo(10, 25);
    ctx.lineTo(15, 25);
    ctx.lineTo(0, 40);
    ctx.lineTo(-15, 25);
    ctx.lineTo(-10, 25);
    ctx.lineTo(-10, 0);
    ctx.closePath();
    fill ? ctx.fill() : ctx.stroke();
    ctx.restore();
}