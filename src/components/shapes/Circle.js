import { convertDegreeToRadians } from "../../utils/helpers";

export default ({
    ctx, x, y, radius, startAngle = 0, endAngle = convertDegreeToRadians(360), fillColor
}) => {
    ctx.save();
    if (fillColor) { ctx.fillStyle = fillColor; }
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}