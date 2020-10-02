import Shape from "./Shape";

export default class Text extends Shape {
  constructor(
    text, x, y, alpha=0
  ) {
    super();
    this.text = text;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.alphaSpeed = 0;
  }

  show(speed = 0.1) {
    this.alphaSpeed = speed;
  }

  hide(speed = 0.1) {
    this.alphaSpeed = -speed;
  }

  update() {
    this.alpha += this.alphaSpeed;
    if(this.alpha >= 1 && this.alphaSpeed > 0) {
      this.alpha = 1;
      this.alphaSpeed = 0;
    }

    if(this.alpha <= 0 && this.alphaSpeed < 0) {
      this.alpha = 0;
      this.alphaSpeed = 0;
    }
  }

  draw() {
    const { ctx, x, y, text, alpha } = this;

    ctx.save();
    ctx.font = '48px serif';
    ctx.textAlign = "center";
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#fecde0";
    ctx.translate(x, y);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
}