import { convertDegreeToRadians } from '../../utils/helpers';
import CylinderStack from './CylinderStack';


const CAKE_INNER_COLOR = "#F7F2F2";
const CAKE_OUTER_COLOR = "#ED4A4A";

export default class Cake extends CylinderStack { 

  constructor(
    x, y, startAngle=0, endAngle=convertDegreeToRadians(360),
  ) {
    super(
      x, y, 200, 200, startAngle, endAngle, CAKE_INNER_COLOR, CAKE_OUTER_COLOR
    );
  }
}