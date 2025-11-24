import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import IconPlay from '../icons/IconPlay';
import IconPause from '../icons/IconPause';
import IconStop from '../icons/IconStop';

type TimerMode = 'Working' | 'Breaking';

type CircularTimerProps = {
  time: number;
  isRunning: boolean;
  mode?: TimerMode;
  onToggle: () => void;
  onSkip?: () => void; 
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (num: number) => (num < 10 ? '0' : '') + num;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const CircularTimer = ({ time, isRunning, mode, onToggle, onSkip }: CircularTimerProps) => {
  const STROKE_WIDTH = 6;
  const SIZE = 280;
  const RADIUS = SIZE / 2 - STROKE_WIDTH / 2;
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  const PlayPauseIcon = isRunning ? (
    <IconPause size={30}/>
  ) : (
    <IconPlay />
  );

  return (
    <>
      <View style={styles.timerCircleContainer}>
        <Svg
          height={SIZE}
          width={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ position: 'absolute' }}>
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
            cx={CX}
            cy={CY}
            r={RADIUS}
            stroke="url(#strokeGradient)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
        </Svg>

        <MaskedView
          style={styles.maskedView}
          maskElement={
            <View style={styles.maskedElementContainer}>
              <Text
                style={[
                  styles.timerText,
                  { backgroundColor: 'transparent' },
                ]}>
                {formatTime(time)}
              </Text>
            </View>
          }>
          <LinearGradient
            colors={[COLORS.solidgreen_07, COLORS.solidgreen_01]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientFill}
          />
        </MaskedView>
      </View>

      {/* Button */}
      <View style={styles.controlsWrapper}>
        {mode === 'Breaking' ? (
          <View style={styles.breakRow}>
            {/* Play/Pause */}
            <TouchableOpacity style={styles.buttonContainer} onPress={onToggle}>
              <View style={styles.buttonGlass} />
              <View style={styles.iconContainer}>{PlayPauseIcon}</View>
            </TouchableOpacity>
            
            {/* Stop */}
            <TouchableOpacity style={styles.buttonContainer} onPress={onSkip}>
              <View style={styles.buttonGlass} />
              <View style={styles.iconContainer}>
                <IconStop size={21}/>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          // Default (Working): Just Play/Pause
          <TouchableOpacity style={styles.buttonContainer} onPress={onToggle}>
            <View style={styles.buttonGlass} />
            <View style={styles.iconContainer}>{PlayPauseIcon}</View>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timerCircleContainer: {
    width: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  maskedView: {
    width: '100%',
    height: '100%',
  },
  maskedElementContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    ...FONTS.playfair_70_regular,
  },
  gradientFill: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  // --- BUTTONS STYLES ---
  controlsWrapper: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakRow: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
  },
  buttonContainer: {
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonGlass: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CircularTimer;