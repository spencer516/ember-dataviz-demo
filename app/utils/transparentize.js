import { color } from 'd3-color';

export default function transparentize(colorStr, opacity) {
  const colorObj = color(colorStr);
  colorObj.opacity = opacity;
  return colorObj.toString();
}
