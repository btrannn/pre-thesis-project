import React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { COLORS } from '../../styles/theme';

type GradientCircleProps = {
  size: number;
  strokeWidth: number;
};

const GradientCircle = ({ size, strokeWidth }: GradientCircleProps) => {
  const radius = size / 2 - strokeWidth / 2;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <View style={{ width: size, height: size }}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <SvgLinearGradient
            id="strokeGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%">
            <Stop offset="0%" stopColor={COLORS.solidgreen_05} />
            <Stop offset="100%" stopColor={COLORS.solidgreen_01} />
          </SvgLinearGradient>
        </Defs>
        
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#strokeGradient)"
          strokeWidth={strokeWidth}
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default GradientCircle;