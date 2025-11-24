import React from 'react';
import { Svg, Rect } from 'react-native-svg';
import { COLORS } from '../../styles/theme';

type IconStopProps = {
  color?: string;
  size?: number;
};

const IconStop = ({ color, size = 21 }: IconStopProps) => {
  const strokeColor = COLORS.solidgreen_05;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 21 21" fill="none">
      <Rect width="21" height="21" rx="5"         
      fill="#709F70"/>
    </Svg>
  );
};

export default IconStop;