//https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex

import styled from 'styled-components';
import React, { memo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Square from '../components/Square';
import { IColor } from '../components/ColorBlock';

import { rgbToHex, getContrast, hexToRgba } from '../utils/misc';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  color: #242424;
  height: 100vh;
  width: 100vw;
  background-size: 2rem 2rem;
  background-image: linear-gradient(
      to right,
      rgba(36, 36, 36, 0.1) 0.1rem,
      transparent 0.1rem
    ),
    linear-gradient(to bottom, rgba(36, 36, 36, 0.1) 0.1rem, transparent 0.1rem);
`;

const ColorContainer = styled.div`
  position: relative;
  width: 66rem;
  height: 66rem;
  margin: 2rem;

  @media (max-width: 699px) {
    width: calc(100vw - 4rem);
    height: 100%;
  }
`;

const LargeWrapper = styled.div`
  position: absolute;
  width: 50rem;
  height: 50rem;

  &.bottom {
    bottom: 0;
    right: 0;
  }
  @media (max-width: 699px) {
    width: calc(100vw - 4rem);
    height: 75%;
  }
`;

const SmallWrapper = styled.div`
  position: absolute;
  width: 16rem;
  height: 16rem;

  &.right {
    top: 0;
    right: 0;
  }
  &.left {
    bottom: 0;
    left: 0;
  }
  @media (max-width: 699px) {
    display: none;
  }
`;

const TargetColorText = styled.h3`
  position: absolute;

  z-index: 1;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  font-size: 6rem;
  font-weight: normal;
  margin: 0;

  @media (max-width: 414px) {
    font-size: 4rem;
  }
`;

const Header = styled.h1`
  height: calc(6rem - 0.2rem);
  font-size: 4rem;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  border: 1px solid #242424;
  width: calc(66rem - 0.2rem);
  @media (max-width: 699px) {
    width: calc(100vw - 4.2rem);
  }
  @media (max-width: 414px) {
    font-size: 2.4rem;
  }
`;

const ParagraphsWrapper = styled.div`
  width: 66rem;
  margin: 0 2rem;
  @media (max-width: 699px) {
    width: calc(100vw - 4rem);
  }
`;

const Paragraph = styled.p`
  /* margin-bottom: 1rem; */
  font-size: 2.4rem;
  height: 4rem;
  margin: 0;
  display: flex;
  align-items: center;
  @media (max-width: 699px) {
    font-size: 1.8rem;
    height: auto;
    margin-bottom: 0.5rem;
  }
`;

// var alpha = Math.round(0.5 * 255);
// var foo = (alpha + 0x10000)
//   .toString(16)
//   .substr(-2);

const Index = () => {
  const history = useHistory();
  const { c1, c2, opacity } = useParams();
  const oNum = opacity ? Number(opacity) : 50;
  const clampOpacity = Math.min(Math.max(oNum, 0), 100);
  const [topColor, setTopColor] = useState({
    hex: c1 ? `#${c1}` : '#d2d200',
    rgb: hexToRgba(c1 || 'd2d200', 1),
  });

  const [bottomColor, setBottomColor] = useState({
    hex: c2 ? `#${c2}` : '#72e8e8',
    rgb: hexToRgba(c2 || '72e8e8', clampOpacity / 100),
  });

  const handleTopColorChangeComplete = (color: IColor) => {
    const opacity = Math.round(bottomColor.rgb.a * 100);
    history.push(
      `/${color.hex.replace('#', '')}/${bottomColor.hex.replace(
        '#',
        '',
      )}/${opacity}`,
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

  const tCol = targetColor();

  return (
    <Root>
      <Header>Color Mixer</Header>
      <ParagraphsWrapper>
        <Paragraph>Click top and bottom hex colors to change.</Paragraph>
        <Paragraph>Bottom color has opacity.</Paragraph>
        <Paragraph>Center hex color is the mixed color.</Paragraph>
      </ParagraphsWrapper>
      <ColorContainer>
        <TargetColorText
          style={{
            color: getContrast(tCol.hex),
          }}
        >
          {tCol.hex}
        </TargetColorText>
        <LargeWrapper className="top">
          <Square
            color={topColor}
            onChange={setTopColor}
            onChangeComplete={handleTopColorChangeComplete}
            disableAlpha
          />
        </LargeWrapper>
        <SmallWrapper className="right">
          <Square color={tCol} hideText />
        </SmallWrapper>
        <LargeWrapper className="bottom">
          <Square
            className="bottom"
            color={bottomColor}
            onChange={setBottomColor}
            onChangeComplete={handleBottomColorChangeComplete}
          />
        </LargeWrapper>
        <SmallWrapper className="left">
          <Square color={tCol} hideText />
        </SmallWrapper>
      </ColorContainer>
    </Root>
  );
};

export default memo(Index);
