import radians from "../utils/radians";
import Shape from "./Shape";

let step = 1;

setInterval(() => {
  step = 1 - step;
}, 100);

export default class Candle extends Shape {
  static noOfCandles = 0;

  constructor(x, y) {
    super();
    this.id = Candle.noOfCandles++;
    this.x = x;
    this.y = y;
    this.flameHeight = 20;
    this.flameSpeed = 2;
    this.state = 'burning';
    this.alpha = 1;
    this.alphaSpeed = 0;
    this.wickLength = 30;
    this.candleHeight = 70;
  }

  extinguish() {
    this.state = "extinguishing";
    this.flameSpeed = -3;
    this.alphaSpeed = -0.1;
  }

  getState() {
    return this.state;
  }

  update() {
    this.flameHeight += this.flameSpeed;

    if(this.state === 'burning' && (this.flameHeight >= 30 || this.flameHeight <= 20)) {
      this.flameSpeed = -this.flameSpeed;
      return;
    } 
    
    this.alpha += this.alphaSpeed;
    
    if (this.flameHeight === this.wickLength) {
      this.flameSpeed = 0;
    }

    if(this.alpha <= 0) {
      this.alpha = 0;
      this.alphaSpeed = 0;
      this.state = "extinguished";
    }

  }

  getPosition() {
    const { x, y, candleHeight, wickLength } = this;
    return { x, y: y - candleHeight - wickLength };
  }

  draw() {
    const { 
      ctx, x, y, flameHeight, alpha, wickLength, candleHeight
    } = this;

    const candleRadius = 10;

    const flameBaseRadius = 5;

    ctx.save()

    // Candle
    ctx.fillStyle = '#00a0fe';
    ctx.translate(x, y - (candleHeight+wickLength)/2);
    ctx.scale(1, 0.5);
    ctx.beginPath();
    ctx.moveTo(candleRadius, -candleHeight);
    ctx.arc(0, -candleHeight, candleRadius, 0, radians(360));
    ctx.lineTo(candleRadius, candleHeight);
    ctx.arc(0, candleHeight, candleRadius, 0, radians(180));
    ctx.lineTo(-candleRadius, -candleHeight)
    // ctx.closePath();
    ctx.fill();
    
    // Wick
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -candleHeight);
    ctx.lineTo(0, -candleHeight - wickLength);
    ctx.stroke();
    
    // Flame
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = '#FF7500';
    ctx.shadowColor = '#fac000';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = -10;
    ctx.beginPath();
    ctx.arc(0, -candleHeight - wickLength/2, flameBaseRadius, 0, radians(180));
    ctx.lineTo(0, -candleHeight - wickLength - flameHeight);
    ctx.lineTo(flameBaseRadius, -candleHeight - wickLength/2);
    ctx.fill();
    ctx.restore();
  }
}
