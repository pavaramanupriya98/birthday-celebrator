import Shape from "./Shape";

export default class Text extends Shape {
  constructor(
    text, x, y
  ) {
    super();
    this.text = text;
    this.x = x;
    this.y = y;
    this.alpha = 0;
    this.alphaSpeed = 0;
  }

  show() {
    this.alphaSpeed = 0.1;
  }

  update() {
    this.alpha += this.alphaSpeed;
    if(this.alpha >= 1) {
      this.alpha = 1;
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