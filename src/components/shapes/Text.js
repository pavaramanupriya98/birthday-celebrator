import Shape from "./Shape";

export default class Text extends Shape {
  constructor(
    { text, x, y, font, alpha, color, shadowBlur }
  ) {
    super();
    this.text = text;
    this.x = x;
    this.y = y;
    this.alpha = alpha || 0;
    this.alphaSpeed = 0;
    this.font = font || '48px serif';
    this.color = color || '#333333';
    this.shadowBlur = shadowBlur;
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
    const { 
      ctx, x, y, text, alpha, font
    } = this;

    ctx.save();
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.color;
    ctx.translate(x, y);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }
}