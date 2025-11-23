import React from 'react';
import { Svg, Rect } from 'react-native-svg';

type IconPauseProps = {
  color?: string;
  size?: number;
};

const IconPause = ({ color, size = 30 }: IconPauseProps) => {
  const originalWidth = 25;
  const originalHeight = 31;
  const aspectRatio = originalHeight / originalWidth;
  
  const height = size;
  const width = size / aspectRatio; 

  return (
    <Svg width={width} height={height} viewBox="0 0 25 31" fill="none">
      <Rect width="10" height="31" rx="5" fill={color || "#709F70"} />
      <Rect x="15" width="10" height="31" rx="5" fill={color || "#709F70"} />
    </Svg>
  );
};

export default IconPause;