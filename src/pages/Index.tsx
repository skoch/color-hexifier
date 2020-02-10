//https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex

import styled from 'styled-components';
import React, { memo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ColorBlock, { IColor } from '../components/ColorBlock';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-size: 2.5rem 2.5rem;
  background-image: linear-gradient(
      to right,
      rgba(36, 36, 36, 0.1) 0.1rem,
      transparent 0.1rem
    ),
    linear-gradient(to bottom, rgba(36, 36, 36, 0.1) 0.1rem, transparent 0.1rem);
`;
// var alpha = Math.round(0.5 * 255);
// var foo = (alpha + 0x10000)
//   .toString(16)
//   .substr(-2);

// console.log('foo', foo);
const Index = () => {
  const hexToRgb = (hex: string, alpha: number) => {
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

  const history = useHistory();
  const { c1, c2, opacity } = useParams();
  const oNum = opacity ? Number(opacity) : 50;
  const clampOpacity = Math.min(Math.max(oNum, 0), 100);
  const [topColor, setTopColor] = useState({
    hex: c1 ? `#${c1}` : '#d2d200',
    rgb: hexToRgb(c1 || 'd2d200', 1),
  });

  const [bottomColor, setBottomColor] = useState({
    hex: c2 ? `#${c2}` : '#72e8e8',
    rgb: hexToRgb(c2 || '72e8e8', clampOpacity / 100),
  });

  const handleTopColorChangeComplete = (color: IColor) => {
    const opacity = Math.round(bottomColor.rgb.a * 100);
    history.push(
      `/${color.hex.replace('#', '')}/${bottomColor.hex.replace('#', '')}/${opacity}`,
    );
  };

  const handleBottomColorChangeComplete = (color: IColor) => {
    const opacity = Math.round(bottomColor.rgb.a * 100);
    history.push(
      `/${topColor.hex.replace('#', '')}/${color.hex.replace(
        '#',
        '',
      )}/${opacity}`,
    );
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const targetColor = (): IColor => {
    const { r, g, b, a } = bottomColor.rgb;

    const red = Math.round(r * a + topColor.rgb.r * (1 - a));
    const green = Math.round(g * a + topColor.rgb.g * (1 - a));
    const blue = Math.round(b * a + topColor.rgb.b * (1 - a));

    return {
      hex: rgbToHex(red, green, blue),
      rgb: {
        r: red,
        g: green,
        b: blue,
        a: 1,
      },
    };
  };

  return (
    <Root>
      <ColorBlock
        color={topColor}
        onChange={setTopColor}
        onChangeComplete={handleTopColorChangeComplete}
        disableAlpha
      />
      <ColorBlock color={targetColor()} />
      <ColorBlock
        color={bottomColor}
        onChange={setBottomColor}
        onChangeComplete={handleBottomColorChangeComplete}
      />
    </Root>
  );
}

export default memo(Index);
