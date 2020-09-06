export default function distance({x:x1, y:y1}, {x:x2, y:y2}) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}