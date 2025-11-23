import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';
import { COLORS } from '../../styles/theme';

type IconSkipProps = {
  color?: string;
  size?: number;
};

const IconSkip = ({ color, size = 30 }: IconSkipProps) => {
  const strokeColor = color || COLORS.solidgreen_05;
  const rectSize = size * 0.7;

  return (
    <Svg width={rectSize} height={rectSize} viewBox="0 0 21 21">
      <Rect width="21" height="21" rx="5" fill={strokeColor} />
    </Svg>
  );
};

export default IconSkip;