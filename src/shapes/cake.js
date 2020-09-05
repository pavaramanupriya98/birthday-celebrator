import CylinderStack from './CylinderStack';
import radians from '../utils/radians';

const CAKE_INNER_COLOR = '#ffffe0';
const CAKE_OUTER_COLOR = "#ffcce0";

export default class Cake extends CylinderStack { 

  constructor(
    x, y, startAngle=0, endAngle=radians(360),
  ) {
    super(
      x, y + 400, 200, 200, startAngle, endAngle, CAKE_INNER_COLOR, CAKE_OUTER_COLOR
    );
  }
}