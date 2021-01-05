import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import React, { memo, useState } from 'react';

import { getContrast } from '../utils/misc';

// export type Attributes = Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

interface IRGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface IColor {
  hex: string;
  rgb: IRGB;
}

// interface Props extends Attributes {
interface Props {
  color: IColor;
  disableAlpha?: boolean;
  onChange?(color: any): void;
  onChangeComplete?(color: any): void;
}

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 33.33333%;
`;

const Text = styled.h3`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 4rem;
  font-weight: normal;
  margin: 2rem;

  &.large {
    font-size: 6rem;
  }
`;

const PickerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  top: 1rem;
  left: 1rem;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const ColorBlock = ({
  color,
  onChange,
  disableAlpha,
  onChangeComplete,
}: Props) => {
  const { r, g, b, a } = color.rgb;
  const bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  const [showPicker, setShowPicker] = useState(false);

  // const hexToRgb = (hex: string) => {
  //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  //   return result
  //     ? {
  //         r: parseInt(result[1], 16),
  //         g: parseInt(result[2], 16),
  //         b: parseInt(result[3], 16),
  //       }
  //     : {
  //         r: 0,
  //         g: 0,
  //         b: 0,
  //       };
  // };
  // // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
  // const getContrast = (hex: string) => {
  //   const rgb = hexToRgb(hex);
  //   const { r, g, b } = rgb;
  //   // https://en.wikipedia.org/wiki/YIQ
  //   var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  //   return yiq >= 128 ? '#242424' : '#f9f9f9';
  // };

  return (
    <Root
      style={{
        color: getContrast(color.hex),
        backgroundColor: bgColor,
      }}
    >
      <Text
        className={!onChange ? 'large' : ''}
        onClick={() => setShowPicker(true)}
      >
        {color.hex.toUpperCase()}
      </Text>

      {showPicker && onChange && onChangeComplete && (
        <PickerWrapper>
          <Cover onClick={() => setShowPicker(false)} />
          <ChromePicker
            disableAlpha={disableAlpha}
            color={color.rgb}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
          />
        </PickerWrapper>
      )}
    </Root>
  );
};

export default memo(ColorBlock);
