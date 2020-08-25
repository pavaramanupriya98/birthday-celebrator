import cylinder from './cylinder';
import { getCanvasWidth, getCanvasHeight } from "../utils/dimensions";

const CAKE_INNER_COLOR = '#ffffe0';
const CAKE_OUTER_COLOR = "#ffcce0";
export default function cake(ctx, startAngle=0, endAngle=Math.PI * 2) {
    ctx.save()
    ctx.fillStyle = CAKE_INNER_COLOR;
    ctx.strokeStyle = CAKE_OUTER_COLOR;
    cylinder(
      ctx,
      getCanvasWidth()/2,
      getCanvasHeight()/2 + 400,
      200,
      200,
      startAngle,
      endAngle,
    );
    ctx.restore()
  }