import styled from 'styled-components';
import { ChromePicker } from 'react-color';
import React, { memo, useState, HTMLAttributes } from 'react';

import { IColor } from './ColorBlock';
import { getContrast } from '../utils/misc';

export type Attributes = Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

interface Props extends Attributes{
  color: IColor;
  disableAlpha?: boolean;
  hideText?: boolean;
  onChange?(color: any): void;
  onChangeComplete?(color: any): void;
}

const Text = styled.h3`
  font-size: 4rem;
  font-weight: normal;
  margin: 2rem;
  cursor: pointer;

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

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;

  &.bottom {
    ${Text}, ${PickerWrapper} {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      top: initial;
      left: initial;
    }
  }
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Square = ({
  color,
  onChange,
  disableAlpha,
  hideText,
  onChangeComplete,
  className,
}: Props) => {
  const { r, g, b, a } = color.rgb;
  const bgColor = `rgba(${r}, ${g}, ${b}, ${a})`;

  const [showPicker, setShowPicker] = useState(false);

  return (
    <Root
      className={className}
      style={{
        color: getContrast(color.hex),
        backgroundColor: bgColor,
      }}
    >
      {!hideText && (
        <Text
          className={!onChange ? 'large' : ''}
          onClick={() => setShowPicker(true)}
        >
          {color.hex.toUpperCase()}
        </Text>
      )}

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

export default memo(Square);
