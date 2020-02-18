export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : {
        r: 0,
        g: 0,
        b: 0,
      };
};

export const hexToRgba = (hex: string, alpha: number) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: alpha,
      }
    : {
        r: 210,
        g: 210,
        b: 0,
        a: alpha,
      };
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

// https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
export const getContrast = (hex: string) => {
  const rgb = hexToRgb(hex);
  const { r, g, b } = rgb;
  // https://en.wikipedia.org/wiki/YIQ
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? '#242424' : '#f9f9f9';
};
