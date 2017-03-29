export const hslToRGB = (h) => {
  let s = 1;
  let l = .50;
  let hueToRGB = (p, q, t) => {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1/2) {
      return q;
    }
    if (t < 2/3) {
      return p + (q - p) * (2/3 - t) * 6;
    }
    return p;
  };

  let q = l + s - l * s;
  let p = 2 * l - q;
  let r = hueToRGB(p, q, h + 1/3);
  let g = hueToRGB(p, q, h);
  let b = hueToRGB(p, q, h - 1/3);
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
};

export const rotate = (x, y, n, axes) => {
  return {
    x: x * Math.cos(2 * n * Math.PI / axes) - y * Math.sin(2 * n * Math.PI / axes),
    y: x * Math.sin(2 * n * Math.PI / axes) + y * Math.cos(2 * n * Math.PI / axes)
  };
};
