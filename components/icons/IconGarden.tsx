import React from 'react';
import { Svg, Path, LinearGradient, Stop, Defs } from 'react-native-svg';

type IconGardenProps = {
  focused?: boolean;
  color?: string;
  size?: number;
};

const IconGardenFocused = ({ width, height }: { width: number; height: number }) => (
  <Svg width={width} height={height} viewBox="0 0 18 24" fill="none">
    <Path
      d="M10.8396 9.52857C9.14036 12.1418 8.56623 15.1618 8.99466 18.0202C11.7816 17.2515 14.3089 15.5007 16.0082 12.8874C17.7075 10.2742 18.2816 7.25423 17.8532 4.39581C15.0662 5.16449 12.5389 6.91532 10.8396 9.52857Z"
      fill="url(#paint0_linear_353_6759_focused)"
    />
    <Path
      d="M7.14969 9.52857C8.84899 12.1418 9.42311 15.1618 8.99468 18.0202C6.20773 17.2515 3.68042 15.5007 1.98113 12.8874C0.281835 10.2742 -0.29229 7.25278 0.13614 4.39436C2.9231 5.16305 5.4504 6.91387 7.14969 9.52712V9.52857Z"
      fill="url(#paint1_linear_353_6759_focused)"
    />
    <Path
      d="M5.5802 9.00217C5.5802 12.4562 6.87126 15.6074 8.99466 18.0043C11.1181 15.6074 12.4091 12.4562 12.4091 9.00217C12.4091 5.54812 11.1181 2.39693 8.99466 0C6.87126 2.39693 5.5802 5.54812 5.5802 9.00217Z"
      fill="url(#paint2_linear_353_6759_focused)"
    />
    <Path
      d="M3.22229 14.5H14.9137C15.2844 14.5 15.5586 14.8418 15.4879 15.2002L15.4694 15.2724L13.066 22.5967C12.9866 22.8385 12.7617 23 12.5104 23H5.62561C5.3744 22.9999 5.15035 22.8384 5.07092 22.5967L2.66663 15.2724L2.64807 15.2002C2.57739 14.8418 2.85164 14.5 3.22229 14.5Z"
      fill="url(#paint3_linear_353_6759_focused)"
      stroke="url(#paint4_linear_353_6759_focused)"
      strokeWidth="2"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_353_6759_focused"
        x1="13.4239"
        y1="4.39581"
        x2="13.4239"
        y2="18.0202"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#344A34" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_353_6759_focused"
        x1="4.56541"
        y1="4.39436"
        x2="4.56541"
        y2="18.0202"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#344A34" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_353_6759_focused"
        x1="8.99466"
        y1="0"
        x2="8.99466"
        y2="18.0043"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#344A34" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_353_6759_focused"
        x1="9.06817"
        y1="13.5"
        x2="9.06817"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#344A34" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_353_6759_focused"
        x1="2.68556"
        y1="14.3258"
        x2="10.7772"
        y2="26.5732"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const IconGardenInactive = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color?: string;
}) => (
  <Svg width={width} height={height} viewBox="0 0 18 24" fill="none">
    <Path
      d="M10.8396 9.52857C9.14036 12.1418 8.56623 15.1618 8.99466 18.0202C11.7816 17.2515 14.3089 15.5007 16.0082 12.8874C17.7075 10.2742 18.2816 7.25423 17.8532 4.39581C15.0662 5.16449 12.5389 6.91532 10.8396 9.52857Z"
      fill={color || '#ABC2AC'}
    />
    <Path
      d="M7.14969 9.52857C8.84899 12.1418 9.42311 15.1618 8.99468 18.0202C6.20773 17.2515 3.68042 15.5007 1.98113 12.8874C0.281835 10.2742 -0.29229 7.25278 0.13614 4.39436C2.9231 5.16305 5.4504 6.91387 7.14969 9.52712V9.52857Z"
      fill={color || '#ABC2AC'}
    />
    <Path
      d="M5.5802 9.00217C5.5802 12.4562 6.87126 15.6074 8.99466 18.0043C11.1181 15.6074 12.4091 12.4562 12.4091 9.00217C12.4091 5.54812 11.1181 2.39693 8.99466 0C6.87126 2.39693 5.5802 5.54812 5.5802 9.00217Z"
      fill={color || '#ABC2AC'}
    />
    <Path
      d="M3.22229 14.5H14.9137C15.2844 14.5 15.5586 14.8418 15.4879 15.2002L15.4694 15.2724L13.066 22.5967C12.9866 22.8385 12.7617 23 12.5104 23H5.62561C5.3744 22.9999 5.15035 22.8384 5.07092 22.5967L2.66663 15.2724L2.64807 15.2002C2.57739 14.8418 2.85164 14.5 3.22229 14.5Z"
      fill={color || '#ABC2AC'}
      stroke="url(#paint0_linear_353_6760_inactive)"
      strokeWidth="2"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_353_6760_inactive"
        x1="2.68556"
        y1="14.3258"
        x2="10.7772"
        y2="26.5732"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const IconGarden = ({ focused, color, size }: IconGardenProps) => {
  const iconSize = size || 24;
  const iconWidth = (iconSize / 24) * 18; 
  const iconHeight = iconSize;

  if (focused) {
    return <IconGardenFocused width={iconWidth} height={iconHeight} />;
  }

  return (
    <IconGardenInactive
      width={iconWidth}
      height={iconHeight}
      color={color}
    />
  );
};

export default IconGarden;