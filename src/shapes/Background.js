import Shape from "./Shape"
import { getCanvasWidth, getCanvasHeight } from "../utils/dimensions";
import callOnce from "../utils/callOnce";

const log = callOnce(console.log);

export default class Background extends Shape {

  setcolorBlocks(blocks) {
    let num = 0;
    const denom = blocks.reduce((acc, block) => acc + block.height, 0);
    log(denom);

    blocks.forEach(block => {
      this.ctx.fillStyle = block.color;
      this.ctx.fillRect(0, getCanvasHeight() * (num/denom), getCanvasWidth(), getCanvasHeight() * ((num + block.height)/denom));
      num += block.height;
    });
  }

  draw() {
    const { ctx } = this;
    ctx.save();
    ctx.clearRect(0, 0, getCanvasWidth(), getCanvasHeight());
    this.setcolorBlocks([
      {color: '#ffcbcb', height: 40},
      {color: '#70adb5', height: 45},
      {color: '#407088', height: 5},
      {color: '#132743', height: 10},
    ]);
    // ctx.fillStyle = '#ffcbcb';
    // ctx.fillRect(0, 0, getCanvasWidth(), getCanvasHeight()*0.4);
    // ctx.fillStyle = '#70adb5';
    // ctx.fillRect(0, getCanvasHeight()*0.4, getCanvasWidth(), getCanvasHeight()*0.45);
    // ctx.fillStyle = '#407088';
    // ctx.fillRect(0, getCanvasHeight()*0.85, getCanvasWidth(), getCanvasHeight()*0.05);
    // ctx.fillStyle = '#132743';
    // ctx.fillRect(0, getCanvasHeight()*0.9, getCanvasWidth(), getCanvasHeight()*0.1);
    ctx.restore();
  }
}