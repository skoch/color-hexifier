//https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex

import styled from 'styled-components';
import React, { memo, useState } from 'react';
import ColorBlock, { IColor } from '../components/ColorBlock';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Index = () => {
  const [topColor, setTopColor] = useState({
    hex: '#D2D200',
    rgb: {
      r: 210,
      g: 210,
      b: 0,
      a: 1,
    },
  });
  const [bottomColor, setBottomColor] = useState({
    hex: '#72E8E8',
    rgb: {
      r: 114,
      g: 232,
      b: 232,
      a: 0.5,
    },
  });

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

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
      <ColorBlock color={topColor} useHex onChange={setTopColor} disableAlpha />
      <ColorBlock color={targetColor()} useHex />
      <ColorBlock color={bottomColor} onChange={setBottomColor} />
    </Root>
  );
}

export default memo(Index);
