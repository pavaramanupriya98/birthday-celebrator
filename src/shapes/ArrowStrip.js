import Shape from "./Shape";

export default class ArrowStrip extends Shape {
  constructor(
    x, y
  ) {
    super();
    this.x = x;
    this.y = y - 150;
    this.arrows = Array(3).fill(false);
    this.curArrow = 0
    this.timer = setInterval(() => {
      this.arrows = Array(3).fill(false);
      this.arrows[this.curArrow] = true;
      this.curArrow = (this.curArrow + 1)% 3
    }, 250);

    this.alpha = 1;
    this.alphaSpeed = 0;
  }

  fillAll() {
    clearInterval(this.timer);
    this.arrows = Array(3).fill(true);
    this.alphaSpeed = - 0.08;
  }

  update() {
    this.alpha += this.alphaSpeed;

    if(this.alpha <= 0) {
      this.alpha = 0;
      this.alphaSpeed = 0;
    }
  }


  draw() {
    const {ctx, x, y, arrows, alpha} = this;

    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#00a0fe';
    ctx.strokeStyle = '#00a0fe';
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3;
    ctx.globalAlpha = alpha
    for(let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(0, 50*i);
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
      ctx.stroke();
      arrows[i] && ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }
}