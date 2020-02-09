import React, { memo } from 'react';
import styled from 'styled-components';
import { ChromePicker } from 'react-color';

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
  useHex?: boolean;
  disableAlpha?: boolean;
  onChange?(color: any): void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 33.33333%;

  &.grid {
    background-size: 5rem 5rem;
    background-image: linear-gradient(to right, rgba(36, 36, 36, 0.1) 0.1rem, transparent 0.1rem),
      linear-gradient(to bottom, rgba(36, 36, 36, 0.1) 0.1rem, transparent 0.1rem);
  }
`;

const Text = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: normal;
  /* width: 50%; */
  margin: 1rem;
`;

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 50%; */
  margin: 1rem;
`;

const ColorBlock = ({ color, useHex, onChange, disableAlpha }: Props) => {
  const {r, g, b, a } = color.rgb;
  const bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  return (
    <Root
      className={a < 1 ? 'grid' : ''}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <Text>{useHex ? color.hex.toUpperCase() : bgColor}</Text>

      {onChange && (
        <PickerWrapper>
          <ChromePicker
            disableAlpha={disableAlpha}
            color={color.rgb}
            onChange={onChange}
          />
        </PickerWrapper>
      )}
    </Root>
  );
};

export default memo(ColorBlock);
