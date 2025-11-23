import React from 'react';
import { Svg, Path, G, ClipPath, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

type IconTimerProps = {
  focused?: boolean;
  color?: string;
  size?: number;
};

const IconTimerFocused = ({ width, height }: { width: number; height: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 24" fill="none">
    <G clipPath="url(#clip0_353_6733_focused)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4 5.4375C16.6894 5.4375 13.6813 8.44559 13.6813 12.1563C13.6813 15.8669 16.6894 18.875 20.4 18.875C24.1107 18.875 27.1188 15.8669 27.1188 12.1563C27.1188 8.44559 24.1107 5.4375 20.4 5.4375ZM20.8688 9.65625C20.8688 9.39737 20.6589 9.1875 20.4 9.1875C20.1411 9.1875 19.9313 9.39737 19.9313 9.65625V12.2849C19.9313 12.4842 19.8552 12.6759 19.7185 12.8208L18.809 13.7855C18.6314 13.9739 18.6401 14.2706 18.8285 14.4481C19.0168 14.6257 19.3135 14.617 19.4911 14.4286L20.4006 13.464C20.7013 13.145 20.8688 12.7232 20.8688 12.2849V9.65625Z"
        fill="url(#paint0_linear_353_6733_focused)"
      />
      <Path
        d="M16.6304 5.64728C16.8325 5.48556 16.8653 5.19058 16.7036 4.98843C16.5418 4.78627 16.2469 4.7535 16.0447 4.91522L14.4822 6.16522C14.28 6.32694 14.2473 6.62192 14.409 6.82408C14.5707 7.02623 14.8657 7.05901 15.0679 6.89728L16.6304 5.64728Z"
        fill="url(#paint1_linear_353_6733_focused)"
      />
      <Path
        d="M24.7554 4.91522C24.5532 4.7535 24.2582 4.78627 24.0965 4.98843C23.9348 5.19058 23.9675 5.48556 24.1697 5.64728L25.7322 6.89728C25.9344 7.05901 26.2293 7.02623 26.3911 6.82408C26.5528 6.62192 26.52 6.32694 26.3179 6.16522L24.7554 4.91522Z"
        fill="url(#paint2_linear_353_6733_focused)"
      />
    </G>
    <G clipPath="url(#clip1_353_6733_focused)">
      <Path
        d="M12 1.1C18.2132 1.1 23.25 6.13681 23.25 12.35C23.25 18.5632 18.2132 23.6 12 23.6C5.7868 23.6 0.75 18.5632 0.75 12.35C0.750015 6.13681 5.78681 1.1 12 1.1ZM4.71875 0.374413C5.25782 -0.0568448 6.0453 0.0296863 6.47656 0.568748C6.90782 1.10782 6.82031 1.8953 6.28125 2.32656L3.78125 4.32656C3.24217 4.75782 2.4547 4.67033 2.02344 4.13125C1.59232 3.59233 1.68009 2.80575 2.21875 2.37441L4.71875 0.374413ZM17.5234 0.568748C17.9547 0.0296848 18.7422 -0.056845 19.2812 0.374413L21.7812 2.37441C22.3199 2.80575 22.4077 3.59233 21.9766 4.13125C21.5453 4.67033 20.7578 4.75782 20.2188 4.32656L17.7188 2.32656C17.1797 1.8953 17.0922 1.10782 17.5234 0.568748Z"
        fill="url(#paint3_linear_353_6733_focused)"
        stroke="url(#paint4_linear_353_6733_focused)"
        strokeLinecap="round"
      />
      <G>
        <Path
          d="M12.75 8.35005C12.75 7.93584 12.4142 7.60005 12 7.60005C11.5858 7.60005 11.25 7.93584 11.25 8.35005V12.5559C11.25 12.8747 11.1282 13.1814 10.9095 13.4134L9.4543 14.9569C9.17015 15.2583 9.18412 15.7329 9.48551 16.0171C9.78689 16.3012 10.2616 16.2873 10.5457 15.9859L12.0009 14.4424C12.482 13.9321 12.75 13.2572 12.75 12.5559V8.35005Z"
          fill="url(#paint5_linear_353_6733_focused)"
        />
      </G>
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_353_6733_focused"
        x1="13.6813"
        y1="18.875"
        x2="28.0003"
        y2="5.77608"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#527552" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_353_6733_focused"
        x1="13.6813"
        y1="18.875"
        x2="28.0003"
        y2="5.77608"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#527552" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint2_linear_353_6733_focused"
        x1="13.6813"
        y1="18.875"
        x2="28.0003"
        y2="5.77608"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#527552" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint3_linear_353_6733_focused"
        x1="12"
        y1="0.599998"
        x2="12"
        y2="23.1"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#344A34" />
        <Stop offset="1" stopColor="#ACF4AC" />
      </LinearGradient>
      <LinearGradient
        id="paint4_linear_353_6733_focused"
        x1="1.25"
        y1="0.599998"
        x2="23.7372"
        y2="22.0659"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" stopOpacity="0.25" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
      <LinearGradient
        id="paint5_linear_353_6733_focused"
        x1="11.0295"
        y1="18.0581"
        x2="19.2067"
        y2="14.804"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0.2" />
      </LinearGradient>
      <ClipPath id="clip0_353_6733_focused">
        <Rect width="15" height="15" fill="white" transform="translate(12.9 4.5)" />
      </ClipPath>
      <ClipPath id="clip1_353_6733_focused">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const IconTimerInactive = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color?: string;
}) => (
  <Svg width={width} height={height} viewBox="0 0 28 24" fill="none">
    <G clipPath="url(#clip0_353_6758_inactive)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.4 5.4375C16.6894 5.4375 13.6813 8.44559 13.6813 12.1563C13.6813 15.8669 16.6894 18.875 20.4 18.875C24.1107 18.875 27.1188 15.8669 27.1188 12.1563C27.1188 8.44559 24.1107 5.4375 20.4 5.4375ZM20.8688 9.65625C20.8688 9.39737 20.6589 9.1875 20.4 9.1875C20.1411 9.1875 19.9313 9.39737 19.9313 9.65625V12.2849C19.9313 12.4842 19.8552 12.6759 19.7185 12.8208L18.809 13.7855C18.6314 13.9739 18.6401 14.2706 18.8285 14.4481C19.0168 14.6257 19.3135 14.617 19.4911 14.4286L20.4006 13.464C20.7013 13.145 20.8688 12.7232 20.8688 12.2849V9.65625Z"
        fill={color || '#ABC2AC'}
      />
      <Path
        d="M16.6304 5.64728C16.8325 5.48556 16.8653 5.19058 16.7036 4.98843C16.5418 4.78627 16.2469 4.7535 16.0447 4.91522L14.4822 6.16522C14.28 6.32694 14.2473 6.62192 14.409 6.82408C14.5707 7.02623 14.8657 7.05901 15.0679 6.89728L16.6304 5.64728Z"
        fill={color || '#ABC2AC'}
      />
      <Path
        d="M24.7554 4.91522C24.5532 4.7535 24.2582 4.78627 24.0965 4.98843C23.9348 5.19058 23.9675 5.48556 24.1697 5.64728L25.7322 6.89728C25.9344 7.05901 26.2293 7.02623 26.3911 6.82408C26.5528 6.62192 26.52 6.32694 26.3179 6.16522L24.7554 4.91522Z"
        fill={color || '#ABC2AC'}
      />
    </G>
    <G clipPath="url(#clip1_353_6758_inactive)">
      <Path
        d="M12 1.1C18.2132 1.1 23.25 6.13681 23.25 12.35C23.25 18.5632 18.2132 23.6 12 23.6C5.7868 23.6 0.75 18.5632 0.75 12.35C0.750015 6.13681 5.78681 1.1 12 1.1ZM4.71875 0.374413C5.25782 -0.0568448 6.0453 0.0296863 6.47656 0.568748C6.90782 1.10782 6.82031 1.8953 6.28125 2.32656L3.78125 4.32656C3.24217 4.75782 2.4547 4.67033 2.02344 4.13125C1.59232 3.59233 1.68009 2.80575 2.21875 2.37441L4.71875 0.374413ZM17.5234 0.568748C17.9547 0.0296848 18.7422 -0.056845 19.2812 0.374413L21.7812 2.37441C22.3199 2.80575 22.4077 3.59233 21.9766 4.13125C21.5453 4.67033 20.7578 4.75782 20.2188 4.32656L17.7188 2.32656C17.1797 1.8953 17.0922 1.10782 17.5234 0.568748Z"
        fill={color || '#ABC2AC'}
        stroke="url(#paint0_linear_353_6758_inactive)"
        strokeLinecap="round"
      />
      <G>
        <Path
          d="M12.75 8.35005C12.75 7.93584 12.4142 7.60005 12 7.60005C11.5858 7.60005 11.25 7.93584 11.25 8.35005V12.5559C11.25 12.8747 11.1282 13.1814 10.9095 13.4134L9.4543 14.9569C9.17015 15.2583 9.18412 15.7329 9.48551 16.0171C9.78689 16.3012 10.2616 16.2873 10.5457 15.9859L12.0009 14.4424C12.482 13.9321 12.75 13.2572 12.75 12.5559V8.35005Z"
          fill="url(#paint1_linear_353_6758_inactive)"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_353_6758_inactive">
        <Rect width="15" height="15" fill="white" transform="translate(12.9 4.5)" />
      </ClipPath>
      <ClipPath id="clip1_353_6758_inactive">
        <Rect width="24" height="24" fill="white" />
      </ClipPath>
      <LinearGradient
        id="paint0_linear_353_6758_inactive"
        x1="1.25"
        y1="0.599998"
        x2="23.7372"
        y2="22.0659"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" stopOpacity="0.25" />
        <Stop offset="1" stopColor="white" stopOpacity="0" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_353_6758_inactive"
        x1="11.0295"
        y1="18.0581"
        x2="19.2067"
        y2="14.804"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="white" />
        <Stop offset="1" stopColor="white" stopOpacity="0.2" />
      </LinearGradient>
    </Defs>
  </Svg>
);

const IconTimer = ({ focused, color, size }: IconTimerProps) => {
  const iconSize = size || 24;
  const iconWidth = (iconSize / 24) * 28;
  const iconHeight = iconSize;

  if (focused) {
    return <IconTimerFocused width={iconWidth} height={iconHeight} />;
  }

  return (
    <IconTimerInactive width={iconWidth} height={iconHeight} color={color} />
  );
};

export default IconTimer;